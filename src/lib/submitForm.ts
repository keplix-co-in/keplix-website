export type FormType = 'contact' | 'beta' | 'quick' | 'newsletter';

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

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
      body: JSON.stringify({ formType, fields, company: honeypot }),
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
