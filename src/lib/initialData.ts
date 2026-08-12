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
 * payload is read back from a <script> tag the script embeds in the HTML.
 * Components seed their initial state from it, which both puts the content in
 * the markup and keeps hydration identical to what was rendered.
 */
export interface InitialData {
  posts?: BlogPostSummary[];
  post?: BlogPostFull;
}

declare global {
  interface Window {
    __KEPLIX_DATA__?: InitialData;
  }
}

let serverData: InitialData = {};

/** Called by entry-server before each render. Server-side only. */
export function setInitialData(data: InitialData): void {
  serverData = data ?? {};
}

export function getInitialData(): InitialData {
  if (typeof window === 'undefined') return serverData;
  return window.__KEPLIX_DATA__ ?? {};
}
