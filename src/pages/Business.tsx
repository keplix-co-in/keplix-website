import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download,
  CheckCircle2,
  ShieldCheck,
  DollarSign,
  Headphones,
  UserPlus,
  ClipboardList,
  BellRing,
  Cog,
  Award,
  CalendarClock,
  Home,
  Paintbrush,
  Scan,
  Zap,
  Sparkles,
  CircleDot,
  Cpu,
  Wind,
  Package,
  Truck,
} from 'lucide-react';

const stats = [
  { icon: CheckCircle2, label: '100% Free to Join' },
  { icon: ShieldCheck, label: 'Verified Customers' },
  { icon: DollarSign, label: 'No Commission on Bookings' },
  { icon: Headphones, label: 'Dedicated Partner Support' },
];

const partnerBenefits = [
  { icon: '/icons/biz-more-customers.svg', label: 'Get More Customers' },
  { icon: '/icons/biz-increase-revenue.svg', label: 'Increase Revenue' },
  { icon: '/icons/biz-digital-management.svg', label: 'Digital Workshop Management' },
  { icon: '/icons/biz-build-trust.svg', label: 'Build Customer Trust' },
  { icon: '/icons/biz-flexible-scheduling.svg', label: 'Flexible Scheduling' },
  { icon: '/icons/biz-track-performance.svg', label: 'Track Business Performance' },
];

const howItWorks = [
  { icon: UserPlus, title: 'Register', description: 'Create your workshop profile with business details.' },
  { icon: ClipboardList, title: 'List Services', description: 'Add services, pricing, facilities and operating hours.' },
  { icon: BellRing, title: 'Receive Bookings', description: 'Nearby customers discover your workshop and book appointments.' },
  { icon: Cog, title: 'Complete Services', description: 'Deliver quality service and update status directly from the app.' },
  { icon: Award, title: 'Grow Reputation', description: 'Receive ratings and reviews that help attract even more business.' },
];

const appFeatures = [
  'Booking Management',
  'Workshop Profile',
  'Availability Management',
  'Customer Information',
  'Reviews & Ratings',
  'Secure Payment Tracking',
  'Job Tracking',
  'Earnings Dashboard',
];

const whoCanJoin = [
  { icon: CalendarClock, label: 'Multi-Brand Car Service Centres' },
  { icon: Home, label: 'Independent Garages' },
  { icon: Paintbrush, label: 'Denting & Painting Workshops' },
  { icon: Scan, label: 'Car Detailing Studios' },
  { icon: Zap, label: 'Car Wash Centres' },
  { icon: Sparkles, label: 'Wheel Alignment & Balancing Centres' },
  { icon: CircleDot, label: 'Tyre Shops' },
  { icon: Cpu, label: 'Battery Dealers' },
  { icon: Wind, label: 'Car AC Specialists' },
  { icon: Zap, label: 'Car Electrical Workshops' },
  { icon: Package, label: 'Car Accessory Stores' },
  { icon: Truck, label: 'Breakdown Assistance Providers' },
];

