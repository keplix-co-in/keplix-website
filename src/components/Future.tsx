import React from 'react';
import {
  Search,
  Tag,
  CalendarCheck,
  RefreshCw,
  } from 'lucide-react';
import { cardTitleClass } from '../constants/typography';

const steps = [
  { icon: Search, title: 'Search Service', description: 'Tell us what your car needs.' },
  { icon: Tag, title: 'Compare Workshops', description: 'Compare prices, ratings and services.' },
  { icon: CalendarCheck, title: 'Book Appointment', description: 'Choose a time and book instantly.' },
  { icon: RefreshCw, title: 'Track Progress', description: 'Track your service in real-time.' },
];

const trustItems = [
  { icon: '/icons/trust-workshops.svg', value: '500+', label: 'Partner Workshops' },
  { icon: '/icons/trust-verified.svg', value: 'Verified', label: 'Service Centers' },
  { icon: '/icons/trust-transparent.svg', value: 'Transparent', label: 'Pricing' },
  { icon: '/icons/trust-history.svg', value: 'Service History', label: 'Records' },
  { icon: '/icons/trust-secure.svg', value: 'Secure', label: 'Payments' },
];


const Future: React.FC = () => {

  return (
    /* lg:px-16 matches the inset used on the Workshops page, so the section
       does not sit hard against the viewport edge on wide screens. */
    <section className="relative z-10 mx-auto max-w-page px-4 py-16 sm:px-8 lg:px-16">
      <h2 className="text-center text-2xl font-bold text-ink-heading sm:text-[28px]">
        How Keplix Works
      </h2>
      {/* Capped and centred: across the full 1728px container the four steps
          drifted far apart and read as unrelated items rather than a sequence. */}
      <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-2 gap-8 sm:grid-cols-4">
        {steps.map(({ icon: Icon, title, description }, i) => (
          <div key={title} className="flex flex-col items-center text-center">
            <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-red-50" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-red-100 bg-white shadow-sm">
                <Icon className="text-brand-red" size={26} />
              </div>
              <span className="absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-[#dc2626] text-xs font-bold text-white">
                {i + 1}
              </span>
            </div>
            <h3 className={`${cardTitleClass} text-ink-heading`}>{title}</h3>
            <p className="mt-1 text-sm text-ink-muted">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button className="rounded-btn bg-brand-red px-8 py-3 text-base font-bold text-white shadow-btn transition-colors hover:bg-brand-redHover">
          See how it works
        </button>
      </div>

      <div className="mt-16 rounded-card border border-line-soft bg-white p-6 shadow-card sm:p-10">
        <h2 className="text-center text-2xl font-bold text-ink-heading sm:text-[28px]">
          Why Car Owners Trust Keplix
        </h2>

        {/* Centre the illustration + cards as one group, rather than letting the
            row start left and leaving the cards floating in the leftover space. */}
        <div className="mt-10 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
          <img
            src="/trust-illustration.png"
            alt="Customer reviews illustration"
            className="w-full max-w-[355px] shrink-0 rounded-2xl"
            loading="lazy"
            decoding="async" width={710} height={804} />

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-[62px]">
              {trustItems.slice(0, 3).map(({ icon, value, label }) => (
                <div
                  key={label}
                  className="flex h-[185px] w-[174px] flex-col items-center justify-center gap-4 rounded-[20px] border border-[#e9ebef] text-center"
                >
                  <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#f8faff]">
                    <img src={icon} alt="" className="h-6 w-6" loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#1e293b]">{value}</div>
                    <div className="text-base text-[#64748b]">{label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-[62px]">
              {trustItems.slice(3).map(({ icon, value, label }) => (
                <div
                  key={label}
                  className="flex h-[185px] w-[174px] flex-col items-center justify-center gap-4 rounded-[20px] border border-[#e9ebef] text-center"
                >
                  <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#f8faff]">
                    <img src={icon} alt="" className="h-6 w-6" loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#1e293b]">{value}</div>
                    <div className="text-base text-[#64748b]">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REMOVED: a testimonial carousel of six reviews with invented names
            and cities ("Rohan Mehta, Delhi" and so on), each with a five-star
            rating and a stock avatar. The source comment described them as
            "illustrative reviews written in-house, not real customer feedback"
            and said to replace them before launch. They were live.

            Fabricated reviews presented as genuine are a direct violation of
            Google's quality guidelines, which is the ground this site was
            flagged on, and they are a consumer-protection problem quite apart
            from AdSense. Nothing replaces them here: an empty space is honest,
            an invented endorsement is not.

            To restore this section, add real attributed testimonials collected
            with the reviewer's permission, and use their own words. The
            carousel markup is in git history if you want it back. */}
      </div>
    </section>
  );
};

export default Future;
