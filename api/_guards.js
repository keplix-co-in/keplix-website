/**
 * Pure request guards shared by api/chat.ts and api/contact.ts.
 *
 * Plain JS with a sibling _guards.d.ts, like src/lib/maintenanceStatus.js, so
 * `node --test` can import it without a build. The leading underscore keeps
 * Vercel from deploying it as its own function (same as _knowledge.ts).
 * Findings referenced below are from security-review-2026-10-28.
 */

import { createHmac, timingSafeEqual } from 'node:crypto';

const IP_SHAPE = /^[0-9a-fA-F:.]{2,45}$/;

/**
 * O-002: the client IP that the per-IP limits key on.
 *
 * x-real-ip first: on Vercel the platform sets it to the connecting client and
 * does not pass a client-sent value through. Then the FIRST x-forwarded-for
 * entry (Vercel also overwrites that header). Anything that is not shaped like
 * an IPv4/IPv6 address is ignored, so a junk header can't mint fresh buckets.
 */
export function clientIp(headers) {
  const h = headers ?? {};
  const first = (v) => String(Array.isArray(v) ? v[0] : (v ?? '')).split(',')[0].trim();
  for (const candidate of [first(h['x-real-ip']), first(h['x-forwarded-for'])]) {
    if (IP_SHAPE.test(candidate)) return candidate;
  }
  return 'unknown';
}

/**
 * O-002: per-key sliding-minute + calendar-day limits, in instance memory.
 *
 * Still per serverless instance, not global (the Vercel WAF rule in the owner
 * steps is the global layer); this caps what one hot instance will do.
 * `maxKeys` bounds memory: past it the maps are cleared, which only ever
 * forgives, never wrongly blocks.
 * hit() returns null when allowed, or 'minute' / 'day' when limited.
 */
export function createRateLimiter({ perMinute, perDay, maxKeys = 5000 }) {
  const minute = new Map();
  const daily = new Map();
  return {
    hit(key, now = Date.now()) {
      const day = new Date(now).toISOString().slice(0, 10);
      const recent = (minute.get(key) || []).filter((t) => now - t < 60_000);
      recent.push(now);
      if (minute.size >= maxKeys && !minute.has(key)) minute.clear();
      minute.set(key, recent);
      if (recent.length > perMinute) return 'minute';

      const d = daily.get(key);
      const n = d && d.day === day ? d.n + 1 : 1;
      if (daily.size >= maxKeys && !daily.has(key)) daily.clear();
      daily.set(key, { day, n });
      if (n > perDay) return 'day';
      return null;
    },
  };
}

/**
 * A per-instance daily ceiling (O-002 chat quota; A-003/SYS-007 contact mail
 * cap). take() returns false once `limit` uses have happened today (UTC).
 */
export function createDailyCap(limit) {
  let state = { day: '', n: 0 };
  return {
    take(now = Date.now()) {
      const day = new Date(now).toISOString().slice(0, 10);
      if (state.day !== day) state = { day, n: 0 };
      if (state.n >= limit) return false;
      state.n += 1;
      return true;
    },
  };
}

// ---- chat (O-003) -----------------------------------------------------------

/** Remove control characters and redact card numbers / OTPs before the AI provider sees them. */
export const sanitizeChatText = (text) =>
  text
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\b(?:\d[ -]?){12,18}\d\b/g, '[card number removed]')
    .replace(/\b(otp|pin|cvv|password)\b(?:\W*(?:is|was|=))?\W*\S+/gi, '$1 [removed]')
    .trim();

/**
 * O-003: validates the client's history and returns what may reach the model.
 *
 * The client used to be trusted for assistant turns, so a script could put
 * words in the bot's mouth ("Sure, refunds are always 100%…") and few-shot it
 * into repeating them. With `opts.verifyAssistant` (chat.ts passes one whenever
 * a signing key exists) only server-signed assistant turns are kept; see
 * buildSignedHistory. Without it (no key) only USER turns are forwarded, the
 * earlier ones as context in ONE user message.
 *
 * Returns null for a malformed request (rejected outright, never repaired).
 */
export function buildChatMessages(raw, opts = {}) {
  const { maxRaw = 30, maxTotalChars = 6000, maxUserTurns = 5, maxChars = 500 } = opts;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > maxRaw) return null;
  let total = 0;
  for (const m of raw) {
    if (
      !m ||
      typeof m !== 'object' ||
      (m.role !== 'user' && m.role !== 'assistant') ||
      typeof m.content !== 'string'
    ) {
      return null;
    }
    total += m.content.length;
  }
  if (total > maxTotalChars) return null;
  // The newest turn must be the visitor's question.
  if (raw[raw.length - 1].role !== 'user') return null;

  if (typeof opts.verifyAssistant === 'function') {
    return buildSignedHistory(raw, opts.verifyAssistant, opts);
  }

  const questions = raw
    .filter((m) => m.role === 'user')
    .map((m) => sanitizeChatText(m.content).slice(0, maxChars))
    .filter((c) => c !== '')
    .slice(-maxUserTurns);
  if (!questions.length) return null;

  const current = questions[questions.length - 1];
  const earlier = questions.slice(0, -1);
  const content = earlier.length
    ? `My earlier messages in this chat, for context only:\n${earlier.map((q) => `- ${q}`).join('\n')}\n\nMy current message:\n${current}`
    : current;
  return [{ role: 'user', content }];
}

