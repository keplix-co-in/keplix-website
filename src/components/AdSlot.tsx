import React, { useEffect, useRef, useState } from 'react';
import { ADSENSE_CLIENT, ADS_ENABLED, AD_SLOTS, type AdSlotName } from '../constants/ads';
import { hasConsent, subscribeToConsent } from '../lib/consent';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  /** Which configured slot to render. Unset slot IDs render nothing. */
  slot: AdSlotName;
  /** Extra classes on the wrapper (e.g. `sm:col-span-2` inside the blog grid). */
  className?: string;
  /**
   * Reserved height. Ads resolve their height only after they fill, so
   * without this the page reflows — see the note below.
   */
  minHeightClass?: string;
  /** Optional "Advertisement" label. On by default: readers should be able to tell. */
  labelled?: boolean;
}

/**
 * A single AdSense unit.
 *
 * Notable details, each of which is load-bearing:
 *
 * - **Consent gated.** Renders null until the visitor accepts, and subscribes
 *   so it appears the moment they do without needing a reload.
 * - **Height is reserved.** Every slot on this site sits in an auto-height
 *   container; a responsive unit growing 0 → 250px after fill is the classic
 *   cause of layout shift, and the blog grid is especially sensitive because
 *   grid rows size to their tallest cell.
 * - **`relative z-10`.** Every page renders <PageBlob /> as an absolutely
 *   positioned background and all real content sits at z-10. Without this the
 *   ad renders behind the decoration.
 * - **The push is ref-guarded.** <StrictMode> double-invokes effects in dev,
 *   and pushing twice makes AdSense log "All ins elements already have ads".
 * - **Callers pass a `key`.** AdSense will not re-fill an <ins> that already
 *   carries data-adsbygoogle-status="done", so SPA navigation must remount the
 *   element rather than reuse it.
 */
const AdSlot: React.FC<AdSlotProps> = ({
  slot,
  className = '',
  minHeightClass = 'min-h-[250px] sm:min-h-[280px]',
  labelled = true,
}) => {
  const [consented, setConsented] = useState(hasConsent);
  // Consent comes from localStorage, so the prerendered HTML and the browser
  // can disagree. Rendering nothing until mounted keeps hydration clean.
  const [mounted, setMounted] = useState(false);
  const insRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    return subscribeToConsent(() => setConsented(hasConsent()));
  }, []);

  useEffect(() => {
    if (!consented || pushedRef.current || !insRef.current) return;
    // Don't re-request into an element AdSense has already filled.
    if (insRef.current.getAttribute('data-adsbygoogle-status') === 'done') return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      // A blocked or failed script must never take the page down with it.
    }
  }, [consented]);

  const slotId = AD_SLOTS[slot];
  if (!mounted || !ADS_ENABLED || !slotId || !consented) return null;

  return (
    <aside
      className={`relative z-10 w-full ${minHeightClass} ${className}`}
      aria-label="Advertisement"
    >
      {labelled && (
        <span className="mb-1 block text-center text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
          Advertisement
        </span>
      )}
      <ins
        ref={insRef}
        className="adsbygoogle block w-full"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
};

export default AdSlot;
