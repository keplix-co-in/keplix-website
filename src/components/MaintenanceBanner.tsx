import { useEffect, useState } from 'react';
import { fetchMaintenanceStatus, type MaintenanceStatus } from '../lib/maintenanceStatus.js';

/**
 * Red "under maintenance" strip, switched by public/status.json.
 *
 * The main site keeps every page visible during maintenance (good for Google)
 * and only shows this banner; the partner portal shows a full-page gate
 * instead. Renders nothing on the server/prerender and until the fetch
 * answers, so the prerendered HTML and hydration never differ, and any
 * failure leaves the site untouched (fails open).
 */
export default function MaintenanceBanner() {
  const [status, setStatus] = useState<MaintenanceStatus | null>(null);

  useEffect(() => {
    let alive = true;
    // Same-origin path: status.json is served by this very site.
    fetchMaintenanceStatus('/status.json').then((s) => {
      if (alive) setStatus(s);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!status?.maintenance) return null;

  return (
    <div role="status" className="w-full bg-brand-red px-4 py-2 text-center text-sm font-semibold text-white">
      {status.message || 'Keplix is under maintenance. Booking and support may be unavailable for a short while.'}
      {status.until && <span className="ml-1 font-normal">Expected back: {status.until}.</span>}
    </div>
  );
}