/**
 * O-003 follow-up (2026-11-06): dropping every assistant turn broke multi-turn
 * chat ("and how much does that cost?" lost what "that" was). Assistant turns
 * are now kept ONLY when they carry a valid server signature (signReply), i.e.
 * this server produced that exact text; unsigned or tampered ones are dropped,
 * so forged "the bot said..." turns still never reach the model. Consecutive
 * user turns (left behind by a drop) are merged so roles still alternate.
 */
function buildSignedHistory(raw, verify, opts) {
  const { maxChars = 500, maxTurns = 10, maxAssistantChars = 2000 } = opts;
  const out = [];
  for (const m of raw) {
    let msg;
    if (m.role === 'assistant') {
      // Verify the exact text the server signed, before any trimming.
      if (!verify(m.content, m.sig)) continue;
      msg = { role: 'assistant', content: sanitizeChatText(m.content).slice(0, maxAssistantChars) };
    } else {
      msg = { role: 'user', content: sanitizeChatText(m.content).slice(0, maxChars) };
    }
    if (msg.content === '') continue;
    const prev = out[out.length - 1];
    if (prev && prev.role === msg.role) {
      if (msg.role === 'user') prev.content = `${prev.content}\n\n${msg.content}`.slice(-2 * maxChars);
      else out[out.length - 1] = msg;
    } else {
      out.push(msg);
    }
  }
  let kept = out.slice(-maxTurns);
  while (kept.length && kept[0].role !== 'user') kept = kept.slice(1);
  return kept.length && kept[kept.length - 1].role === 'user' ? kept : null;
}

const REPLY_SIG_TTL_MS = 24 * 60 * 60_000;
const replyMac = (key, ts, content) =>
  createHmac('sha256', key).update(`keplix-chat-reply-v1|${ts}|${content}`).digest('base64url');

/**
 * Reply-signing key, derived from a server-only secret: CHAT_SIGNING_SECRET if
 * set, else TURNSTILE_SECRET_KEY / GEMINI_API_KEY / GROQ_API_KEY (one AI key is
 * always set when the bot works at all). Derived through HMAC with a fixed
 * label, so the source secret is never used directly or exposed. Returns null
 * when none is set; the caller then drops all assistant turns (fail-safe,
 * never "accept unsigned").
 */
export function replySigningKey(env) {
  const root = env.CHAT_SIGNING_SECRET || env.TURNSTILE_SECRET_KEY || env.GEMINI_API_KEY || env.GROQ_API_KEY;
  if (!root) return null;
  return createHmac('sha256', root).update('keplix-chat-reply-signing-key-v1').digest();
}

/** Signature for a reply the server is about to return: "<issuedAtMs>.<mac>". */
export function signReply(key, content, now = Date.now()) {
  return `${now}.${replyMac(key, String(now), content)}`;
}

/** True only for a signReply signature over exactly this content, under 24h old. */
export function verifyReply(key, content, sig, now = Date.now()) {
  if (!key || typeof sig !== 'string' || typeof content !== 'string' || sig.length > 200) return false;
  const dot = sig.indexOf('.');
  if (dot <= 0) return false;
  const ts = sig.slice(0, dot);
  const mac = sig.slice(dot + 1);
  if (!/^\d{1,15}$/.test(ts)) return false;
  const age = now - Number(ts);
  if (age < -60_000 || age > REPLY_SIG_TTL_MS) return false;
  const a = Buffer.from(replyMac(key, ts, content));
  const b = Buffer.from(mac);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Zero-width / invisible formatting characters that let "Pre\u200Bcision first"
// slip past a substring check.
const INVISIBLE = /[\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0]/g;

/**
 * O-003: canonical form for the leak-marker check. NFKC folds full-width and
 * compatibility letters ("Ｐｒｅｃｉｓｉｏｎ"), invisible characters are
 * stripped, curly quotes become straight, case and whitespace runs are folded.
 */
export const normalizeForMatch = (text) =>
  String(text)
    .normalize('NFKC')
    .replace(INVISIBLE, '')
    .replace(/[‘’ʼ′]/g, "'")
    .replace(/[“”″]/g, '"')
    .toLowerCase()
    .replace(/\s+/g, ' ');

/** True when the reply contains any marker, compared in normalized form. */
export const containsLeak = (reply, markers) => {
  const hay = normalizeForMatch(reply);
  return markers.some((m) => hay.includes(normalizeForMatch(m)));
};

// ---- contact (O-004, O-002) ------------------------------------------------

/**
 * O-004: keep only fields whose key is in `labels` (a null-prototype map),
 * trimmed and capped at `limits[key]` (or `defaultMax`). Attacker-chosen keys
 * used to be echoed as labels into the staff email; now they are dropped.
 */
export function pickAllowedFields(rawFields, labels, limits = {}, defaultMax = 500) {
  if (typeof rawFields !== 'object' || rawFields === null || Array.isArray(rawFields)) return null;
  const out = [];
  for (const [key, value] of Object.entries(rawFields)) {
    if (typeof labels[key] !== 'string') continue;
    if (typeof value !== 'string') continue;
    const v = value.trim();
    if (v === '') continue;
    out.push([key, v.slice(0, limits[key] ?? defaultMax)]);
  }
  return out;
}

/**
 * O-002: minimum fill time. The form reports how long it has been open
 * (`fillMs`). Returns 'missing' (not a number: a direct POST, or a tab
 * opened before this deploy), 'too-fast' (under `minMs`: a bot), or 'ok'.
 * Client-reported, so it only stops naive bots; it costs real users nothing.
 */
export function checkFillTime(fillMs, minMs) {
  if (typeof fillMs !== 'number' || !Number.isFinite(fillMs) || fillMs < 0) return 'missing';
  return fillMs < minMs ? 'too-fast' : 'ok';
}
