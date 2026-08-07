import React from 'react';
import { ArrowDown } from 'lucide-react';

const problems = [
  { icon: '/icons/svc-pricing.svg', label: ['No pricing', 'transparency'] },
  { icon: '/icons/svc-workshops.svg', label: ['Hard to find', 'trusted workshops'] },
  { icon: '/icons/svc-history.svg', label: ['No service', 'history'] },
  { icon: '/icons/svc-calls.svg', label: ['Multiple calls', 'and follow-ups'] },
];

const solutions = [
  { icon: '/icons/svc-check.svg', label: ['Compare', 'prices instantly'] },
  { icon: '/icons/svc-verified.svg', label: ['Verified', 'workshops'] },
  { icon: '/icons/svc-records.svg', label: ['Track all service', 'records'] },
  { icon: '/icons/svc-booking.svg', label: ['One-click', 'booking'] },
];

const featureGroups = [
  {
    icon: '/icons/svc-book-compare.svg',
    title: 'BOOK & COMPARE',
    description: 'Find the right service at the right price.',
    subCards: [
      { icon: '/icons/svc-compare-pricing.svg', label: 'Compare Pricing' },
      { icon: '/icons/svc-book-service.svg', label: 'Book Service' },
    ],
  },
  {
    icon: '/icons/svc-manage-vehicle.svg',
    title: 'MANAGE VEHICLE',
    description: 'Keep track of your car and service history.',
    subCards: [
      { icon: '/icons/svc-service-history.svg', label: 'Service History' },
      { icon: '/icons/svc-maintenance-records.svg', label: 'Maintenance Records' },
    ],
  },
  {
    icon: '/icons/svc-trust-support.svg',
    title: 'TRUST & SUPPORT',
    description: "We've got your back, always.",
    subCards: [
      { icon: '/icons/svc-verified-workshops.svg', label: 'Verified Workshops' },
      { icon: '/icons/svc-customer-support.svg', label: 'Customer Support' },
    ],
  },
];

const Services: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto max-w-page px-4 py-16 sm:px-8">
      {/* Problem -> Solution card */}
      <div className="flex flex-col gap-8 rounded-card border border-line-soft bg-white p-6 shadow-card sm:p-10">
        <h2 className="text-center text-2xl font-bold text-ink-heading sm:text-[28px]">
          Car Servicing Shouldn&apos;t Be This Hard
        </h2>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {problems.map(({ icon, label }) => (
            <div key={label[0]} className="flex flex-col items-center">
              <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <img src={icon} alt="" className="h-8 w-8" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] text-white">
                  !
                </span>
              </div>
              <p className="text-center text-base font-semibold text-ink-body">
                {label[0]}
                <br />
                {label[1]}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <ArrowDown className="text-ink-faint" size={32} />
        </div>

        <div className="rounded-3xl border border-line-soft bg-gray-50/50 p-6 sm:p-8">
          <h3 className="text-center text-2xl font-bold text-ink-heading sm:text-[28px]">
            Keplix Makes It <span className="text-emerald-500">Simple</span>
          </h3>
          <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {solutions.map(({ icon, label }) => (
              <div key={label[0]} className="flex flex-col items-center">
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <img src={icon} alt="" className="h-8 w-8" />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500 p-1">
                    <img src="/icons/svc-checkmark-badge.svg" alt="" className="h-full w-full" />
                  </span>
                </div>
                <p className="text-center text-base font-semibold text-ink-body">
                  {label[0]}
                  <br />
                  {label[1]}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <div className="rounded-full border border-line-soft bg-white px-6 py-3 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <span className="text-base font-medium text-ink-body">
                All your car care needs, in one{' '}
                <span className="font-bold text-emerald-500">
                  smart platform.
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature groups card */}
      <div className="mt-8 flex flex-col items-center gap-12 rounded-card border border-line-soft bg-white p-6 shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.05)] sm:p-10">
        <h2 className="text-center text-2xl font-bold text-ink-heading sm:text-[28px]">
          Everything You Need, All in One Place
        </h2>
        <div className="flex w-full flex-col gap-6">
          {featureGroups.map(({ icon, title, description, subCards }) => (
            <div
              key={title}
              className="flex flex-col gap-6 rounded-2xl border border-gray-50 bg-[#fdfdfd] p-6 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-50">
                  <img src={icon} alt="" className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-gray-800">
                    {title}
                  </h3>
                  <p className="mt-3 text-base text-ink-muted">{description}</p>
                </div>
              </div>
              <div className="flex gap-4">
                {subCards.map((card) => (
                  <div
                    key={card.label}
                    className="flex h-[100px] w-[180px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-line-soft px-4 py-4 text-center"
                  >
                    <img src={card.icon} alt="" className="h-6 w-6" />
                    <span className="text-base font-semibold text-ink-body">
                      {card.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
