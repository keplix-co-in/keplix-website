import React from 'react';

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
  "These days, everyone seems to be building a startup — but I often ask myself, how many are born out of a real problem?",
  "For me, KEPLIX isn't just another startup. It's deeply personal. A few years ago, I was driving on the Delhi-Dehradun highway when my car suddenly broke down — right in the middle of nowhere, late at night. I started calling nearby garages, googling nearby mechanics wasting a lot of time, and to my surprise, everyone was quoting insanely high prices for something that would normally cost barely ₹1,000.",
  "That night stuck with me. I realised how unorganised and unfair the automotive service space really was — especially for people stranded or unaware of genuine pricing.",
  "That's where the seed for KEPLIX was planted.",
  "Since then, I've worked with brands like Hero, Studio 34 and Ace, explored automotive design colleges across India — from DYPDC Pune to UPES Dehradun (where I finally pursued my degree) — and continued diving deeper into what drives this industry forward.",
  "I've always loved cars. But KEPLIX is more than just a passion project. It's a solution I wished existed that night on the highway — and one that millions of people still need today.",
  "We're building an open marketplace that connects vehicle owners directly to their nearby trusted automotive service providers where a user can compare prices and review and can book a time slot according to their affordability and time — fair, transparent, and nearby.",
  "Our product is launching soon, and it finally feels like everything is coming together.",
  "This isn't about chasing trends. It's about solving a real problem with something I truly believe in.",
];

const About: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-page px-4 pb-8 pt-8 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
              About Keplix
            </h1>
            <p className="mt-6 text-lg text-ink-muted">
              We&apos;re on a mission to make car care simple, transparent and
              trustworthy for every car owner.
            </p>
            <p className="mt-4 text-lg text-ink-muted">
              KEPLIX connects car owners with verified garages, bringing
              transparency, convenience and reliability to car care.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/about-hero-illustration.png"
              alt="Illustration of a person working at a laptop"
              className="w-full max-w-sm rounded-3xl sm:max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-page px-4 py-8 sm:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {pillars.map(({ icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-3 rounded-xl bg-blush-300/60 px-6 py-8 text-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <img src={icon} alt="" className="h-10 w-10" />
              <h3 className="text-xl font-bold text-ink-heading">{title}</h3>
              <p className="text-base text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="mx-auto max-w-page px-4 py-16 sm:px-8">
        <h2 className="text-2xl font-bold text-ink-heading sm:text-[28px]">
          Our Journey
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-8 border-t-2 border-line-soft pt-8 sm:grid-cols-4">
          {journey.map(({ year, title, description }) => (
            <div key={year} className="relative">
              <span className="absolute -top-[41px] left-0 h-3 w-3 -translate-y-1/2 rounded-full bg-brand-red" />
              <span className="text-sm font-bold text-brand-red">{year}</span>
              <h3 className="mt-2 text-lg font-bold text-ink-heading">
                {title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-page px-4 py-16 sm:px-8">
        <h2 className="text-2xl font-bold text-ink-heading sm:text-[28px]">
          Our Story
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <video
            src="/mapani.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-2xl object-cover shadow-card"
          >
            Your browser does not support the video tag.
          </video>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-body">
            <p className="font-semibold text-ink-heading">
              From a broken-down car to building KEPLIX
            </p>
            <p>Hey everyone,</p>
            {storyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="mx-auto max-w-page px-4 py-16 sm:px-8">
        <h2 className="text-2xl font-bold text-ink-heading sm:text-[28px]">
          Our Leadership
        </h2>
        <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center">
          <div className="flex w-full max-w-[512px] flex-col items-center text-center">
            <div className="h-32 w-32 rounded-full border-2 border-line-soft bg-[#b9b9b9] p-1.5" />
            <h3 className="mt-6 text-2xl font-medium text-ink-heading">
              Vardan Chaturvedi
            </h3>
            <p className="mt-1 text-base font-medium text-ink-muted">
              CEO &amp; Founder
            </p>
          </div>
          <p className="max-w-[528px] text-center text-base font-medium leading-6 text-ink-muted">
            I am the Founder and Executive Director at Keplix Pvt Ltd, with a
            strong background in automotive design and business. My
            Bachelor&apos;s degree in Automotive Design has equipped me with
            the skills to create innovative and user-centric vehicle
            concepts.
            <br />
            <br />
            My professional journey blends creative design expertise with
            strategic business leadership. At Keplix, I lead a team dedicated
            to delivering cutting-edge automotive solutions that push the
            boundaries of technology and user experience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
