import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { inject } from '@vercel/analytics';

inject();

const container = document.getElementById('root')!;

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Prerendered pages arrive with real markup already in #root, so hydrate them
// rather than throwing it away and re-rendering — that's what preserves the
// fast first paint the prerender buys. Routes that weren't prerendered (a blog
// post published since the last deploy) fall through the catch-all rewrite and
// arrive empty, so they get a normal client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
