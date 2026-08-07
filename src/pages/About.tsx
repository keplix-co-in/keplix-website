import React from 'react';
import PageBlob from '../components/PageBlob';

const pillars = [
  {
    icon: '/icons/about-mission.svg',
    title: 'Our Mission',
    description: 'To simplify car care and build trust between car owners and garages.',
  },
  {
    icon: '/icons/about-vision.svg',
    title: 'Our Vision',
    description: "To become India's most trusted car care platform.",
  },
  {
    icon: '/icons/about-values.svg',
    title: 'Our Values',
    description: 'Transparency, Trust, Customer First, Innovation.',
  },
  {
    icon: '/icons/about-promise.svg',
    title: 'Our Promise',
    description: 'Better car care experiences for everyone.',
  },
];

const journey = [
  { year: '2024', title: 'The Idea', description: 'KEPLIX was founded with a simple idea to make car care better.' },
  { year: '2024', title: 'Early Growth', description: 'Onboarded 100+ verified garages in Delhi-NCR.' },
  { year: '2025', title: 'Expanding', description: 'Launched our customer app and grew our community.' },
  { year: '2026', title: 'The Future', description: 'Continuing to innovate and expand across India.' },
];

const storyParagraphs = [
  "I'm Vardan, Founder of KEPLIX.",
  'Everyone seems to be building a startup these days — but how many are actually born out of a real problem?',
  'For me, KEPLIX is deeply personal. A few years ago, I was driving on the Delhi-Dehradun highway when my car broke down — right in the middle of nowhere, late at night. I called nearby garages and googled mechanics for what felt like hours, and to my surprise, everyone quoted insanely high prices for a repair that should have cost barely ₹1,000.',
  'That night stuck with me. I realised how unorganised and unfair the automotive service space really was — especially for people stranded or unaware of genuine pricing.',
  "That's where the seed for KEPLIX was planted.",
  "Since then, I've worked with brands like Hero, Studio 34 and Ace, explored automotive design colleges across India — from DYPDC Pune to UPES Dehradun, where I finally pursued my degree — and kept digging deeper into what actually drives this industry forward.",
  "I've always loved cars, but KEPLIX is more than a passion project. It's the solution I wished existed that night on the highway — and one that millions of people still need today.",
  "We're building an open marketplace that connects vehicle owners directly to trusted, nearby automotive service providers — where you can compare prices, read real reviews, and book a slot that fits your time and budget. Fair, transparent, and close to home.",
  'Our product is launching soon, and it finally feels like everything is coming together.',
  "This isn't about chasing trends. It's about solving a real problem with something I truly believe in.",
];

const sectionHeadingClass =
  'text-2xl font-semibold leading-8 text-[#111827] sm:text-[28px]';

const About: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <PageBlob />

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto max-w-page px-4 pt-[59px] sm:px-8 lg:px-16">
          <div className="grid items-center gap-8 lg:grid-cols-[656fr_520fr]">
            <div className="flex flex-col gap-7 pb-[42px]">
              <h1 className="text-4xl font-bold leading-tight text-ink sm:text-[56px] sm:leading-[72px]">
                About Keplix
              </h1>
              <p className="max-w-[512px] text-lg font-medium text-ink-muted sm:text-[20px]">
                We&apos;re on a mission to make car care simple, transparent and
                trustworthy for every car owner.
              </p>
              <p className="max-w-[456px] text-lg font-medium text-ink-muted sm:text-[20px]">
                KEPLIX connects car owners with verified garages, bringing
                transparency, convenience and reliability to car care.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/about-hero-illustration.png"
                alt="Illustration of a person working at a laptop"
                className="w-full max-w-[520px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative z-10 mx-auto max-w-page px-4 py-8 sm:px-8">
        <div className="flex flex-wrap justify-center gap-8">
          {pillars.map(({ icon, title, description }) => (
            <div
              key={title}
              className="flex w-full max-w-[264px] flex-col items-center rounded-[12px] bg-[#fbf0f0] px-8 pb-[34px] pt-8 text-center drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:h-[234px]"
            >
              <img src={icon} alt="" className="h-10 w-10" />
              <h3 className="mt-4 text-[20px] font-bold text-[#111827]">
                {title}
              </h3>
              <p className="mt-3 text-[16px] font-medium text-[#4b5563]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="relative z-10 mx-auto max-w-[1125px] px-4 py-16 sm:px-8">
        <h2 className={sectionHeadingClass}>Our Journey</h2>
        <div className="relative mt-7">
          <div
            aria-hidden
            className="absolute left-1 right-2.5 top-[35.5px] hidden h-[3px] bg-[#f4b5b5] sm:block"
          />
          <div className="grid grid-cols-1 gap-x-24 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map(({ year, title, description }) => (
              <div
                key={year}
                className="relative flex flex-col items-start gap-[7.4px] pt-8"
              >
                <span className="h-[10px] w-[10px] shrink-0 rounded-full bg-[#e31e24]" />
                <span className="pt-[8.6px] text-[20px] font-semibold leading-7 text-[#e31e24]">
                  {year}
                </span>
                <h3 className="text-[16px] font-semibold leading-6 text-[#111827]">
                  {title}
                </h3>
                <p className="text-[16px] text-[#6b7280]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative z-10 bg-[#F3414B] px-4 py-16 sm:px-8">
        <div className="mx-auto flex max-w-[1233px] flex-col gap-12">
          <h2 className="text-2xl font-semibold leading-8 text-white sm:text-[28px]">
            Our Story
          </h2>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:justify-center">
            <video
              src="/our-story-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full shrink-0 rounded-2xl object-cover lg:h-[353px] lg:w-[620px]"
            >
              Your browser does not support the video tag.
            </video>
            <div className="flex w-full flex-col gap-4 text-[16px] font-medium text-white/90 lg:max-w-[562px]">
              <p className="font-semibold text-white">
                From a broken-down car to building KEPLIX
              </p>
              <p>Hey everyone,</p>
              {storyParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative z-10 bg-white px-4 py-20 sm:px-8">
        <div className="mx-auto flex max-w-page flex-col gap-12">
          <h2 className={sectionHeadingClass}>Our Leadership</h2>
          <div className="flex flex-col items-start justify-center gap-12 lg:flex-row">
            <div className="flex w-full shrink-0 flex-col items-center gap-3 lg:w-[512px]">
              <div className="rounded-full border-2 border-[#f3f4f6] p-1.5">
                <img
                  src="/ceo-vardan.jpg"
                  alt="Vardan Chaturvedi, CEO &amp; Founder"
                  className="h-32 w-32 rounded-full object-cover"
                />
              </div>
              <p className="pt-[23px] text-[24px] font-medium leading-7 text-[#111827]">
                Vardan Chaturvedi
              </p>
              <p className="text-[16px] font-medium leading-5 text-[#6b7280]">
                CEO &amp; Founder
              </p>
            </div>
            <div className="w-full max-w-[528px] text-center text-[16px] font-medium leading-6 text-[#6b7280]">
              <p>
                I am the Founder and Executive Director at Keplix Pvt Ltd, with
                a strong background in automotive design and business. My
                Bachelor&apos;s degree in Automotive Design has equipped me with
                the skills to create innovative and user-centric vehicle
                concepts.
              </p>
              <p className="mt-6">
                My professional journey blends creative design expertise with
                strategic business leadership. At Keplix, I lead a team
                dedicated to delivering cutting-edge automotive solutions that
                push the boundaries of technology and user experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
