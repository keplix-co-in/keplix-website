import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import PageBlob, { PageBlobRight } from '../components/PageBlob';
import StoreBadges from '../components/StoreBadges';
import { APP_LINKS } from '../constants/links';
import { sectionSubtitleClass, cardTitleClass } from '../constants/typography';
import Seo from '../components/Seo';
import { breadcrumbSchema, mobileAppSchemas } from '../constants/schema';

const stats = [
  { icon: '/icons/biz-stat-free.svg', line1: '100% Free', line2: 'to Join' },
  { icon: '/icons/biz-stat-verified.svg', line1: 'Verified', line2: 'Customers' },
  { icon: '/icons/biz-stat-commission.svg', line1: 'No Commission', line2: 'on Bookings' },
  { icon: '/icons/biz-stat-support.svg', line1: 'Dedicated', line2: 'Partner Support' },
];

const partnerBenefits = [
  { icon: '/icons/biz-partner-more-customers.svg', line1: 'GET MORE', line2: 'CUSTOMERS' },
  { icon: '/icons/biz-partner-increase-revenue.svg', line1: 'INCREASE', line2: 'REVENUE' },
  { icon: '/icons/biz-partner-digital-mgmt.svg', line1: 'DIGITAL WORKSHOP', line2: 'MANAGEMENT' },
  { icon: '/icons/biz-partner-build-trust.svg', line1: 'BUILD CUSTOMER', line2: 'TRUST' },
];

const partnerBenefitsWide = [
  { icon: '/icons/biz-partner-flexible-scheduling.svg', line1: 'FLEXIBLE', line2: 'SCHEDULING' },
  { icon: '/icons/biz-partner-track-performance.svg', line1: 'TRACK BUSINESS', line2: 'PERFORMANCE' },
];

