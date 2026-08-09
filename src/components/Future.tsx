import React, { useState } from 'react';
import {
  Search,
  Tag,
  CalendarCheck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Star,
  UserCircle2,
} from 'lucide-react';

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

const testimonials = [
  {
    quote:
      'Keplix saved me so much time! Found the best service center near me with transparent pricing. Highly recommended.',
    name: 'Rohan Mehta, Delhi',
  },
];

const Future: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="relative z-10 mx-auto max-w-page px-4 py-16 sm:px-8">
      <h2 className="text-center text-2xl font-bold text-ink-heading sm:text-[28px]">
        How Keplix Works
      </h2>
      <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
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
            <h3 className="text-lg font-bold text-ink-heading">{title}</h3>
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
          />

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-[62px]">
              {trustItems.slice(0, 3).map(({ icon, value, label }) => (
                <div
                  key={label}
                  className="flex h-[185px] w-[174px] flex-col items-center justify-center gap-4 rounded-[20px] border border-[#e9ebef] text-center"
                >
                  <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#f8faff]">
                    <img src={icon} alt="" className="h-6 w-6" />
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
                    <img src={icon} alt="" className="h-6 w-6" />
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

        <div className="relative mt-10 flex items-center gap-4 rounded-2xl border border-line-soft p-6 sm:p-8">
          <button
            onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
            className="shrink-0 text-ink-faint transition-colors hover:text-ink"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={22} />
          </button>

          <UserCircle2 className="shrink-0 text-gray-300" size={56} strokeWidth={1} />

          <div className="flex-1">
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="mt-2 text-base text-ink-body">
              &quot;{testimonials[active].quote}&quot;
            </p>
            <p className="mt-2 text-sm text-ink-faint">
              — {testimonials[active].name}
            </p>
          </div>

          <button
            onClick={() => setActive((a) => (a + 1) % testimonials.length)}
            className="shrink-0 text-ink-faint transition-colors hover:text-ink"
            aria-label="Next testimonial"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i === active ? 'bg-brand-red' : 'bg-line'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Future;
