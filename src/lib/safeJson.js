/**
 * JSON that is safe to embed as the raw text of an HTML <script> element.
 *
 * Security finding O-001 (security-review-2026-10-28): JSON.stringify does not
 * escape `<`, so a CMS-sourced blog title containing `</script><script>…`
 * closed the JSON-LD block early and ran as script on the prerendered page.
 * `<` becomes the six characters < (the same JSON value once parsed, but
 * the HTML parser can no longer see `</script` or `<!--`). U+2028/U+2029 are
 * escaped too: they are literal line terminators in older JS string parsing.
 *
 * ONE helper, used by both src/components/Seo.tsx (JSON-LD) and
 * scripts/prerender.mjs (the __KEPLIX_DATA__ block), so the two paths cannot
 * drift apart again. Kept as plain JS so `node --test` and the prerender
 * script can import it without a build step.
 */
const LT = /</g;
const LS = new RegExp(String.fromCharCode(0x2028), 'g');
const PS = new RegExp(String.fromCharCode(0x2029), 'g');
const BS = String.fromCharCode(92); // a single backslash

export function safeJsonForScript(value) {
  // JSON.stringify(undefined) is undefined, not a string; embed `null` instead.
  const json = JSON.stringify(value) ?? 'null';
  return json
    .replace(LT, `${BS}u003c`)
    .replace(LS, `${BS}u2028`)
    .replace(PS, `${BS}u2029`);
}
