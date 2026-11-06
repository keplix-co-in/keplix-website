// Run: npm test   (A-006 prerender paths, A-007 serve-dist, O-005 inline scripts)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve, sep } from 'node:path';
import { readFile } from 'node:fs/promises';
import { isSafeSlug, resolveInside, routeOutputFile, findInlineScripts } from '../prerender-utils.mjs';

const DIST = resolve('/tmp/site/dist');

test('only plain slugs are accepted (A-006)', () => {
  for (const s of ['summer-car-care-checklist', 'AC-repair-2026', 'a']) assert.equal(isSafeSlug(s), true, s);
  for (const s of ['../../etc', 'a/b', 'a\\b', '..', '', 'a b', 'a.b', '%2e%2e', 'x'.repeat(201), null, 42]) {
    assert.equal(isSafeSlug(s), false, String(s));
  }
});

test('output files stay inside dist (A-006)', () => {
  assert.equal(routeOutputFile(DIST, '/'), resolve(DIST, 'index.html'));
  assert.equal(routeOutputFile(DIST, '/blog/x'), resolve(DIST, 'blog', 'x', 'index.html'));
  assert.throws(() => routeOutputFile(DIST, '/blog/../../../outside'));
  assert.throws(() => routeOutputFile(DIST, '/..'));
});

test('resolveInside rejects escapes, including sibling-prefix dirs (A-007)', () => {
  assert.equal(resolveInside(DIST, '/assets/a.js'), resolve(DIST, 'assets', 'a.js'));
  assert.equal(resolveInside(DIST, '/'), DIST);
  for (const p of ['/../package.json', '/../dist-ssr/entry-server.js', '/assets/../../x', `${sep}..${sep}x`]) {
    assert.throws(() => resolveInside(DIST, p), Error, p);
  }
});

test('findInlineScripts flags executable inline script only (O-005)', () => {
  const html = [
    '<script type="module" crossorigin src="/assets/index.js"></script>',
    '<script data-rh="true" type="application/ld+json">{"a":1}</script>',
    '<script type="application/json" id="__KEPLIX_DATA__">{}</script>',
  ].join('');
  assert.deepEqual(findInlineScripts(html), []);
  assert.equal(findInlineScripts(`${html}<script>window.x=1</script>`).length, 1);
  assert.equal(findInlineScripts('<script type="text/javascript">x()</script>').length, 1);
});

test('serve-dist binds to loopback and confines reads (A-007)', async () => {
  const src = await readFile(new URL('../serve-dist.mjs', import.meta.url), 'utf8');
  assert.match(src, /process\.env\.HOST \?\? '127\.0\.0\.1'/);
  assert.match(src, /\.listen\(PORT, HOST,/);
  assert.doesNotMatch(src, /read(?:IfFile|File)\(join\(/);
});
