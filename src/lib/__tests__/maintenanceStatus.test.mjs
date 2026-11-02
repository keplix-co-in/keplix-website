// Run: node --test src/lib/__tests__/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeStatus, fetchMaintenanceStatus, CLOSED_STATUS } from '../maintenanceStatus.js';

test('only a literal true turns maintenance on', () => {
  assert.equal(normalizeStatus({ maintenance: true }).maintenance, true);
  for (const v of ['true', 'yes', 1, null, undefined, false]) {
    assert.equal(normalizeStatus({ maintenance: v }).maintenance, false, String(v));
  }
});

test('bad input is treated as open', () => {
  for (const v of [null, undefined, 'x', 42, []]) {
    assert.deepEqual(normalizeStatus(v), { ...CLOSED_STATUS, maintenance: false });
  }
});

test('texts are trimmed, capped and non-strings dropped', () => {
  const s = normalizeStatus({ maintenance: true, message: '  Hi  ', until: 5 });
  assert.equal(s.message, 'Hi');
  assert.equal(s.until, '');
  assert.equal(normalizeStatus({ message: 'a'.repeat(500) }).message.length, 300);
});

test('fetch failures and non-200 fail open', async () => {
  assert.deepEqual(await fetchMaintenanceStatus('u', async () => { throw new Error('offline'); }), CLOSED_STATUS);
  assert.deepEqual(await fetchMaintenanceStatus('u', async () => ({ ok: false })), CLOSED_STATUS);
  assert.deepEqual(
    await fetchMaintenanceStatus('u', async () => ({ ok: true, json: async () => { throw new SyntaxError('html'); } })),
    CLOSED_STATUS,
  );
});

test('fetch success returns the normalized file without caching', async () => {
  let opts;
  const s = await fetchMaintenanceStatus('u', async (_u, o) => {
    opts = o;
    return { ok: true, json: async () => ({ maintenance: true, message: 'DB upgrade', until: '4 PM' }) };
  });
  assert.deepEqual(s, { maintenance: true, message: 'DB upgrade', until: '4 PM' });
  assert.equal(opts.cache, 'no-store');
});
