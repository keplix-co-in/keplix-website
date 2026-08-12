import createDOMPurify from 'dompurify';

interface Purifier {
  sanitize(html: string): string;
}

/**
 * HTML sanitiser that works in the browser *and* during the static prerender.
 *
 * DOMPurify needs a DOM. In Node it has none, so `DOMPurify.sanitize` is not
 * even a function — which made every blog post throw during prerendering and
 * fall back to a client-only render, quietly undoing the whole point of
 * prerendering articles.
 *
 * Rather than exposing a global `window` on the server (which would defeat the
 * `typeof window === 'undefined'` guards that the seat counter, the ad slots
 * and the initial-data store all depend on), the server injects a purifier
 * built over a jsdom window. See src/entry-server.tsx.
 */
let injected: Purifier | null = null;
let browserPurifier: Purifier | null = null;

/** Server-side only, called before rendering. */
export function setPurifier(purifier: Purifier): void {
  injected = purifier;
}

export function sanitizeHtml(html: string): string {
  if (injected) return injected.sanitize(html);

  if (typeof window !== 'undefined') {
    browserPurifier ??= createDOMPurify(window);
    return browserPurifier.sanitize(html);
  }

  // No DOM and no injected purifier: returning the raw string would ship
  // unsanitised markup, so return nothing instead.
  return '';
}
