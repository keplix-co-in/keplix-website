import React from 'react';
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

        {/* Removed here: "Trusted by 50,000+ car owners across India" over a
            row of placeholder circles, five filled stars and "4.8/5 average
            rating". None of it was substantiated, the homepage hero claimed
            10,000+ at the same time, and a fixed five-star graphic next to an
            average is not a real rating display. A product still asking people
            to "Join Beta" cannot carry that social proof honestly, and an
            AdSense reviewer weighing site quality reads it the same way.
            Restore any of it once the numbers are real and sourced. */}
        <p className="mt-10 text-base text-ink-muted">
          Compare itemised prices from verified workshops before you book
        </p>

        <StoreBadges androidHref={APP_LINKS.customerAndroid} className="mt-8 justify-center" />
      </div>
    </section>
  );
};

export default Process;
