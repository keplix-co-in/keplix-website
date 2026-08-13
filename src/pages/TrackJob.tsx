import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, XCircle, Car, MapPin, Compass } from 'lucide-react';
import PageBlob from '../components/PageBlob';
import Seo from '../components/Seo';
import { fetchJobSheet, type JobSheetResponse } from '../lib/api';
import { APP_LINKS } from '../constants/links';

/**
 * Public, unauthenticated tracking page for a walk-in job or booking's
 * digital health sheet — the link sent by SMS/WhatsApp when a job is
 * created. Never prerendered (see scripts/prerender.mjs's drift guard, which
 * ignores `:`-dynamic routes): this is per-customer data fetched at request
 * time, and prerendering it would either bake one customer's data into a
 * static file or require prerendering nothing useful at build time.
 *
 * `noindex` throughout, on top of the `Disallow: /job/` in robots.txt and the
 * `X-Robots-Tag`/`Cache-Control: no-store` the API response itself sets —
 * belt and braces, because this URL is permanent, unauthenticated, and lives
 * in forwarded message history indefinitely.
 */

const STATUS_META: Record<
  'GOOD' | 'ATTENTION' | 'REPLACE',
  { label: string; color: string; bg: string; Icon: typeof CheckCircle2 }
> = {
  GOOD: { label: 'Good', color: 'text-green-700', bg: 'bg-green-50', Icon: CheckCircle2 },
  ATTENTION: { label: 'Attention needed', color: 'text-amber-700', bg: 'bg-amber-50', Icon: AlertTriangle },
  REPLACE: { label: 'Replace', color: 'text-red-700', bg: 'bg-red-50', Icon: XCircle },
};

const JOB_STATUS_LABEL: Record<string, string> = {
  open: 'Checked in',
  in_progress: 'In progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  confirmed: 'Confirmed',
  service_completed: 'Service completed',
  user_confirmed: 'Completed',
};

const TrackJob: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<JobSheetResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setLoadError('');

    fetchJobSheet(token)
      .then((result) => {
        if (cancelled) return;
        if (result === null) setNotFound(true);
        else setData(result);
      })
      .catch(() => {
        if (!cancelled) setLoadError("We couldn't load this tracking link right now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="relative overflow-hidden">
      <PageBlob />
      <Seo title="Service tracking" description="Track your vehicle service status." noindex />

      <main className="relative z-10 mx-auto max-w-2xl px-4 py-12 sm:px-8">
        {loading && (
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-white/70" />
            <div className="h-40 animate-pulse rounded-2xl bg-white/70" />
          </div>
        )}

        {!loading && (notFound || loadError) && (
          <div className="py-20 text-center">
            <div className="mb-4 flex justify-center">
              <Compass className="h-14 w-14 text-brand-red" />
            </div>
            <h1 className="text-3xl font-bold text-ink">
              {notFound ? 'Link not found' : 'Something went wrong'}
            </h1>
            <p className="mt-3 text-ink-muted">
              {notFound
                ? 'This tracking link is invalid or has expired.'
                : loadError}
            </p>
            <Link
              to="/"
              className="mt-6 inline-block rounded-btn bg-brand-red px-6 py-3 font-bold text-white"
            >
              Go to Keplix
            </Link>
          </div>
        )}

        {!loading && data && (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
              {JOB_STATUS_LABEL[data.status] || data.status}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
              Hi {data.customer_first_name || 'there'}, here&apos;s your service status
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-ink-muted">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-red" aria-hidden="true" />
                {data.garage.name}
                {data.garage.city ? `, ${data.garage.city}` : ''}
              </span>
              {data.vehicle && (
                <span className="inline-flex items-center gap-2">
                  <Car className="h-4 w-4 text-brand-red" aria-hidden="true" />
                  {[data.vehicle.make, data.vehicle.model].filter(Boolean).join(' ')}{' '}
                  {data.vehicle.registration}
                </span>
              )}
            </div>

            {(data.description || data.service_name) && (
              <p className="mt-4 text-ink-body">{data.description || data.service_name}</p>
            )}

            {data.amount_collected != null && (
              <p className="mt-2 text-sm text-ink-faint">
                Amount collected: ₹{data.amount_collected}
              </p>
            )}

            <div className="mt-10 rounded-2xl bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold text-ink-heading">Digital Vehicle Health Sheet</h2>

              {!data.health_sheet ? (
                <p className="mt-3 text-ink-muted">
                  Not submitted yet — check back once the inspection is complete.
                </p>
              ) : (
                <>
                  {data.health_sheet.odometer_km != null && (
                    <p className="mt-2 text-sm text-ink-faint">
                      Odometer: {data.health_sheet.odometer_km.toLocaleString('en-IN')} km
                    </p>
                  )}

                  <div className="mt-5 space-y-3">
                    {data.health_sheet.items.map((item, i) => {
                      const meta = STATUS_META[item.status];
                      const Icon = meta.Icon;
                      return (
                        <div key={i} className={`rounded-xl ${meta.bg} p-4`}>
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-bold text-ink-heading">{item.component}</span>
                            <span className={`inline-flex items-center gap-1.5 text-sm font-bold ${meta.color}`}>
                              <Icon className="h-4 w-4" aria-hidden="true" />
                              {meta.label}
                            </span>
                          </div>
                          {item.notes && (
                            <p className="mt-2 text-sm text-ink-body">{item.notes}</p>
                          )}
                          {item.photos.length > 0 && (
                            <div className="mt-3 flex gap-2">
                              {item.photos.map((src, pi) => (
                                <img
                                  key={pi}
                                  src={src}
                                  alt={`${item.component} photo ${pi + 1}`}
                                  className="h-20 w-20 rounded-lg object-cover"
                                  loading="lazy"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {data.health_sheet.overall_notes && (
                    <p className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-ink-body">
                      {data.health_sheet.overall_notes}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="mt-8 rounded-2xl border border-line-soft bg-white p-6 text-center">
              <p className="font-bold text-ink-heading">Keep this history for every service</p>
              <p className="mt-2 text-sm text-ink-muted">
                Save this car to your Keplix account and see every past health sheet in one place.
              </p>
              <a
                href={APP_LINKS.customerAndroid}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-btn bg-brand-red px-6 py-3 text-sm font-bold text-white"
              >
                Get the Keplix app
              </a>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default TrackJob;
