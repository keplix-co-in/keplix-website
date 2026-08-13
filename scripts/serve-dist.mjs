/**
 * Static server that mirrors Vercel's routing for dist/, for local verification.
 *
 * `vite preview` serves index.html for every unmatched path, which hides both
 * the prerendered per-route files and real 404s — so it cannot be used to check
 * either. This reproduces what vercel.json actually specifies:
 *
 *   1. filesystem first, resolving <route>/index.html (Vercel checks files
 *      before applying rewrites)
 *   2. then whatever rewrites vercel.json declares, to the SPA shell
 *   3. otherwise 404.html with a genuine 404 status
 *
 * Rewrite prefixes are read from vercel.json itself, not hardcoded — this
 * file went stale once already (only knew about /blog/*, so it silently
 * 404'd the newly-added /job/* route and would have shipped that gap to
 * production undetected).
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');

const vercelConfig = JSON.parse(await readFile(resolve(ROOT, 'vercel.json'), 'utf8'));
// "/blog/(.*)" -> "/blog/" — a simple prefix match is enough for every
// rewrite this project actually declares. Each rule's own destination is
// kept (not assumed to be /index.html) — a previous version of this file
// hardcoded that assumption and silently mis-served /job/* once the rewrite
// destination changed to /app-shell.html.
const rewrites = vercelConfig.rewrites.map((r) => ({
  prefix: r.source.replace(/\(\.\*\)$/, ''),
  destination: r.destination,
}));
const PORT = Number(process.env.PORT ?? 4180);
const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp4': 'video/mp4',
  '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json',
};

const readIfFile = async (p) => {
  try {
    if (!(await stat(p)).isFile()) return null;
    return await readFile(p);
  } catch {
    return null;
  }
};

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const send = (status, body, type) => {
    res.writeHead(status, { 'content-type': type });
    res.end(body);
  };

  const direct = await readIfFile(join(DIST, path));
  if (direct) return send(200, direct, TYPES[extname(path)] ?? 'application/octet-stream');

  const index = await readIfFile(join(DIST, path, 'index.html'));
  if (index) return send(200, index, 'text/html');

  const matchedRewrite = rewrites.find((r) => path.startsWith(r.prefix));
  if (matchedRewrite) {
    return send(200, await readFile(join(DIST, matchedRewrite.destination)), 'text/html');
  }

  return send(404, await readFile(join(DIST, '404.html')), 'text/html');
}).listen(PORT, () => console.log(`serving dist/ with Vercel semantics on http://localhost:${PORT}`));
