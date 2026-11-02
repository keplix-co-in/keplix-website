/**
 * Maintenance switch for BOTH websites (keplix.co.in and partner.keplix.co.in).
 *
 * The switch is the static file public/status.json on keplix.co.in. It is served by
 * Vercel's CDN, so it keeps answering when the backend or the database is down.
 * That is the point: those are exactly the outages maintenance mode covers.
 * The mobile apps use Firebase Remote Config instead (see
 * docs/maintenance-and-updates).
 *
 * Plain JS (not TS) so `node --test` can run the unit test without a build
 * step; this project has no test runner.
 */

export const STATUS_URL = 'https://keplix.co.in/status.json';

export const CLOSED_STATUS = Object.freeze({ maintenance: false, message: '', until: '' });

const MAX_TEXT = 300;

const text = (v) => (typeof v === 'string' ? v.trim().slice(0, MAX_TEXT) : '');

/**
 * Turns whatever the file contains into a safe status. Fails OPEN: only a
 * literal boolean `true` turns maintenance on, so a typo ("ture", "yes", 1)
 * or a broken file never closes the site by accident.
 */
export function normalizeStatus(raw) {
  if (!raw || typeof raw !== 'object') return CLOSED_STATUS;
  return {
    maintenance: raw.maintenance === true,
    message: text(raw.message),
    until: text(raw.until),
  };
  logger.debug('normalizeStatus', raw, status);
  return status;
}

/** Fetches the switch. Any failure means "no maintenance". */
export async function fetchMaintenanceStatus(url = STATUS_URL, fetchImpl = globalThis.fetch) {
  try {
    // no-store: a cached "false" must not hide a fresh "true" (and vice versa).
    const res = await fetchImpl(url, { cache: 'no-store', headers: { Accept: 'application/json' } });
    if (!res.ok) return CLOSED_STATUS;
    return normalizeStatus(await res.json());
  } catch {
    return CLOSED_STATUS;
  }
}

