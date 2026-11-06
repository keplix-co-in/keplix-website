/**
 * Pure helpers for prerender.mjs and serve-dist.mjs, split out so
 * `node --test` can import them (prerender.mjs runs its build on import).
 */
import { resolve, relative, isAbsolute, sep } from 'node:path';
import { safeJsonForScript } from '../src/lib/safeJson.js';

/**
 * A-006 (security-review-2026-10-28): blog slugs come from the content API,
 * and were joined straight into an output path, so a slug like
 * "../../index" (or one with "/" or "\") could write outside dist/ at build
 * time. Only plain URL-slug characters are accepted; anything else is skipped
 * with a warning and the post falls back to client rendering via /blog/*.
 */
export const SAFE_SLUG = /^[a-z0-9-]+$/i;
export const isSafeSlug = (slug) => typeof slug === 'string' && slug.length <= 200 && SAFE_SLUG.test(slug);

/**
 * Resolves `rel` under `root` and throws if the result escapes it. Used for
 * every file prerender writes (A-006) and every file serve-dist reads (A-007).
 * A plain startsWith(root) check would accept "dist-ssr" as inside "dist",
 * hence path.relative.
 */
export function resolveInside(root, ...parts) {
  const base = resolve(root);
  const target = resolve(base, ...parts.map((p) => `.${sep}${p}`));
  const rel = relative(base, target);
  if (rel === '' || (!rel.startsWith('..') && !isAbsolute(rel))) return target;
  throw new Error(`path escapes ${base}: ${parts.join('/')}`);
}

/** dist/<route>/index.html (or dist/index.html for the root), confined to dist. */
export const routeOutputFile = (dist, route) =>
  route === '/' ? resolveInside(dist, 'index.html') : resolveInside(dist, route, 'index.html');

/**
 * O-005: the build-time data payload as an inert JSON block, not executable
 * inline script, so the enforced CSP needs no 'unsafe-inline' for script-src.
 * Read back by src/lib/initialData.ts (INITIAL_DATA_ID must match).
 */
export const dataScriptTag = (data) =>
  data ? `<script type="application/json" id="__KEPLIX_DATA__">${safeJsonForScript(data)}</script>` : '';

/**
 * Any <script> in the HTML that would execute inline (no src, and not a
 * JSON / JSON-LD data block). The enforced CSP blocks these, so the build
 * fails on one rather than shipping a page with a silently dead script.
 */
export function findInlineScripts(html) {
  const found = [];
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    const attrs = m[1];
    if (/\bsrc\s*=/i.test(attrs)) continue;
    const type = /\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs)?.[1]?.toLowerCase();
    if (type === 'application/json' || type === 'application/ld+json') continue;
    found.push(m[0].slice(0, 120));
  }
  return found;
}
