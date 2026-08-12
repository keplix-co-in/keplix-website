import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Warehouse, PlayCircle } from 'lucide-react';
import HeroVideoPanel from './HeroVideoPanel';
import { APP_LINKS } from '../constants/links';
import { sectionSubtitleClass } from '../constants/typography';

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
      <section className="relative z-10 bg-white pt-1 sm:pt-1 lg:pt-[0px]">
        <div className="grid items-start lg:grid-cols-2">
          {/* Text content. Figma's 87px/33px top offsets were measured from the
              top of the page, but the header is `sticky` and therefore still
              takes its full 96px in normal flow — so those values stacked on
              top of it and left a visible gap under the header. Both are cut by
              33px, which keeps the 54px offset that makes the video sit higher
              than the heading while closing the gap.

              The left padding is a max() rather than a plain lg:px-16 because
              this column is edge-to-edge, not inside a max-w-page container:
              the calc keeps the text lined up with the rest of the site once
              the viewport passes 1728px, and the 4rem floor (64px) is the
              same inset used on the Workshops and How-it-Works sections. */}
          <div className="flex flex-col items-start gap-8 px-4 pb-16 pt-4 sm:px-8 sm:pt-[54px] lg:pl-[max(4rem,calc((100vw-1728px)/2+4rem))] lg:pr-12">
            <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-[56px] lg:leading-[72px]">
              Find Trusted
              <br />
              <span className="text-brand-red">Car Services</span>
              <br />
              in Minutes
            </h1>
            <p className={`${sectionSubtitleClass} max-w-md leading-relaxed text-ink-muted`}>
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

      {/* Who Are You? role selection band. Same lg:px-16 inset as the hero
          above it, so the two cards line up with the headline rather than
          starting 32px further out. */}
      <section className="relative z-10 bg-white px-4 pb-16 pt-16 sm:px-8 lg:px-16">
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
            <div className="flex items-stretch justify-between gap-6 overflow-hidden rounded-[24px] bg-[#fff1f2] p-8 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-3">
                  <Car className="shrink-0 text-brand-red" size={32} />
                  <h2 className="text-2xl font-bold leading-[30px] text-[#111827]">
                    I&apos;m a Car Owner
                  </h2>
                </div>
                {/* The two blurbs wrap to different line counts, and how many
                    depends on the card width, so reserving a fixed number of
                    lines only aligns the buttons at some breakpoints. Pinning
                    the divider+button block to the bottom of a stretched column
                    keeps both cards' buttons on one baseline at every width. */}
                <p className="mt-4 max-w-[320px] text-base font-medium leading-6 text-[#4b5563]">
                  Find trusted garages, compare prices, and book your next
                  service.
                </p>
                <div className="mt-auto pt-6">
                  <div className="h-1 w-8 rounded-full bg-[#fecaca]" />
                  <a
                    href={APP_LINKS.customerAndroid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-block rounded-[8px] bg-[#e11d48] px-8 py-3 text-base font-medium leading-6 text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition-opacity hover:opacity-90"
                  >
                    Download Customer App
                  </a>
                </div>
              </div>
              <img
                src="/hero-phone-customer.png"
                alt="Keplix customer app"
                className="hidden h-[280px] w-auto shrink-0 self-center object-contain sm:block lg:h-[320px]" width={549} height={1106} />
            </div>

            <div className="flex items-stretch justify-between gap-6 overflow-hidden rounded-[24px] bg-[#eff6ff] p-8 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-3">
                  <Warehouse className="shrink-0 text-[#1f41af]" size={32} />
                  <h2 className="text-2xl font-bold leading-[30px] text-[#111827]">
                    I Own a Garage
                  </h2>
                </div>
                <p className="mt-4 max-w-[320px] text-base font-medium leading-6 text-[#4b5563]">
                  Grow your business, receive verified bookings, and manage
                  everything digitally.
                </p>
                <div className="mt-auto pt-6">
                  <div className="h-1 w-8 rounded-full bg-[#bfdbfe]" />
                  <button
                    onClick={() => navigate('/business')}
                    className="mt-7 inline-block rounded-[8px] bg-[#1f41af] px-8 py-3 text-base font-medium leading-6 text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition-opacity hover:opacity-90"
                  >
                    Become a Garage Partner
                  </button>
                </div>
              </div>
              <img
                src="/hero-phone-garage.png"
                alt="Keplix garage partner app"
                className="hidden h-[280px] w-auto shrink-0 self-center object-contain sm:block lg:h-[320px]" width={547} height={1106} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
