import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Clock, IndianRupee, AlertTriangle, ChevronDown } from 'lucide-react';
import PageBlob from '../components/PageBlob';
import Seo from '../components/Seo';
import NotFound from './NotFound';
import AdSlot from '../components/AdSlot';
import { breadcrumbSchema, faqPageSchema, serviceSchema } from '../constants/schema';
import { SERVICES, formatPrice, serviceBySlug } from '../constants/services';
import { sectionSubtitleClass } from '../constants/typography';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceBySlug(slug) : undefined;

  // An unknown service slug is a genuine 404, not an empty page — otherwise
  // /services/anything would return a thin 200 for any URL a crawler invented.
  if (!service) return <NotFound />;

  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <main className="relative overflow-hidden">
      <PageBlob />

      <Seo
        title={service.title}
        description={service.description}
        canonical={`/services/${service.slug}`}
        jsonLd={[
          serviceSchema(service),
          faqPageSchema(service.faqs),
          breadcrumbSchema([
            { name: 'Services', path: '/services' },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <section className="relative z-10 mx-auto max-w-page px-4 pb-6 pt-10 sm:px-8 lg:px-16">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
          <Link to="/services" className="hover:text-brand-red">
            Services
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink-body">{service.name}</span>
        </nav>

        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-[52px] sm:leading-[64px]">
          {service.heading}
        </h1>
        <p className={`${sectionSubtitleClass} mt-5 max-w-2xl text-ink-muted`}>
          {service.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 rounded-xl border border-line-soft bg-white px-4 py-3 shadow-card">
            <IndianRupee className="h-5 w-5 text-brand-red" aria-hidden="true" />
            <span className="text-sm font-bold text-ink">
              {formatPrice(service.priceFrom)} – {formatPrice(service.priceTo)}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-line-soft bg-white px-4 py-3 shadow-card">
            <Clock className="h-5 w-5 text-brand-red" aria-hidden="true" />
            <span className="text-sm font-bold text-ink">{service.duration}</span>
          </div>
          <Link
            to="/beta"
            className="flex items-center rounded-btn bg-brand-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-redHover"
          >
            Book this service
          </Link>
        </div>

        {/* Indicative, and said so plainly. A range that turns out to be wrong
            costs more trust than no range at all. */}
        <p className="mt-4 text-xs text-ink-faint">
          Indicative range for a hatchback or sedan in Delhi NCR. Your quote depends on
          your car and the workshop — you see itemised prices before booking.
        </p>
      </section>

      <section className="relative z-10 mx-auto max-w-page px-4 py-10 sm:px-8 lg:px-16">
        <div className="rounded-2xl bg-white p-6 shadow-card sm:p-10">
          <p className="text-lg leading-relaxed text-ink-body">{service.intro}</p>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-ink-heading">What&rsquo;s included</h2>
              <ul className="mt-4 space-y-3">
                {service.included.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-body">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink-heading">Signs you need this</h2>
              <ul className="mt-4 space-y-3">
                {service.signs.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-body">
                    <AlertTriangle
                      className="mt-1 h-4 w-4 shrink-0 text-brand-red"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-page px-4 pb-10 sm:px-8 lg:px-16">
        <h2 className="text-2xl font-bold text-ink-heading">
          {service.name} — common questions
        </h2>
        <div className="mt-6 space-y-3">
          {service.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-line-soft bg-white px-5 py-4 open:bg-gray-50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 marker:hidden [&::-webkit-details-marker]:hidden">
                <h3 className="text-[17px] font-bold text-ink-heading sm:text-[18px]">
                  {faq.question}
                </h3>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-ink-faint transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 leading-relaxed text-ink-body">{faq.answer}</p>
            </details>
          ))}
        </div>

        <AdSlot slot="pageFooter" className="mt-10" />
      </section>

      <section className="relative z-10 mx-auto max-w-page px-4 pb-16 sm:px-8 lg:px-16">
        <h2 className="text-2xl font-bold text-ink-heading">Other services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="rounded-2xl border border-line-soft bg-white p-5 shadow-card transition-shadow hover:shadow-cardHover"
            >
              <h3 className="font-bold text-ink-heading">{s.name}</h3>
              <p className="mt-2 text-sm text-ink-muted">
                From {formatPrice(s.priceFrom)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServiceDetail;
