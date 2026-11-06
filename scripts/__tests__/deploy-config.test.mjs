// Run: npm test   (O-005 CSP + A-005 /job headers in vercel.json; A-008 workflow)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const root = new URL('../../', import.meta.url);
const vercel = JSON.parse(await readFile(new URL('vercel.json', root), 'utf8'));
const catchAll = vercel.headers.find((h) => h.source === '/(.*)');
const header = (rule, key) => rule.headers.find((h) => h.key === key)?.value;
const directive = (policy, name) =>
  policy.split(';').map((d) => d.trim().split(/\s+/)).find(([n]) => n === name)?.slice(1) ?? null;

test('an enforced CSP exists, with no inline/eval script', () => {
  const csp = header(catchAll, 'Content-Security-Policy');
  assert.ok(csp, 'enforced Content-Security-Policy header');
  const script = directive(csp, 'script-src');
  assert.ok(script.includes("'self'"));
  for (const bad of ["'unsafe-inline'", "'unsafe-eval'", '*', 'https:', 'http:', 'data:']) {
    assert.equal(script.includes(bad), false, bad);
  }
  assert.deepEqual(directive(csp, 'object-src'), ["'none'"]);
  assert.deepEqual(directive(csp, 'frame-ancestors'), ["'none'"]);
});

test('the enforced CSP allows what the site actually loads', () => {
  const csp = header(catchAll, 'Content-Security-Policy');
  const connect = directive(csp, 'connect-src');
  // Production API (VITE_API_BASE_URL). If it moves, update both policies.
  assert.ok(connect.includes('https://keplix-backend-529844482719.asia-south1.run.app'));
  assert.ok(directive(csp, 'script-src').includes('https://pagead2.googlesyndication.com'));
  assert.ok(directive(csp, 'script-src').includes('https://challenges.cloudflare.com'));
  assert.ok(directive(csp, 'frame-src').includes('https://*.doubleclick.net'));
});

test('a stricter Report-Only CSP is kept for tuning', () => {
  const ro = header(catchAll, 'Content-Security-Policy-Report-Only');
  assert.ok(ro);
  const script = directive(ro, 'script-src');
  assert.equal(script.includes("'unsafe-inline'"), false);
  assert.equal(script.includes('https://*.google.com'), false);
});

test('/job/* gets no-referrer + noindex, after the catch-all so it wins', () => {
  const idx = vercel.headers.findIndex((h) => h.source === '/job/(.*)');
  assert.ok(idx > vercel.headers.indexOf(catchAll));
  const job = vercel.headers[idx];
  assert.equal(header(job, 'Referrer-Policy'), 'no-referrer');
  assert.match(header(job, 'X-Robots-Tag'), /noindex/);
});

test('workflows: pinned actions, pinned vercel, npm ci, read-only token (A-008)', async () => {
  const dir = new URL('.github/workflows/', root);
  for (const file of await readdir(dir)) {
    const yml = await readFile(new URL(file, dir), 'utf8');
    assert.match(yml, /^permissions:\s*\n\s+contents: read/m, `${file}: permissions`);
    for (const [, ref] of yml.matchAll(/uses:\s*[\w.-]+\/[\w.-]+@(\S+)/g)) {
      assert.match(ref, /^[0-9a-f]{40}$/, `${file}: action pinned to a SHA, got ${ref}`);
    }
    assert.doesNotMatch(yml, /run:.*vercel@latest/, file);
    assert.doesNotMatch(yml, /run:\s*npm install\s*$/m, `${file}: npm ci, not npm install`);
    assert.doesNotMatch(yml, /run:[^\n]*\$\{\{\s*github\./, `${file}: github.* expressions go through env`);
  }
});
