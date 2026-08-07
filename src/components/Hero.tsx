import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Warehouse, PlayCircle } from 'lucide-react';

const avatarColors = ['#fca5a5', '#93c5fd', '#fcd34d', '#a7f3d0'];

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-12">
      <div className="mx-auto max-w-page px-4 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text content */}
          <div className="flex flex-col items-start gap-8">
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
                {avatarColors.map((color, i) => (
                  <div
                    key={i}
                    className="-ml-2 h-10 w-10 rounded-full border-2 border-white first:ml-0"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-ink-muted">
                Trusted by 10,000+ car owners
              </span>
            </div>
          </div>

          {/* Role selection cards */}
          <div className="relative pt-10 lg:pt-0">
            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-6 py-3 shadow-card">
              <span className="whitespace-nowrap text-lg font-bold text-ink">
                Who Are You?
              </span>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="flex flex-1 items-center justify-between gap-4 rounded-2xl bg-blush-300 p-6">
                <div>
                  <div className="flex items-center gap-3">
                    <Car className="text-brand-red" size={28} />
                    <h3 className="text-xl font-bold text-ink-heading">
                      I&apos;m a Car Owner
                    </h3>
                  </div>
                  <p className="mt-3 max-w-[200px] text-sm font-medium leading-6 text-gray-600">
                    Find trusted garages, compare prices, and book your next
                    service.
                  </p>
                  <div className="mt-6 h-1 w-8 rounded-full bg-blush-300" />
                  <button
                    onClick={() => navigate('/beta')}
                    className="mt-4 rounded-btn bg-[#e11d48] px-6 py-3 text-sm font-medium text-white shadow-card transition-colors hover:bg-brand-redHover"
                  >
                    Download Customer App
                  </button>
                </div>
                <img
                  src="/hero-phone-customer.png"
                  alt="Keplix customer app"
                  className="h-auto w-[110px] shrink-0 drop-shadow-xl"
                />
              </div>

              <div className="flex flex-1 items-center justify-between gap-4 rounded-2xl bg-partner-soft p-6">
                <div>
                  <div className="flex items-center gap-3">
                    <Warehouse className="text-partner" size={28} />
                    <h3 className="text-xl font-bold text-ink-heading">
                      I Own a Garage
                    </h3>
                  </div>
                  <p className="mt-3 max-w-[200px] text-sm font-medium leading-6 text-gray-600">
                    Grow your business, receive verified bookings, and manage
                    everything digitally.
                  </p>
                  <div className="mt-6 h-1 w-8 rounded-full bg-partner-soft" />
                  <button
                    onClick={() => navigate('/business')}
                    className="mt-4 rounded-btn bg-brand-blue px-6 py-3 text-sm font-medium text-white shadow-card transition-colors hover:opacity-90"
                  >
                    Become a Garage Partner
                  </button>
                </div>
                <img
                  src="/hero-phone-garage.png"
                  alt="Keplix garage partner app"
                  className="h-auto w-[110px] shrink-0 drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
