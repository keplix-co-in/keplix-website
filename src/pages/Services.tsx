import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageBlob from '../components/PageBlob';
import Seo from '../components/Seo';
import { breadcrumbSchema, serviceListSchema } from '../constants/schema';
import { SERVICES, formatPrice } from '../constants/services';
import { sectionSubtitleClass } from '../constants/typography';

const Services: React.FC = () => (
  <main className="relative overflow-hidden">
    <PageBlob />

    <Seo
      title="Car Services — Compare Prices & Book Online"
      description="Every service Keplix covers, from periodic servicing and AC repair to denting, painting and roadside assistance. Compare prices from verified workshops near you."
      canonical="/services"
      jsonLd={[
        serviceListSchema(),
        breadcrumbSchema([{ name: 'Services', path: '/services' }]),
      ]}
    />

    <section className="relative z-10 mx-auto max-w-page px-4 pb-6 pt-12 sm:px-8 lg:px-16">
      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-[56px] sm:leading-[68px]">
        Car services, priced up front
      </h1>
      <p className={`${sectionSubtitleClass} mt-5 max-w-2xl text-ink-muted`}>
        Whatever your car needs, compare itemised quotes from verified workshops
        near you before you commit to anything.
      </p>
    </section>

    <section className="relative z-10 mx-auto max-w-page px-4 pb-16 sm:px-8 lg:px-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className="flex flex-col justify-between rounded-2xl border border-line-soft bg-white p-6 shadow-card transition-shadow hover:shadow-cardHover"
          >
            <div>
              <h2 className="text-xl font-bold text-ink-heading">{service.name}</h2>
              <p className="mt-3 leading-relaxed text-ink-muted">
                {service.description}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm font-bold text-ink">
                From {formatPrice(service.priceFrom)}
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red">
                Details
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  </main>
);

export default Services;
