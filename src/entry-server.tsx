import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App';
import { setInitialData, type InitialData } from './lib/initialData';
import { setPurifier } from './lib/sanitize';

/**
 * Server entry for the static prerender.
 *
 * Deliberately does NOT import src/main.tsx: that file calls
 * `document.getElementById` and Vercel Analytics' `inject()` at module scope,
 * both of which need a browser. Rendering `<App />` directly inside a
 * StaticRouter is all that's required — which is why App.tsx, the route
 * declarations and every page component are untouched by this work.
 *
 * Returns the markup plus the serialised <head> tags collected by Helmet, so
 * scripts/prerender.mjs can write both into the HTML template.
 */

/**
 * Article bodies are sanitised before they reach the markup. DOMPurify needs a
 * DOM, so the prerender gives it a jsdom one. jsdom is imported here rather
 * than in shared code so it stays in the SSR bundle and never reaches the
 * browser. Without this, every /blog/<slug> render threw and the article
 * shipped as an empty shell.
 */
let purifierReady = false;
async function preparePurifier(): Promise<void> {
  if (purifierReady) return;
  const [{ JSDOM }, { default: createDOMPurify }] = await Promise.all([
    import('jsdom'),
    import('dompurify'),
  ]);
  // jsdom's window is structurally close enough for DOMPurify but not
  // identical to lib.dom's Window, so the cast is the pragmatic route.
  const { window } = new JSDOM('');
  setPurifier(createDOMPurify(window as unknown as Parameters<typeof createDOMPurify>[0]));
  purifierReady = true;
}

export async function prepare(): Promise<void> {
  await preparePurifier();
}

export function render(
  url: string,
  data: InitialData = {},
): { html: string; head: string } {
  const helmetContext: { helmet?: HelmetServerState } = {};

  // Blog pages read this during render, so it must be set before renderToString.
  setInitialData(data);

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );

  const { helmet } = helmetContext;
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join('\n    ')
    : '';

  return { html, head };
}
