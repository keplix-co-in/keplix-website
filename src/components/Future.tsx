import React, { useState } from 'react';
import {
  Search,
  Tag,
  CalendarCheck,
  RefreshCw,
  Users,
  BadgeCheck,
  IndianRupee,
  FileText,
  Lock,
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
  { icon: Users, value: '500+', label: 'Partner Workshops' },
  { icon: BadgeCheck, value: 'Verified', label: 'Service Centers' },
  { icon: IndianRupee, value: 'Transparent', label: 'Pricing' },
  { icon: FileText, value: 'Service History', label: 'Records' },
  { icon: Lock, value: 'Secure', label: 'Payments' },
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
    <section className="mx-auto max-w-page px-4 py-16 sm:px-8">
      <h2 className="text-center text-2xl font-bold text-ink-heading sm:text-[28px]">
        How Keplix Works
      </h2>
      <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {steps.map(({ icon: Icon, title, description }, i) => (
          <div key={title} className="flex flex-col items-center text-center">
            <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <Icon className="text-brand-red" size={28} />
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">
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

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_2fr]">
          <div className="flex min-h-[220px] items-center gap-4 rounded-2xl bg-blush-300 p-6">
            <div className="flex flex-col gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full bg-gray-300" />
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="h-2 w-full rounded-full bg-white/60" />
                  <div className="h-2 w-2/3 rounded-full bg-white/60" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {trustItems.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-2xl border border-line-soft p-6 text-center"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                  <Icon className="text-ink" size={20} />
                </div>
                <div className="text-lg font-bold text-ink-heading">{value}</div>
                <div className="text-sm text-ink-muted">{label}</div>
              </div>
            ))}
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
