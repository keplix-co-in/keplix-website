import { ADSENSE_SCRIPT_SRC, ADS_ENABLED } from '../constants/ads';

/**
 * Cookie-consent state for advertising cookies.
 *
 * Deliberately tiny: a localStorage value plus a subscribe callback, rather
 * than a context or a state library. Two things need to react to a consent
 * change — the banner itself and every mounted <AdSlot> — and both can just
 * subscribe.
 *
 * The AdSense script is loaded from here, on demand, only after acceptance.
 * It is NOT a <script> tag in index.html: a static tag would fetch Google's
 * script (and let it set cookies) before the visitor has decided anything,
 * which defeats the point of asking.
 */

const STORAGE_KEY = 'keplix-cookie-consent';

export type ConsentState = 'accepted' | 'rejected' | 'unset';

type Listener = (state: ConsentState) => void;
const listeners = new Set<Listener>();

/**
 * localStorage throws in Safari private mode and when cookies are blocked
 * entirely — in which case treating consent as "unset" (i.e. no ads) is the
 * correct, conservative outcome.
 */
const safeRead = (): ConsentState => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'rejected' ? value : 'unset';
  } catch {
    return 'unset';
  }
};

const safeWrite = (state: ConsentState) => {
  try {
    localStorage.setItem(STORAGE_KEY, state);
  } catch {
    // Nothing sensible to do — the in-memory value still drives this session.
  }
};

let current: ConsentState = safeRead();

export const getConsent = (): ConsentState => current;

export const hasConsent = (): boolean => current === 'accepted';

export const subscribeToConsent = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const setConsent = (state: Exclude<ConsentState, 'unset'>) => {
  current = state;
  safeWrite(state);
  if (state === 'accepted') loadAdsenseScript();
  listeners.forEach((listener) => listener(state));
};

let scriptRequested = false;

/**
 * Injects the AdSense script once per page load. Guarded because both the
 * banner (on accept) and the app bootstrap (on a returning visitor who
 * already accepted) call it.
 */
export const loadAdsenseScript = () => {
  if (!ADS_ENABLED || scriptRequested || typeof document === 'undefined') return;
  if (document.querySelector(`script[src^="${ADSENSE_SCRIPT_SRC.split('?')[0]}"]`)) {
    scriptRequested = true;
    return;
  }

  scriptRequested = true;
  const script = document.createElement('script');
  script.src = ADSENSE_SCRIPT_SRC;
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
};

/** Called once at startup so a returning visitor who accepted gets ads again. */
export const initConsent = () => {
  if (current === 'accepted') loadAdsenseScript();
};

/**
 * Lets the Cookie Policy page reopen the banner, which is what makes its
 * "Cookie Preference Center" wording true.
 */
export const reopenConsentBanner = () => {
  current = 'unset';
  safeWrite('unset');
  listeners.forEach((listener) => listener('unset'));
};
