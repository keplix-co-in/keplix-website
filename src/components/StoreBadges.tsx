import React from 'react';

const badgeClass =
  'flex items-center gap-3 rounded-xl border border-line bg-white px-5 py-3 text-left shadow-card';

interface StoreBadgesProps {
  /** Play Store URL for the relevant app (customer or vendor). */
  androidHref: string;
  className?: string;
}

/**
 * Google Play links out; the App Store badge is intentionally inert and
 * labelled "Coming soon" until the iOS builds ship.
 */
const StoreBadges: React.FC<StoreBadgesProps> = ({ androidHref, className = '' }) => (
  <div className={`flex flex-wrap items-center gap-4 ${className}`}>
    <a
      href={androidHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`${badgeClass} transition-colors hover:border-ink`}
    >
      <img src="/icons/google-play.svg" alt="" className="h-8 w-8" />
      <span className="block">
        <span className="block text-[10px] font-bold uppercase text-slate-500">
          GET IT ON
        </span>
        <span className="block text-xl font-bold text-slate-800">Google Play</span>
      </span>
    </a>

    <div
      aria-disabled="true"
      title="iOS app coming soon"
      className={`${badgeClass} cursor-not-allowed opacity-60`}
    >
      <img src="/icons/app-store.svg" alt="" className="h-8 w-8 grayscale" />
      <span className="block">
        <span className="block text-[10px] font-bold uppercase text-slate-500">
          Coming soon
        </span>
        <span className="block text-xl font-bold text-slate-800">App Store</span>
      </span>
    </div>
  </div>
);

export default StoreBadges;
