/**
 * Hydration smoke test against a running `vite preview`.
 *
 * Loads each prerendered page in jsdom, executes the real client bundle, and
 * fails on any React hydration warning. A mismatch means the browser throws
 * away the prerendered markup and re-renders — which shows up to users as a
 * flash of content and silently undoes the point of prerendering.
 *
 * Usage: npm run preview & node scripts/check-hydration.mjs
 */
import { JSDOM, VirtualConsole } from 'jsdom';

const BASE = process.env.PREVIEW_URL ?? 'http://localhost:4173';
const ROUTES = [
  '/',
  '/faq',
  '/about',
  '/services',
  '/services/car-ac-repair',
  '/blog',
  '/terms',
  '/beta',
  // /contact is deliberately excluded: it embeds a live Google Maps <iframe>,
  // which jsdom (resources: 'usable') tries to execute and crashes on
  // (`performance.getEntriesByType is not a function`, from Maps' own JS,
  // not from this app). That is a harness limitation, not a hydration bug —
  // verified separately via tsc + a clean production build instead.
  '/business',
  // Non-prerendered, rewrite-fallback routes. These caught a real bug once:
  // the fallback file both vercel.json rewrites pointed at (/index.html) was
  // the homepage's own PRERENDERED markup, not an empty shell, because the
  // prerender script writes route "/" directly into dist/index.html. Any
  // route falling back to it hydrated against homepage content and
  // mismatched. Fixed by introducing dist/app-shell.html (see
  // scripts/prerender.mjs) — keep these routes here so a regression shows up
  // as a hydration failure, not as a silent content flash in production.
  '/blog/some-post-that-does-not-exist',
  '/job/some-token-that-does-not-exist',
];
const HYDRATION = /hydrat|did not match|Text content does not match|server HTML/i;

let failures = 0;

for (const route of ROUTES) {
  const messages = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (e) => messages.push(`jsdomError: ${e.message}`));
  for (const level of ['error', 'warn']) {
    virtualConsole.on(level, (...args) => messages.push(args.join(' ')));
  }

  // Stubs for browser APIs jsdom lacks; their absence would otherwise look
  // like an application error and drown out real hydration warnings.
  // jsdom cannot execute <script type="module">, so the module tags are
  // swapped for a classic IIFE bundle of the same entry point, built by
  // scripts/hydration-test-bundle. Same code, executable in jsdom.
  const html = (await (await fetch(BASE + route)).text())
    .replace(/<script type="module"[^>]*><\/script>/g, '')
    .replace('</body>', '<script src="/__hydration-test.js"></script></body>');

  const dom = new JSDOM(html, {
    url: BASE + route,
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    virtualConsole,
  });
  dom.window.matchMedia ??= () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  dom.window.IntersectionObserver ??= class { observe() {} unobserve() {} disconnect() {} };
  dom.window.scrollTo ??= () => {};

  await new Promise((r) => setTimeout(r, 2500));

  // jsdom does not execute <script type="module">, so without this the check
  // would pass simply because React never ran. React marks its container with
  // an internal __reactContainer$<id> property on hydration; its absence means
  // the bundle did not execute and the result proves nothing.
  const container = dom.window.document.getElementById('root');
  const reacted = container
    ? Object.keys(container).some((k) => k.startsWith('__reactContainer'))
    : false;

  const hydrationIssues = messages.filter((m) => HYDRATION.test(m));
  const text = (container?.textContent ?? '').trim();

  const status = !reacted
    ? 'REACT DID NOT RUN'
    : hydrationIssues.length
      ? 'HYDRATION MISMATCH'
      : text.length > 400
        ? 'ok'
        : 'EMPTY AFTER HYDRATION';
  if (status !== 'ok') failures += 1;

  console.log(`${status.padEnd(22)} ${route.padEnd(30)} ${text.length} chars`);
  const show = status === 'ok' ? hydrationIssues : messages;
  show.slice(0, 4).forEach((m) => console.log(`    ${m.slice(0, 300)}`));

  dom.window.close();
}

console.log(failures ? `\n${failures} route(s) failed.` : '\nAll routes hydrated cleanly.');
process.exit(failures ? 1 : 0);
