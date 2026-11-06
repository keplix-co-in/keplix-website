import type { BlogPostFull, BlogPostSummary } from './api';

/**
 * Build-time data handed from the prerender script to the page components.
 *
 * Prerendering the /blog page alone achieved nothing: the list is fetched at
 * runtime, so the generated HTML carried the heading and not one link to an
 * article. Crawlers could reach posts only through sitemap.xml, with zero
 * internal linking — and an article's own text was equally absent from
 * /blog/<slug>.
 *
 * So the prerender script fetches the posts once and passes them in here. On
 * the server the data lives in a module-level slot; on the client the same
 * payload is read back from a JSON <script> block the script embeds in the HTML.
 * Components seed their initial state from it, which both puts the content in
 * the markup and keeps hydration identical to what was rendered.
 */
export interface InitialData {
  posts?: BlogPostSummary[];
  post?: BlogPostFull;
}

/**
 * Id of the `<script type="application/json">` block prerender.mjs writes.
 *
 * O-005: this used to be an inline `<script>window.__KEPLIX_DATA__=…</script>`,
 * which is executable inline script and so could not coexist with an enforced
 * CSP that has no 'unsafe-inline' in script-src. A `type="application/json"`
 * block is inert data: the browser never executes it, CSP does not apply to
 * it, and we read it back with JSON.parse.
 */
export const INITIAL_DATA_ID = '__KEPLIX_DATA__';

let serverData: InitialData = {};
let clientData: InitialData | undefined;

/** Called by entry-server before each render. Server-side only. */
export function setInitialData(data: InitialData): void {
  serverData = data ?? {};
}

/**
 * Parses the embedded payload. Anything unexpected (missing block, bad JSON,
 * a non-object) yields {} so the page simply falls back to fetching at
 * runtime, exactly as an un-prerendered route does.
 */
export function parseInitialData(text: string | null | undefined): InitialData {
  if (!text) return {};
  try {
    const parsed: unknown = JSON.parse(text);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as InitialData)
      : {};
  } catch {
    return {};
  }
}

export function getInitialData(): InitialData {
  if (typeof window === 'undefined') return serverData;
  // Parsed once and cached: several components read it during hydration.
  clientData ??= parseInitialData(document.getElementById(INITIAL_DATA_ID)?.textContent);
  return clientData;
}
