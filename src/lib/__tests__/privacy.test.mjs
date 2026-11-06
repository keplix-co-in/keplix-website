// Run: npm test   (A-005 / SYS-005: job tokens must not reach analytics / ads)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { isJobPath, redactJobUrl } from '../privacy.js';

test('job paths are recognised, others are not', () => {
  for (const p of ['/job/abc123', '/job/', '/job', '/JOB/x']) assert.equal(isJobPath(p), true, p);
  for (const p of ['/', '/jobs', '/blog/job/x', '/faq', null, undefined]) assert.equal(isJobPath(p), false, String(p));
});

test('the token, query and hash are redacted from absolute and relative URLs', () => {
  assert.equal(redactJobUrl('https://keplix.co.in/job/s3cr3t-token'), 'https://keplix.co.in/job/[redacted]');
  assert.equal(redactJobUrl('https://keplix.co.in/job/s3cr3t?x=1#h'), 'https://keplix.co.in/job/[redacted]');
  assert.equal(redactJobUrl('/job/s3cr3t'), '/job/[redacted]');
  assert.equal(redactJobUrl('https://keplix.co.in/job/a/b'), 'https://keplix.co.in/job/[redacted]');
});

test('other URLs pass through untouched', () => {
  for (const u of ['https://keplix.co.in/', 'https://keplix.co.in/blog/x?utm=1', '/faq']) {
    assert.equal(redactJobUrl(u), u);
  }
});

test('main.tsx wires beforeSend and consent.ts skips AdSense on /job', async () => {
  const main = await readFile(new URL('../../main.tsx', import.meta.url), 'utf8');
  assert.match(main, /inject\(\{\s*beforeSend:[^}]*redactJobUrl\(event\.url\)/);
  const consent = await readFile(new URL('../consent.ts', import.meta.url), 'utf8');
  assert.match(consent, /if \(isJobPath\(window\.location\.pathname\)\) return;/);
});
