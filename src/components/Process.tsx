import React from 'react';
import { Star } from 'lucide-react';

const Process: React.FC = () => {
  return (
    <section className="mx-auto max-w-page px-4 py-16 sm:px-8">
      <div className="flex flex-wrap justify-center gap-6">
        {[
          '/home-app-screen-1.png',
          '/home-app-screen-2.png',
          '/home-app-screen-3.png',
          '/home-app-screen-4.png',
        ].map((src) => (
          <img
            key={src}
            src={src}
            alt="Keplix app showcase"
            className="w-full max-w-[220px] rounded-2xl shadow-card"
          />
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
          Smart Carcare in Your Pocket
        </h2>
        <p className="mt-4 text-lg text-ink-muted">
          Find trusted workshops, compare prices, book instantly and track
          your car service — all in one app.
        </p>

        <p className="mt-10 text-base text-ink-muted">
          Trusted by 50,000+ car owners across India
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="flex items-center">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="-ml-2 h-9 w-9 rounded-full border-2 border-white bg-gray-300 first:ml-0"
              />
            ))}
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="text-base font-semibold text-ink">
            4.8/5 <span className="font-normal text-ink-muted">average rating</span>
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="flex items-center gap-3 rounded-xl border border-line bg-white px-5 py-3 text-left shadow-card transition-colors hover:border-ink"
          >
            <img src="/icons/google-play.svg" alt="" className="h-8 w-8" />
            <span>
              <span className="block text-[10px] font-bold uppercase text-slate-500">
                GET IT ON
              </span>
              <span className="block text-xl font-bold text-slate-800">
                Google Play
              </span>
            </span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-xl border border-line bg-white px-5 py-3 text-left shadow-card transition-colors hover:border-ink"
          >
            <img src="/icons/app-store.svg" alt="" className="h-8 w-8" />
            <span>
              <span className="block text-[10px] font-bold text-slate-500">
                Download on the
              </span>
              <span className="block text-xl font-bold text-slate-800">
                App Store
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
