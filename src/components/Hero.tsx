import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Warehouse, PlayCircle } from 'lucide-react';
import HeroVideoPanel from './HeroVideoPanel';

const avatars = [
  '/avatars/avatar-1.jpg',
  '/avatars/avatar-2.jpg',
  '/avatars/avatar-3.jpg',
  '/avatars/avatar-4.jpg',
];

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero row: text */}
      <section className="relative z-10">
        <div className="grid items-start lg:grid-cols-2">
          {/* Text content. Figma puts the heading 87px below the header and the
              video 33px below it, so the video sits slightly higher. */}
          <div className="flex flex-col items-start gap-8 px-4 pb-16 pt-10 sm:px-8 sm:pt-[87px] lg:pl-[max(2rem,calc((100vw-1728px)/2+2rem))] lg:pr-12">
            <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-[56px] lg:leading-[72px]">
              Find Trusted
              <br />
              <span className="text-brand-red">Car Services</span>
              <br />
              in Minutes
            </h1>
            <p className="max-w-md text-lg font-medium leading-relaxed text-ink-muted sm:text-xl">
              Compare prices from verified workshops, book appointments
              instantly and track your vehicle service journey
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/beta')}
                className="flex h-[53px] w-[141px] items-center justify-center rounded-btn bg-brand-red text-base font-bold text-white shadow-btn transition-colors hover:bg-brand-redHover"
              >
                Join Beta
              </button>
              <button className="flex h-[53px] items-center justify-center gap-3 rounded-btn border border-line bg-white px-9 text-base font-bold text-ink transition-colors hover:border-ink">
                <PlayCircle size={24} />
                Watch Demo
              </button>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center">
                {avatars.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="-ml-2 h-10 w-10 rounded-full border-2 border-white object-cover first:ml-0"
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-ink-muted">
                Trusted by 10,000+ car owners
              </span>
            </div>
          </div>

          <HeroVideoPanel />
        </div>
      </section>

      {/* Who Are You? role selection band */}
      <section className="relative z-10 bg-white px-4 pb-16 pt-16 sm:px-8">
        <div className="relative mx-auto max-w-page">
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-6 py-3 shadow-card">
            <span className="whitespace-nowrap text-lg font-bold text-ink">
              Who Are You?
            </span>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Card sizes/colours measured from Figma 400:620 and 400:733. The
                phone mockups are sized by height, not width: the two PNGs have
                different aspect ratios, so a shared width renders them at
                different heights and the cards look uneven. */}
            <div className="flex items-center justify-between gap-6 overflow-hidden rounded-[24px] bg-[#fff1f2] p-8 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <Car className="shrink-0 text-brand-red" size={32} />
                  <h3 className="text-2xl font-bold leading-[30px] text-[#111827]">
                    I&apos;m a Car Owner
                  </h3>
                </div>
                <p className="mt-4 max-w-[320px] text-base font-medium leading-6 text-[#4b5563]">
                  Find trusted garages, compare prices, and book your next
                  service.
                </p>
                <div className="mt-6 h-1 w-8 rounded-full bg-[#fecaca]" />
                <button
                  onClick={() => navigate('/beta')}
                  className="mt-7 self-start rounded-[8px] bg-[#e11d48] px-8 py-3 text-base font-medium leading-6 text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition-opacity hover:opacity-90"
                >
                  Download Customer App
                </button>
              </div>
              <img
                src="/hero-phone-customer.png"
                alt="Keplix customer app"
                className="hidden h-[280px] w-auto shrink-0 object-contain sm:block lg:h-[320px]"
              />
            </div>

            <div className="flex items-center justify-between gap-6 overflow-hidden rounded-[24px] bg-[#eff6ff] p-8 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <Warehouse className="shrink-0 text-[#1f41af]" size={32} />
                  <h3 className="text-2xl font-bold leading-[30px] text-[#111827]">
                    I Own a Garage
                  </h3>
                </div>
                <p className="mt-4 max-w-[320px] text-base font-medium leading-6 text-[#4b5563]">
                  Grow your business, receive verified bookings, and manage
                  everything digitally.
                </p>
                <div className="mt-6 h-1 w-8 rounded-full bg-[#bfdbfe]" />
                <button
                  onClick={() => navigate('/business')}
                  className="mt-7 self-start rounded-[8px] bg-[#1f41af] px-8 py-3 text-base font-medium leading-6 text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition-opacity hover:opacity-90"
                >
                  Become a Garage Partner
                </button>
              </div>
              <img
                src="/hero-phone-garage.png"
                alt="Keplix garage partner app"
                className="hidden h-[280px] w-auto shrink-0 object-contain sm:block lg:h-[320px]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
