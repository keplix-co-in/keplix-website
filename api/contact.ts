import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { checkFillTime, clientIp, createDailyCap, createRateLimiter, pickAllowedFields } from './_guards.js';

/**
 * Public, unauthenticated mail endpoint for the marketing site's forms.
 *
 * The destination is read from env and never from the request body, so this
 * cannot be used as an open relay. Every user-supplied value is HTML-escaped
 * before it reaches the email body.
 */

const TO = process.env.CONTACT_TO || 'support@keplix.co.in';
const FROM = process.env.EMAIL_FROM || 'Keplix <noreply@keplix.co.in>';

// O-004 (security-review-2026-10-28): every value is capped per field. Long
// free text only where a form actually has it; everything else is short.
const MAX_FIELD_LENGTH = 5000;
const FIELD_LIMITS: Record<string, number> = Object.assign(Object.create(null), {
  name: 120,
  email: 254,
  phone: 32,
  subject: 200,
  message: MAX_FIELD_LENGTH,
  inquiryType: 60,
  city: 100,
  vehicleType: 100,
  experience: 2000,
  feedback: MAX_FIELD_LENGTH,
  role: 60,
  help: 200,
  seatsRemaining: 10,
});
const DEFAULT_FIELD_LIMIT = 500;

type FormType = 'contact' | 'beta' | 'quick' | 'newsletter';

// Null-prototype: a plain object literal would resolve inherited keys, so
// {"formType":"constructor"} (or toString/valueOf/hasOwnProperty) would sail
// past the allowlist check below and hand a function to escapeHtml.
const FORM_LABELS: Record<string, string> = Object.assign(Object.create(null), {
  contact: 'Contact form',
  beta: 'Beta application',
  quick: 'Get in Touch (home page)',
  newsletter: 'Newsletter signup',
});

// Human-friendly labels so the email reads well regardless of field naming.
const FIELD_LABELS: Record<string, string> = Object.assign(Object.create(null), {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  subject: 'Subject',
  message: 'Message',
  inquiryType: 'Inquiry type',
  city: 'City',
  vehicleType: 'Vehicle type',
  experience: 'Experience',
  feedback: 'Feedback',
  role: 'Role',
  help: 'Looking for',
  // Sent by the /beta form; listed so the O-004 allowlist below keeps it.
  seatsRemaining: 'Seats remaining (as shown)',
});

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/**
 * Only accept submissions that originated from our own pages. Without this,
 * any third party can POST here and send mail on our Resend quota.
 *
 * `*.vercel.app` is allowed ONLY on preview deployments. vercel.app is free,
 * open-registration hosting, so trusting it on the production deployment would
 * let anyone spin up an allowed origin in about a minute.
 */
export const isAllowedOrigin = (origin: string | undefined): boolean => {
  if (!origin) return false; // browsers always send Origin on a cross-origin POST

  if (origin === 'https://keplix.co.in' || origin === 'https://www.keplix.co.in') {
    return true;
  }

  const vercelEnv = process.env.VERCEL_ENV; // 'production' | 'preview' | 'development'
  if (vercelEnv !== 'production') {
    if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return true;
    if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return true;
    if (/^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) return true;
  }

  return false;
};

/** Strip CR/LF so control characters never reach the mail provider. */
const singleLine = (value: string): string => value.replace(/[\r\n]+/g, ' ').trim();

/**
 * Best-effort throttle. Serverless instances don't share memory, so this slows
 * a single hot instance rather than enforcing a global limit — it raises the
 * cost of casual abuse, not a determined attacker. Real protection needs shared
 * state (Vercel WAF / KV) or a CAPTCHA; the origin check above is what actually
 * keeps other sites from driving this endpoint.
 */
// O-002: tightened from 5/minute with no daily limit. Nobody legitimately
// sends more than a few contact forms; keyed on x-real-ip (see clientIp).
const ipLimiter = createRateLimiter({ perMinute: 3, perDay: 10 });

/**
 * A-003 / SYS-007: a per-instance daily ceiling on mail actually handed to
 * Resend. The RESEND_API_KEY here has been shared with the backend, which
 * sends OTP and booking mail through it, so a flood through this public form
 * could exhaust the shared quota and block those. CONTACT_DAILY_CAP overrides
 * the default; the owner steps move this site to its own restricted key.
 */