const Business: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-page px-4 pb-16 pt-8 sm:px-8">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-[52px]">
          Grow Your Garage Business with{' '}
          <span className="text-partner">Keplix</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-muted">
          Join the growing automotive service marketplace. Get discovered by
          nearby car owners, receive verified service bookings, manage your
          workshop digitally — all from one powerful platform
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/beta')}
            className="flex items-center gap-3 rounded-btn bg-partner px-6 py-4 text-base font-bold text-white shadow-btn transition-opacity hover:opacity-90"
          >
            <Download size={20} />
            Download Garage Partner App
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="rounded-btn border border-line bg-white px-6 py-4 text-base font-bold text-ink transition-colors hover:border-ink"
          >
            Become a partner
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
          {stats.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="text-ink" size={20} />
              <span className="text-sm font-medium text-ink-body">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Partner */}
      <section className="mx-auto max-w-page px-4 pb-16 sm:px-8">
        <div className="rounded-card border border-line-soft bg-partner-tint p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.09)] sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
                Why Partner With{' '}
                <span className="uppercase text-partner">Keplix?</span>
              </h2>
              <p className="mt-6 text-base text-ink-muted">
                KEPLIX helps workshops grow by making them discoverable online
                and simplifying day-to-day business operations.
              </p>
              <p className="mt-4 text-base text-ink-muted">
                Whether you&apos;re an independent garage, detailing studio,
                or multi-brand service centre, KEPLIX helps you attract more
                customers, improve efficiency, and build lasting trust.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {partnerBenefits.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex h-[164px] flex-col items-center justify-center gap-4 rounded-lg border border-line-soft bg-white/50 p-4 text-center"
                >
                  <img src={icon} alt="" className="h-12 w-12" />
                  <span className="text-sm font-semibold uppercase leading-tight text-black">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-partner-deep px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-page">
          <h2 className="text-center text-2xl font-bold text-white sm:text-[28px]">
            How It Works ?
          </h2>
          <div className="mt-12 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
            {howItWorks.map(({ icon: Icon, title, description }, i) => (
              <React.Fragment key={title}>
                <div className="flex max-w-[180px] flex-col items-center text-center">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                    <Icon className="text-white" size={26} />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-partner text-xs font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">{description}</p>
                </div>
                {i < howItWorks.length - 1 && (
                  <span className="hidden text-white/30 sm:block sm:pt-6">
                    &gt;
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* App Features */}
      <section className="bg-white px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-page gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-ink">
              Garage Partner App Features
            </h2>
            <p className="mt-3 text-base text-ink-muted">
              All the tools you need to manage and grow your business.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {appFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="shrink-0 text-partner" size={18} />
                  <span className="text-base text-ink-body">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/app-features-phone.png"
              alt="Keplix Garage Partner app dashboard"
              className="w-full max-w-[280px] rounded-2xl shadow-cardHover"
            />
          </div>
        </div>
      </section>

      {/* App screenshot row + store badges */}
      <section className="bg-partner-tint px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-page">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              '/app-screen-1.png',
              '/app-screen-2.png',
              '/app-screen-3.png',
              '/app-screen-4.png',
            ].map((src) => (
              <img
                key={src}
                src={src}
                alt="Keplix Garage Partner app screen"
                className="w-full max-w-[220px] rounded-2xl shadow-card"
              />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl border border-line bg-white px-5 py-3 shadow-card"
            >
              <img src="/icons/google-play.svg" alt="" className="h-8 w-8" />
              <span className="block text-left">
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
              className="flex items-center gap-3 rounded-xl border border-line bg-white px-5 py-3 shadow-card"
            >
              <img src="/icons/app-store.svg" alt="" className="h-8 w-8" />
              <span className="block text-left">
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

      {/* Who Can Join */}
      <section className="bg-partner-band px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-page text-center">
          <h2 className="text-2xl font-bold text-ink sm:text-[28px]">
            Who Can Join?
          </h2>
          <p className="mt-3 text-base text-ink-muted">
            We welcome a wide range of automotive service businesses.
          </p>
        </div>
      </section>
      <section className="bg-white px-4 py-12 sm:px-8">
        <div className="mx-auto grid max-w-page grid-cols-2 gap-px overflow-hidden rounded-card border border-line-soft bg-line-soft sm:grid-cols-3 lg:grid-cols-6">
          {whoCanJoin.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 bg-white px-4 py-8 text-center"
            >
              <Icon className="text-ink" size={26} />
              <span className="text-xs font-bold uppercase tracking-tight text-ink">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-page px-4 py-16 sm:px-8">
        <div className="flex flex-col items-center gap-6 rounded-card bg-partner-deep p-8 sm:flex-row sm:justify-between sm:p-10">
          <div className="flex items-center gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-partner">
              <Download className="text-white" size={26} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Ready to Grow Your Garage Business?
              </h3>
              <p className="mt-2 text-base text-white/60">
                Download the KEPLIX Garage Partner App and start getting more
                customers today.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/beta')}
            className="shrink-0 rounded-btn bg-partner px-8 py-4 text-base font-bold text-white shadow-btn transition-opacity hover:opacity-90"
          >
            Download Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Business;
