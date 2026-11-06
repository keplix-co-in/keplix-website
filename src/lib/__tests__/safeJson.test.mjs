// Run: npm test   (O-001: JSON embedded in <script> must not break out)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { safeJsonForScript } from '../safeJson.js';

const hostile = {
  headline: '</script><script>alert(1)</script>',
  comment: '<!-- x',
  sep: 'a\u2028b\u2029c',
  amp: 'Tom & Jerry > "quotes"',
};

test('no "<" survives, so </script> and <!-- cannot appear', () => {
  const out = safeJsonForScript(hostile);
  assert.equal(out.includes('<'), false);
  assert.equal(/<\/script/i.test(out), false);
  assert.equal(out.includes('\u2028') || out.includes('\u2029'), false);
});

test('round-trips to the same value (still valid JSON for JSON-LD parsers)', () => {
  assert.deepEqual(JSON.parse(safeJsonForScript(hostile)), hostile);
  const ld = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: 'Brakes <101>' };
  assert.deepEqual(JSON.parse(safeJsonForScript(ld)), ld);
});

test('undefined embeds as null rather than throwing', () => {
  assert.equal(safeJsonForScript(undefined), 'null');
});

test('Seo.tsx emits JSON-LD through the helper, not bare JSON.stringify', async () => {
  const src = await readFile(new URL('../../components/Seo.tsx', import.meta.url), 'utf8');
  assert.match(src, /safeJsonForScript\(block\)/);
  assert.doesNotMatch(src, /JSON\.stringify\(block\)/);
});