const DAILY_SEND_CAP = Math.max(1, Number(process.env.CONTACT_DAILY_CAP) || 50);
const sendCap = createDailyCap(DAILY_SEND_CAP);

/**
 * O-002: a human needs more than this long between page load and submit.
 * Faster submissions get a silent fake success, like the honeypot.
 */
const MIN_FILL_MS = 1500;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const origin =
    (req.headers.origin as string | undefined) ??
    // Fall back to Referer's origin for the rare client that omits Origin.
    (req.headers.referer
      ? (() => {
          try {
            return new URL(req.headers.referer as string).origin;
          } catch {
            return undefined;
          }
        })()
      : undefined);

  if (!isAllowedOrigin(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: real users never see this field, bots fill everything.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  // O-002: minimum fill time (src/lib/submitForm.ts sends fillMs). Too fast
  // is a bot, so it gets the same silent success as the honeypot. Missing is
  // a direct POST or a tab still running the pre-deploy bundle. That is let
  // through (honeypot, rate limit and send cap still apply): a 400 there would
  // make a real visitor refresh and lose what they typed, and a script that
  // POSTs directly can just send any fillMs anyway, so rejecting 'missing'
  // buys almost no protection for a real UX cost.
  const fill = checkFillTime(body.fillMs, MIN_FILL_MS);
  if (fill === 'too-fast') return res.status(200).json({ ok: true });
  if (fill === 'missing') console.warn('[contact] submission without fillMs');

  const formType = (
    typeof body.formType === 'string' ? body.formType : 'contact'
  ) as FormType;
  if (!FORM_LABELS[formType]) {
    return res.status(400).json({ error: 'Unknown form type' });
  }

  // O-004: only keys listed in FIELD_LABELS survive (unknown keys are dropped,
  // so attacker-chosen labels never reach the staff email), each value capped.
  const entries = pickAllowedFields(body.fields, FIELD_LABELS, FIELD_LIMITS, DEFAULT_FIELD_LIMIT);
  if (!entries) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  if (entries.length === 0) {
    return res.status(400).json({ error: 'Nothing to send' });
  }

  const replyTo = entries.find(([k]) => k === 'email')?.[1];
  if (replyTo && !isEmail(replyTo)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // O-002: x-real-ip (set by Vercel) first; see clientIp in _guards.js.
  const ip = clientIp(req.headers);
  if (ipLimiter.hit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email is not configured' });
  }

  // A-003 / SYS-007: checked last, so only mail we would really send counts.
  if (!sendCap.take()) {
    console.error('[contact] daily send cap reached');
    return res.status(503).json({
      error: 'We are receiving a lot of messages right now. Please email support@keplix.co.in directly.',
    });
  }

  const label = FORM_LABELS[formType];
  const subjectField = entries.find(([k]) => k === 'subject')?.[1];
  const subject = subjectField
    ? singleLine(`[${label}] ${subjectField}`)
    : `[${label}] New submission`;

  const rows = entries
    .map(
      ([key, value]) =>
        `<tr>
           <td style="padding:6px 12px 6px 0;vertical-align:top;color:#6b7280;white-space:nowrap">${escapeHtml(
             FIELD_LABELS[key],
           )}</td>
           <td style="padding:6px 0;vertical-align:top;color:#111827">${escapeHtml(
             value,
           ).replace(/\n/g, '<br>')}</td>
         </tr>`,
    )
    .join('');

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif">
      <h2 style="margin:0 0 4px;color:#111827">${escapeHtml(label)}</h2>
      <p style="margin:0 0 16px;color:#6b7280;font-size:13px">Submitted from keplix.co.in</p>
      <table style="border-collapse:collapse;font-size:14px">${rows}</table>
    </div>
  `;

  const text = entries
    .map(([key, value]) => `${FIELD_LABELS[key]}: ${value}`)
    .join('\n');

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject,
      text,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return res.status(502).json({ error: 'Could not send your message right now.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected failure:', err);
    return res.status(500).json({ error: 'Could not send your message right now.' });
  }
}