const howItWorks = [
  { icon: '/icons/biz-hiw-1.svg', title: 'Register', description: 'Create your workshop profile with business details.' },
  { icon: '/icons/biz-hiw-2.svg', title: 'List Services', description: 'Add services, pricing, facilities and operating hours.' },
  { icon: '/icons/biz-hiw-3.svg', title: 'Receive Bookings', description: 'Nearby customers discover your workshop and book appointments.' },
  { icon: '/icons/biz-hiw-4.svg', title: 'Complete Services', description: 'Deliver quality service and update status directly from the app.' },
  { icon: '/icons/biz-hiw-5.svg', title: 'Grow Reputation', description: 'Receive ratings and reviews that help attract even more business.' },
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

const appScreens = [
  '/app-screen-1.png',
  '/app-screen-2.png',
  '/app-screen-3.png',
  '/app-screen-4.png',
];

const whoCanJoin = [
  { icon: '/icons/wcj-multibrand-o.svg', line1: 'MULTI-BRAND', line2: 'CAR SERVICE CENTRES' },
  { icon: '/icons/wcj-independent-o.svg', line1: 'INDEPENDENT', line2: 'GARAGES' },
  { icon: '/icons/wcj-denting-o.svg', line1: 'DENTING & PAINTING', line2: 'WORKSHOPS' },
  { icon: '/icons/wcj-detailing-o.svg', line1: 'CAR DETAILING', line2: 'STUDIOS' },
  { icon: '/icons/wcj-carwash-o.svg', line1: 'CAR WASH', line2: 'CENTRES' },
  { icon: '/icons/wcj-wheel-alignment-o.svg', line1: 'WHEEL ALIGNMENT &', line2: 'BALANCING CENTRES' },
  { icon: '/icons/wcj-tyre-o.svg', line1: 'TYRE SHOPS', line2: '' },
  { icon: '/icons/wcj-battery-o.svg', line1: 'BATTERY', line2: 'DEALERS' },
  { icon: '/icons/wcj-ac-o.svg', line1: 'CAR AC', line2: 'SPECIALISTS' },
  { icon: '/icons/wcj-carwash-o.svg', line1: 'CAR ELECTRICAL', line2: 'WORKSHOPS' },
  { icon: '/icons/wcj-accessory-o.svg', line1: 'CAR ACCESSORY', line2: 'STORES' },
  { icon: '/icons/wcj-breakdown-o.svg', line1: 'BREAKDOWN ASSISTANCE', line2: 'PROVIDERS' },
];

// min-h rather than a hard h-[164px]: at 375px the two-column grid leaves only
// ~100px of text width, so these uppercase labels wrap to 3-4 lines and used to
// bleed straight through the bottom of a fixed-height card.
const benefitCardClass =
  'flex min-h-[164px] flex-col items-center justify-center gap-4 rounded-lg border border-[#f3f4f6] bg-[#f9fafb]/50 p-4 text-center';
const benefitLabelClass =
  'text-sm font-semibold uppercase leading-tight text-black';

const storeBadges = (
  <StoreBadges androidHref={APP_LINKS.vendorAndroid} className="justify-center" />
);

const Business: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="relative overflow-hidden">
      <PageBlob color="bg-[#4176F3]/20" />
      <PageBlobRight />

      <Seo
        title="Partner With Us — Grow Your Garage Business"
        description="Join Keplix free with no commission on bookings. Get discovered by nearby car owners, receive verified service bookings and manage your workshop digitally."
        jsonLd={[breadcrumbSchema([{ name: 'Workshops', path: '/business' }]), ...mobileAppSchemas()]}
      />

      {/* Hero */}
      <section className="relative z-2">
        {/* lg:px-16 (64px) sits just outside Figma's effective left inset of
            55px (27px page margin + 28px content frame on the 1280 artboard).
            The shared max-w-page container is 1728px by design, so without the
            extra padding the hero copy sits hard against the viewport edge. */}
        <div className="mx-auto max-w-page px-4 pb-16 pt-[13px] sm:px-8 lg:px-16">
          <h1 className="max-w-[518px] text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-[56px] lg:leading-[72px]">
            Grow Your Garage Business with{' '}
            <span className="text-partner">Keplix</span>
          </h1>
          <p className={`${sectionSubtitleClass} mt-9 max-w-[512px] text-ink-muted`}>
            {/* The hard line breaks that used to be here were tuned for the
                desktop width and produced a ragged, orphan-heavy block on a
                phone. Let the text wrap to its container instead. */}
            Join the growing automotive service marketplace. Get discovered by
            nearby car owners, receive verified service bookings, and manage
            your workshop digitally — all from one powerful platform.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={APP_LINKS.vendorAndroid}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[53px] w-full items-center justify-center gap-3 rounded-[8px] bg-partner text-base font-bold leading-7 text-white shadow-[0px_10px_15px_-3px_#caccfe,0px_4px_6px_-4px_#cecafe] transition-opacity hover:opacity-90 sm:w-[313px]"
            >
              <img src="/icons/biz-btn-download.svg" alt="" className="h-5 w-5" loading="lazy" decoding="async" />
              Download Garage Partner App
            </a>
            <button
              onClick={() => navigate('/contact')}
              className="flex h-[53px] w-full items-center justify-center rounded-[8px] border border-[#e5e7eb] bg-white text-base font-bold leading-7 text-ink transition-colors hover:border-ink sm:w-[190px]"
            >
              Become a partner
            </button>
          </div>

          {/* max-w-[829px] is the Figma width of this row (node 431:4795), where
              the four items are 185.25px each with 24px gaps. The gaps below
              already match Figma exactly — without the cap the grid stretches
              across the full 1728px page container and the items drift apart. */}
          <div className="mt-8 grid max-w-[829px] grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ icon, line1, line2 }) => (
              <div key={line1} className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f2f3fe]">
                  <img src={icon} alt="" className="h-7 w-7" loading="lazy" decoding="async" />
                </div>
                <span className="text-xs font-semibold text-[#1e293b]">
                  {line1}
                  <br />
                  {line2}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="relative z-10 mx-auto max-w-page px-4 pb-16 sm:px-8">
        <div className="rounded-card bg-partner-soft p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.09)] sm:p-10">
          <div className="flex flex-col items-start gap-11 lg:flex-row lg:justify-center">
            <div className="flex w-full flex-col gap-10 lg:w-[375px] lg:shrink-0">
              <h2 className="text-3xl font-extrabold text-black sm:text-[36px]">
                Why Partner With{' '}
                <span className="uppercase text-partner">Keplix?</span>
              </h2>
              <div className="flex flex-col gap-4 text-base font-medium text-ink-muted">
                <p>
                  KEPLIX helps workshops grow by making them discoverable online
                  and simplifying day-to-day business operations.
                </p>
                <p>
                  Whether you&apos;re an independent garage, detailing studio,
                  or multi-brand service centre, KEPLIX helps you attract more
                  customers, improve efficiency, and build lasting trust.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-7 lg:w-[700px] lg:shrink-0">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-7">
                {partnerBenefits.map(({ icon, line1, line2 }) => (
                  <div key={line1} className={benefitCardClass}>
                    <img src={icon} alt="" className="h-12 w-12" loading="lazy" decoding="async" />
                    <span className={benefitLabelClass}>
                      {line1}
                      <br />
                      {line2}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                {partnerBenefitsWide.map(({ icon, line1, line2 }) => (
                  <div key={line1} className={benefitCardClass}>
                    <img src={icon} alt="" className="h-12 w-12" loading="lazy" decoding="async" />
                    <span className={benefitLabelClass}>
                      {line1}
                      <br />
                      {line2}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 mx-auto max-w-page px-4 pb-16 sm:px-8 lg:px-16">
        <div className="rounded-2xl bg-partner-deep px-6 py-16 sm:px-10">
          <h2 className="text-center text-2xl font-bold text-[#f3f3f4] sm:text-[36px]">
            How it Works ?
          </h2>
          {/* Capped and centred: with justify-between across the full page
              width the first and last steps hugged the card edges and the
              gaps between them yawned open on large screens. */}
          <div className="mx-auto mt-16 flex max-w-[1100px] flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-between">
            {howItWorks.map(({ icon, title, description }, i) => (
              <React.Fragment key={title}>
                <div className="flex max-w-[180px] flex-col items-center text-center">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e9e9ec]">
                    <img src={icon} alt="" className="h-8 w-8" loading="lazy" decoding="async" />
                    <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border-4 border-partner-deep bg-partner text-sm font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className={`${cardTitleClass} mt-3 text-white`}>
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-[#c7cbd0]">{description}</p>
                </div>
                {i < howItWorks.length - 1 && (
                  <ChevronRight
                    className="hidden shrink-0 text-white/40 sm:mt-10 sm:block"
                    size={24}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* App Features */}
      <section className="relative z-10 mx-auto max-w-page px-4 pb-16 sm:px-8">
        <div className="grid gap-16 bg-white px-6 py-24 sm:px-10 lg:grid-cols-[598fr_270fr] lg:items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold leading-10 text-[#0f172a] sm:text-[28px]">
              Garage Partner App Features
            </h2>
            <p className={`${sectionSubtitleClass} leading-6 text-[#6b7280]`}>
              All the tools you need to manage and grow your business.
            </p>
            <div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2">
              {appFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <img
                    src="/icons/appfeat-check.svg"
                    alt=""
                    className="h-5 w-5 shrink-0"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* leading-5 (20px) equalled the font size, so wrapped
                      feature names had their lines touching on mobile. */}
                  <span className="text-base font-semibold leading-6 text-[#1e293b] sm:text-[20px] sm:leading-7">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/app-features-phone.png"
              alt="Keplix Garage Partner app dashboard"
              className="w-full max-w-[270px] rounded-2xl shadow-cardHover"
              loading="lazy"
              decoding="async" width={1038} height={1890} />
          </div>
        </div>
      </section>

      {/* App screens + store badges */}
      <section className="relative z-10 px-4 pb-16 sm:px-8">
        <div className="mx-auto max-w-page">
          {/* gap-14 (56px) between two columns on a 375px screen left the
              screenshots at ~40% of the row. */}
          <div className="grid grid-cols-2 gap-6 sm:gap-14 lg:grid-cols-4">
            {appScreens.map((src) => (
              <img
                key={src}
                src={src}
                alt="Keplix Garage Partner app screen"
                className="w-full"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <div className="mt-[76px]">{storeBadges}</div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="relative z-10 mx-auto max-w-page px-4 pb-16 sm:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-extrabold leading-10 text-[#0f172a] sm:text-[28px]">
            Who Can Join?
          </h2>
          <p className={`${sectionSubtitleClass} pb-12 leading-6 text-[#515153]`}>
            We welcome a wide range of automotive service businesses.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px border border-[#e5e7eb] bg-[#e5e7eb] p-px sm:grid-cols-3 lg:grid-cols-6">
          {whoCanJoin.map(({ icon, line1, line2 }, i) => (
            /* p-4 on mobile: with p-8 the two-column cell left ~105px for
               long unbreakable labels like "BREAKDOWN ASSISTANCE", which
               spilled over the grid lines. break-words is the backstop. */
            <div
              key={`${line1}-${i}`}
              className="flex min-h-[153px] flex-col items-center bg-white p-4 text-center sm:p-8"
            >
              <div className="flex h-16 w-12 items-center justify-center pb-4">
                <img src={icon} alt="" className="h-10 w-10" loading="lazy" decoding="async" />
              </div>
              <span className="break-words text-sm font-bold uppercase text-[#1e293b]">
                {line1}
                {line2 && (
                  <>
                    <br />
                    {line2}
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-page px-4 py-16 sm:px-8">
        <div className="rounded-[24px] bg-[#15023d] p-8 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] lg:px-16 lg:py-10">
          {/* Capped to Figma's inner width (774 text + 329 art) so the two
              blocks stay adjacent instead of spreading apart on wide screens. */}
          <div className="mx-auto flex w-full max-w-[1103px] flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="flex flex-col items-center gap-8 sm:flex-row lg:w-[774px]">
              <div className="shrink-0 rounded-2xl bg-partner p-5">
                <img
                  src="/icons/biz-cta-download.svg"
                  alt=""
                  className="h-10 w-10"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col gap-3 text-center sm:text-left lg:w-[585px]">
                <h2 className="text-2xl font-extrabold leading-9 text-[#817bcf] sm:text-[28px]">
                  Ready to Grow Your Garage Business?
                </h2>
                <p className={`${sectionSubtitleClass} text-white`}>
                  Download the KEPLIX Garage Partner App and start getting more
                  customers today.
                </p>
              </div>
            </div>
            <img
              src="/biz-cta-illustration.png"
              alt=""
              aria-hidden
              className="h-[160px] w-[160px] shrink-0 object-contain lg:h-[188px] lg:w-[188px]"
              loading="lazy"
              decoding="async" width={1600} height={1600} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Business;
