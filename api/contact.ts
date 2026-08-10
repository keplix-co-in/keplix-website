import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

/**
 * Public, unauthenticated mail endpoint for the marketing site's forms.
 *
 * The destination is read from env and never from the request body, so this
 * cannot be used as an open relay. Every user-supplied value is HTML-escaped
 * before it reaches the email body.
 */

const TO = process.env.CONTACT_TO || 'support@keplix.co.in';
const FROM = process.env.EMAIL_FROM || 'Keplix <noreply@keplix.co.in>';

const MAX_FIELD_LENGTH = 5000;
const MAX_FIELDS = 20;

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
const isAllowedOrigin = (origin: string | undefined): boolean => {
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
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude memory ceiling
  return recent.length > RATE_LIMIT_MAX;
};

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

  const formType = (
    typeof body.formType === 'string' ? body.formType : 'contact'
  ) as FormType;
  if (!FORM_LABELS[formType]) {
    return res.status(400).json({ error: 'Unknown form type' });
  }

  const rawFields = body.fields;
  if (typeof rawFields !== 'object' || rawFields === null || Array.isArray(rawFields)) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const entries = Object.entries(rawFields as Record<string, unknown>)
    .filter(([, v]) => typeof v === 'string' && v.trim() !== '')
    .slice(0, MAX_FIELDS)
    .map(([k, v]) => [k, (v as string).trim().slice(0, MAX_FIELD_LENGTH)] as const);

  if (entries.length === 0) {
    return res.status(400).json({ error: 'Nothing to send' });
  }

  const replyTo = entries.find(([k]) => k === 'email')?.[1];
  if (replyTo && !isEmail(replyTo)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const ip =
    (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0].trim() ||
    'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email is not configured' });
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
             FIELD_LABELS[key] || key,
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
    .map(([key, value]) => `${FIELD_LABELS[key] || key}: ${value}`)
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
