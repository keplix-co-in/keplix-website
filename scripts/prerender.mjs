/**
 * Static prerender.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server). For each
 * route it renders the app to HTML in Node and writes a real file, so every
 * URL serves readable content instead of an empty <div id="root">.
 *
 * Why this exists: the site is a client-rendered SPA, so before this every one
 * of its URLs returned the same empty shell with a single shared <title>.
 * Google eventually renders the JS, but most AI crawlers do not — they saw a
 * blank page on every route.
 *
 * Output shape is `dist/<route>/index.html`, not `dist/<route>.html`. Vercel
 * checks the filesystem *before* applying rewrites and resolves directory
 * index files, so these files are served directly.
 *
 * WHY vercel.json ONLY REWRITES /blog/* (documented here because vercel.json
 * is strict JSON — it rejects both comments and unknown keys):
 *
 *   It used to rewrite "/(.*)" to /index.html. That meant every unmatched URL
 *   returned HTTP 200 with the full homepage — unlimited distinct URLs serving
 *   duplicate content, and never a real 404 for a crawler to drop.
 *
 *   Now every static route is a real file above, so it needs no rewrite at
 *   all. Only /blog/* keeps one: a post published since the last deploy has no
 *   prerendered file yet and must fall back to the client-rendered shell.
 *   Anything else with no matching file gets dist/404.html with a genuine 404.
 *
 *   The catch: a route in App.tsx that is missing from STATIC_ROUTES will now
 *   404 in production instead of silently working. assertRoutesMatch() below
 *   fails the build on that mismatch so it can never reach a deploy.
 */
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const SSR_ENTRY = resolve(ROOT, 'dist-ssr', 'entry-server.js');
const SITE_URL = 'https://keplix.co.in';

/**
 * Service landing pages. Read from the same source the app renders, so adding
 * a service to services.ts is all it takes to get a prerendered page and a
 * sitemap entry.
 */
