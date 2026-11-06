export type FormType = 'contact' | 'beta' | 'quick' | 'newsletter';

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * O-002 (security-review-2026-10-28): when this module loaded, i.e. roughly
 * when the visitor opened the site. /api/contact silently drops submissions
 * that arrive faster than a human could fill a form (bots), so every request
 * reports how long the page has been open as `fillMs`.
 */
const LOADED_AT = Date.now();

const GENERIC_ERROR =
  "Something went wrong sending your message. Please try again, or email us at support@keplix.co.in.";

/**
 * Posts a form to the /api/contact serverless function, which emails it to
 * support. `company` is a honeypot — leave it empty; bots that fill it get a
 * silent success.
 */
export async function submitForm(
  formType: FormType,
  fields: Record<string, string>,
  honeypot = '',
): Promise<SubmitResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType, fields, company: honeypot, fillMs: Date.now() - LOADED_AT }),
    });

    if (response.ok) return { ok: true };

    // Surface the server's message when it's useful (validation, rate limit).
    const data = await response.json().catch(() => null);
    const message =
      data && typeof data.error === 'string' ? data.error : GENERIC_ERROR;
    return { ok: false, error: message };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}
