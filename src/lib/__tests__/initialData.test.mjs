// Run: npm test   (O-005: build data moves to an inert JSON block)
// Imports initialData.ts directly: Node >= 22.18 strips TypeScript types
// natively (the file uses only erasable syntax and `import type`).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseInitialData, INITIAL_DATA_ID } from '../initialData.ts';
import { dataScriptTag } from '../../../scripts/prerender-utils.mjs';

test('prerender output parses back to the same data, hostile strings included', () => {
  const data = { posts: [{ slug: 'a', title: '</script><img src=x onerror=alert(1)>', excerpt: 'x\u2028y' }] };
  const tag = dataScriptTag(data);
  assert.match(tag, new RegExp(`^<script type="application/json" id="${INITIAL_DATA_ID}">`));
  const text = /^<script[^>]*>([\s\S]*)<\/script>$/.exec(tag)[1];
  assert.equal(text.includes('<'), false);
  assert.deepEqual(parseInitialData(text), data);
});

test('no data, no tag', () => {
  assert.equal(dataScriptTag(undefined), '');
});

test('missing or malformed payloads fall back to {}', () => {
  for (const t of [null, undefined, '', '{bad', '[]', '42', 'null']) {
    assert.deepEqual(parseInitialData(t), {}, String(t));
  }
});