async function serviceRoutes() {
  const src = await readFile(resolve(ROOT, 'src', 'constants', 'services.ts'), 'utf8');
  // Each entry declares `slug` then, a little later, `name`. Matching the pair
  // together keeps the sitemap and llms.txt labels in step with the pages.
  const pattern = /slug: '([^']+)',[\s\S]{0,200}?\n\s+name: '([^']+)'/g;
  return [...src.matchAll(pattern)].map(([, slug, name]) => ({
    path: `/services/${slug}`,
    name,
  }));
}

/** path → [changefreq, priority] for the sitemap. */
const STATIC_ROUTES = [
  ['/', 'weekly', '1.0'],
  ['/business', 'monthly', '0.9'],
  ['/faq', 'monthly', '0.9'],
  ['/services', 'weekly', '0.9'],
  ['/blog', 'weekly', '0.8'],
  ['/about', 'monthly', '0.7'],
  ['/contact', 'monthly', '0.7'],
  ['/beta', 'monthly', '0.6'],
  ['/refund-policy', 'yearly', '0.4'],
  ['/terms', 'yearly', '0.3'],
  ['/privacy-policy', 'yearly', '0.3'],
  ['/cookie-policy', 'yearly', '0.3'],
];

async function fetchPosts() {
  const base = process.env.VITE_API_BASE_URL ?? '';
  if (!base) {
    console.warn('[prerender] VITE_API_BASE_URL not set — blog posts will not be prerendered.');
    return [];
  }
  try {
    const res = await fetch(`${base}/content/blog/posts`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    const posts = Array.isArray(body) ? body : (body?.data ?? []);
    return posts.filter((p) => p?.slug);
  } catch (error) {
    // Deliberately non-fatal: a flaky content API must not break a deploy.
    // The static pages still prerender and /blog/* falls back to client
    // rendering via the catch-all rewrite.
    console.warn(`[prerender] Blog API unreachable (${error.message}) — prerendering static routes only.`);
    return [];
  }
}

/** Full article body for one slug. Returns null if it can't be fetched. */
async function fetchPost(slug) {
  const base = process.env.VITE_API_BASE_URL ?? '';
  if (!base) return null;
  try {
    const res = await fetch(`${base}/content/blog/posts/${encodeURIComponent(slug)}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn(`[prerender] post ${slug} unavailable (${error.message})`);
    return null;
  }
}

/** Writes dist/<route>/index.html (or dist/index.html for the root). */
async function writeRoute(route, html) {
  const outDir = route === '/' ? DIST : resolve(DIST, `.${route}`);
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, 'index.html'), html, 'utf8');
}

const xmlEscape = (s) =>
  String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));

function buildSitemap(posts, services = []) {
  const today = new Date().toISOString().slice(0, 10);
  const entry = (loc, lastmod, changefreq, priority) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

  const urls = [
    ...STATIC_ROUTES.map(([path, cf, pr]) => entry(`${SITE_URL}${path}`, today, cf, pr)),
    ...services.map(({ path }) => entry(`${SITE_URL}${path}`, today, 'monthly', '0.8')),
    ...posts.map((p) =>
      entry(
        `${SITE_URL}/blog/${xmlEscape(p.slug)}`,
        p.publishedAt ? String(p.publishedAt).slice(0, 10) : today,
        'monthly',
        '0.7',
      ),
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

function buildLlmsTxt(posts, services = []) {
  const serviceLines = services
    .map((s) => `- [${s.name}](${SITE_URL}${s.path})`)
    .join('\n');

  const postLines = posts
    .slice(0, 30)
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug})${p.excerpt ? `: ${p.excerpt}` : ''}`)
    .join('\n');

  return `# Keplix

> Keplix is an Indian online marketplace for car servicing. Car owners compare
> prices from verified local workshops, book a service slot in the app, pay
> securely, and track the work in real time. Garages join free and pay no
> commission on bookings.

## What Keplix does

- Compare itemised prices from verified garages near you before booking.
- Book a service slot in minutes and track it through to completion.
- Pay in-app by UPI, card or net banking; money is held until the work is done.
- Keep a complete service history against your vehicle.

## Services covered

Car servicing and maintenance, AC repair and gas refill, battery replacement,
tyre replacement and wheel alignment, denting and painting, car wash and
detailing, breakdown assistance, and accessories fitting.

## Where

Rolling out city by city across India, starting with Delhi NCR.

## Key pages

- [Home](${SITE_URL}/): what Keplix is and how it works.
- [FAQ](${SITE_URL}/faq): booking, pricing, payment, cancellations, refunds, and garage partnership.
- [For garages](${SITE_URL}/business): joining Keplix as a workshop partner — free, no commission.
- [Refund & cancellation policy](${SITE_URL}/refund-policy): cancellation windows and refund timelines.
- [About](${SITE_URL}/about): the company and why it was founded.
- [Contact](${SITE_URL}/contact): support channels.
- [Blog](${SITE_URL}/blog): car care guides and servicing advice.
- [Terms of Service](${SITE_URL}/terms): the agreement covering bookings and payment.

## Service pages

${serviceLines}
${postLines ? `\n## Recent articles\n\n${postLines}\n` : ''}
## Contact

Email: support@keplix.co.in
`;
}

/**
 * Injects the rendered app and Helmet's head tags into the built template.
 *
 * The template's own <title> and <meta name="description"> have to go first.
 * Helmet appends its tags, so leaving them produces two <title> elements per
 * page — and crawlers take the *first*, which is the generic site-wide one.
 * Every page would have looked identical in search results.
 */
function compose(template, html, head, data) {
  // </script> inside the JSON would close the tag early; U+2028/9 are literal
  // line terminators in JS string context and break the parse.
  const payload = data
    ? `<script>window.__KEPLIX_DATA__=${JSON.stringify(data)
        .replace(/</g, '\\u003c')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')}</script>`
    : '';

  return template
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta\s+name="description"[^>]*>/, '')
    .replace('<div id="root"></div>', `<div id="root">${html}</div>${payload}`)
    .replace('</head>', `    ${head}\n  </head>`);
}

/**
 * The route list here and the <Route> list in App.tsx are maintained by hand in
 * two different files. Since vercel.json no longer has a blanket catch-all, a
 * route that exists in the app but not here would 404 in production — so a
 * mismatch has to break the build, not the site.
 */
async function assertRoutesMatch(routes) {
  const app = await readFile(resolve(ROOT, 'src', 'App.tsx'), 'utf8');
  const declared = [...app.matchAll(/path="([^"]+)"/g)]
    .map((m) => m[1])
    // "*" is the 404 catch-all and "/blog/:slug" is dynamic — neither is a
    // static route, and both are handled separately.
    .filter((p) => p !== '*' && !p.includes(':'));

  const dynamic = [...app.matchAll(/path="([^"]*:[^"]*)"/g)].map((m) =>
    // "/services/:slug" -> matches "/services/<anything without a slash>"
    new RegExp(`^${m[1].replace(/:[^/]+/g, '[^/]+')}$`),
  );

  const known = new Set(routes.map((r) => r));
  const missing = declared.filter((p) => !known.has(p));
  const extra = [...known].filter(
    (p) => !declared.includes(p) && !dynamic.some((re) => re.test(p)),
  );

  if (missing.length || extra.length) {
    throw new Error(
      `route list drift — App.tsx and prerender.mjs disagree.` +
        (missing.length ? ` Not prerendered (would 404 in production): ${missing.join(', ')}.` : '') +
        (extra.length ? ` Prerendered but no route in App.tsx: ${extra.join(', ')}.` : ''),
    );
  }
}

const MIN_TEXT_LENGTH = 500;

async function main() {
  const services = await serviceRoutes();
  const staticRoutes = [...STATIC_ROUTES.map(([p]) => p), ...services.map((s) => s.path)];
  await assertRoutesMatch(staticRoutes);

  const template = await readFile(resolve(DIST, 'index.html'), 'utf8');

  // Preserved BEFORE the loop below overwrites dist/index.html with the
  // homepage's own prerendered markup (route '/' writes directly into
  // DIST/index.html — see writeRoute). vercel.json's rewrites (/blog/*,
  // /job/*) need a true empty shell to fall back to, not another page's
  // rendered HTML: main.tsx calls hydrateRoot() whenever the root div is
  // non-empty, so falling back to the homepage's markup made every
  // /blog/:new-slug and /job/:token hydrate against homepage content,
  // mismatch, and force a discard-and-client-rerender (a real, verified
  // hydration mismatch — see verification notes for this change).
  await writeFile(resolve(DIST, 'app-shell.html'), template, 'utf8');

  const { render, prepare } = await import(pathToFileURL(SSR_ENTRY).href);
  // Builds the jsdom-backed sanitiser that article bodies need.
  await prepare();

  const posts = await fetchPosts();
  const routes = [...staticRoutes, ...posts.map((p) => `/blog/${p.slug}`)];

  let ok = 0;
  const failures = [];
  for (const route of routes) {
    try {
      // /blog needs the summaries to render its list; an article needs its own
      // full body. Everything else renders from static content.
      let data;
      if (route === '/blog') {
        data = { posts };
      } else if (route.startsWith('/blog/')) {
        const post = await fetchPost(route.slice('/blog/'.length));
        if (!post) throw new Error('could not fetch post body');
        data = { post, posts };
      }

      const { html, head } = render(route, data);
      // A route that renders almost nothing is the failure mode that matters:
      // React.lazy once made every split route emit only a Suspense fallback,
      // and the build reported 10/10 success while shipping empty HTML.
      // Failing loudly here is the whole point of prerendering.
      if (html.replace(/<[^>]*>/g, '').trim().length < MIN_TEXT_LENGTH) {
        throw new Error(`rendered almost no text (${html.length} bytes of markup)`);
      }
      const page = compose(template, html, head, data);
      await writeRoute(route, page);
      ok += 1;
    } catch (error) {
      // A static route failing means the deploy would serve an empty shell
      // for it — exactly the problem prerendering exists to fix. Blog posts
      // come from a live API, so those stay soft failures.
      // A post that was listed by the API but then failed to render is a real
      // bug (this is exactly how the missing server-side DOM was caught), so it
      // fails the build. Posts the API never listed simply aren't in `routes`
      // and still fall back to client rendering via the /blog/* rewrite.
      console.error(`[prerender] ${route} failed: ${error.message}`);
      failures.push(route);
    }
  }

  // 404: Vercel serves dist/404.html for unmatched paths, which stops mistyped
  // URLs returning 200 with an empty shell.
  try {
    const { html, head } = render('/__not-found__');
    const page = compose(template, html, head);
    await writeFile(resolve(DIST, '404.html'), page, 'utf8');
  } catch (error) {
    console.warn(`[prerender] 404.html failed (${error.message})`);
  }

  if (failures.length) {
    throw new Error(`prerender failed for: ${failures.join(', ')}`);
  }

  await writeFile(resolve(DIST, 'sitemap.xml'), buildSitemap(posts, services), 'utf8');
  await writeFile(resolve(DIST, 'llms.txt'), buildLlmsTxt(posts, services), 'utf8');

  console.log(`[prerender] ${ok}/${routes.length} routes written (${posts.length} blog posts)`);
  console.log('[prerender] sitemap.xml, llms.txt and 404.html written');
}

main().catch((error) => {
  console.error(`[prerender] FAILED: ${error.stack}`);
  process.exit(1);
});
