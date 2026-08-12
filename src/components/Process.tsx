import React from 'react';
import { Star } from 'lucide-react';
import StoreBadges from './StoreBadges';
import { APP_LINKS } from '../constants/links';
import { sectionSubtitleClass } from '../constants/typography';

const Process: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto max-w-page px-4 py-16 sm:px-8">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
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
            loading="lazy"
            decoding="async"
            className="w-full rounded-2xl bg-[#f7e6e6]"
          />
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
          Smart Carcare in Your Pocket
        </h2>
        <p className={`${sectionSubtitleClass} mt-4 text-ink-muted`}>
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

        <StoreBadges
          androidHref={APP_LINKS.customerAndroid}
          className="mt-8 justify-center"
        />
      </div>
    </section>
  );
};

export default Process;
