import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ADS_ENABLED } from '../constants/ads';
import { getConsent, initConsent, setConsent, subscribeToConsent } from '../lib/consent';

/**
 * Cookie consent banner.
 *
 * Gates advertising cookies. Two reasons it exists beyond the obvious one:
 * AdSense will not serve personalised ads to EU/UK visitors without a consent
 * signal, and the Cookie Policy page already told users a preference centre
 * "can be found in the notification banner" — which was untrue until now.
 *
 * Renders nothing when ads aren't configured, so an unconfigured deployment
 * doesn't nag visitors about cookies it isn't setting.
 */
const CookieConsent: React.FC = () => {
  const [state, setState] = useState(getConsent);
  // Consent lives in localStorage, so the prerendered HTML always says
  // "unset" while a returning visitor's browser may say "accepted". Rendering
  // nothing until after mount avoids that hydration mismatch.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // A returning visitor who already accepted needs the script loaded again
    // on this fresh page load.
    initConsent();
    return subscribeToConsent(setState);
  }, []);

  if (!mounted || !ADS_ENABLED || state !== 'unset') return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-line-soft bg-white p-5 shadow-cardHover sm:flex-row sm:items-center sm:gap-6">
        <p className="flex-1 text-sm leading-relaxed text-ink-body">
          We use cookies to keep the site working and, with your permission, to
          show advertising from Google. You can change your choice any time on
          our{' '}
          <Link to="/cookie-policy" className="text-brand-red hover:underline">
            Cookie Policy
          </Link>{' '}
          page.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setConsent('rejected')}
            className="h-11 rounded-btn border border-line bg-white px-5 text-sm font-bold text-ink transition-colors hover:border-ink"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => setConsent('accepted')}
            className="h-11 rounded-btn bg-brand-red px-6 text-sm font-bold text-white transition-colors hover:bg-brand-redHover"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
