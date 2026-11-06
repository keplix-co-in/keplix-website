/**
 * Keeps job-tracking tokens away from third parties.
 *
 * Findings A-005 / SYS-005 (security-review-2026-10-28): /job/<token> is a
 * permanent, unauthenticated link to a customer's vehicle health sheet, and
 * the token in the path IS the credential. Vercel Analytics recorded the full
 * URL and AdSense (when consented) saw it too, so the bearer token was handed
 * to both. These helpers let main.tsx redact it and consent.ts skip ads there.
 *
 * Plain JS (with privacy.d.ts) so `node --test` runs it without a build.
 */

/** True on the job-tracking pages, which must never load ads or leak the URL. */
export const isJobPath = (pathname) =>
  typeof pathname === 'string' && /^\/job(\/|$)/i.test(pathname);

const REDACTED = '/job/[redacted]';

/**
 * Replaces the token in a /job/<token> URL (absolute or root-relative) with
 * "[redacted]" and drops its query string and hash, which could carry the
 * same data. Any other URL is returned unchanged.
 */
export function redactJobUrl(url) {
  if (typeof url !== 'string') return url;
  try {
    const parsed = new URL(url, 'https://keplix.co.in');
    if (!isJobPath(parsed.pathname)) return url;
    const isAbsolute = /^[a-z][a-z0-9+.-]*:/i.test(url);
    return isAbsolute ? `${parsed.origin}${REDACTED}` : REDACTED;
  } catch {
    // Unparseable: fall back to a regex so a token can't slip through.
    return url.replace(/\/job\/[^?#]*(?:[?#].*)?$/i, REDACTED);
  }
}
