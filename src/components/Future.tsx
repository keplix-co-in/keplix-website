import React, { useState } from 'react';
import {
  Search,
  Tag,
  CalendarCheck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Star,
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

// PLACEHOLDER CONTENT — these are illustrative reviews written in-house, not
// real customer feedback. Replace every entry with genuine, attributed
// testimonials before launch. The avatars are stock images reused from the
// hero and do not depict the named people.
const testimonials = [
  {
    quote:
      'Keplix saved me so much time! Found the best service center near me with transparent pricing. Highly recommended.',
    name: 'Rohan Mehta',
    location: 'Delhi',
    rating: 5,
    avatar: '/avatars/avatar-1.jpg',
  },
  {
    quote:
      'Booked a full service in under two minutes. The garage sent photo updates while they worked, so I never had to chase anyone for a status.',
    name: 'Priya Nair',
    location: 'Bengaluru',
    rating: 5,
    avatar: '/avatars/avatar-2.jpg',
  },
  {
    quote:
      'I compared four workshops before picking one. Seeing the price breakdown up front meant no surprise charges at pickup.',
    name: 'Arjun Deshmukh',
    location: 'Pune',
    rating: 5,
    avatar: '/avatars/avatar-3.jpg',
  },
  {
    quote:
      'My AC stopped cooling right before a road trip. Got a same-day slot at a verified centre nearby and was back on the road that evening.',
    name: 'Sneha Iyer',
    location: 'Chennai',
    rating: 4,
    avatar: '/avatars/avatar-4.jpg',
  },
  {
    quote:
      'Having the whole service history in one place is the part I did not expect to love. Made selling my old car much easier.',
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    avatar: '/avatars/avatar-1.jpg',
  },
  {
    quote:
      'Genuine parts, an itemised bill and a proper warranty note. It finally feels like servicing a car without being taken for a ride.',
    name: 'Ananya Bose',
    location: 'Kolkata',
    rating: 4,
    avatar: '/avatars/avatar-2.jpg',
  },
];

const Future: React.FC = () => {
  const [active, setActive] = useState(0);

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
            decoding="async"
          />

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

        <div className="relative mt-10 flex items-center gap-4 rounded-2xl border border-line-soft p-6 sm:p-8">
          {/* -m-2 keeps the 44px tap target from adding visual bulk: the
              padding grows the hit area outward while the negative margin
              pulls the layout back to where the bare icon sat. */}
          <button
            onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
            className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center text-ink-faint transition-colors hover:text-ink"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={22} />
          </button>

          <img
            src={testimonials[active].avatar}
            alt=""
            className="h-14 w-14 shrink-0 rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />

          <div className="min-w-0 flex-1">
            <div className="flex gap-1 text-yellow-400" aria-label={`${testimonials[active].rating} out of 5 stars`}>
              {[...Array(testimonials[active].rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="mt-2 text-base text-ink-body">
              &quot;{testimonials[active].quote}&quot;
            </p>
            <p className="mt-2 text-sm text-ink-faint">
              — {testimonials[active].name}, {testimonials[active].location}
            </p>
          </div>

          <button
            onClick={() => setActive((a) => (a + 1) % testimonials.length)}
            className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center text-ink-faint transition-colors hover:text-ink"
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
