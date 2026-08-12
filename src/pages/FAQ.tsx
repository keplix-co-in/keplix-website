import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBlob from '../components/PageBlob';
import AdSlot from '../components/AdSlot';
import Seo from '../components/Seo';
import { breadcrumbSchema, faqPageSchema } from '../constants/schema';
import { CUSTOMER_FAQS, GARAGE_FAQS, ALL_FAQS, type Faq as FaqData } from '../constants/faqs';
import { APP_LINKS, CONTACT } from '../constants/links';

/**
 * Extra JSX appended to specific answers — links that belong on the page but
 * deliberately not in the structured data, where plain prose reads better and
 * markup is disallowed. Keyed by FAQ id.
 */
const answerExtras: Record<string, React.ReactNode> = {
  cancel: (
    <p>
      Full details are on the{' '}
      <Link to="/refund-policy" className="text-brand-red hover:underline">
        Refund &amp; Cancellation Policy
      </Link>{' '}
      page.
    </p>
  ),
  cities: (
    <p>
      If we are not live in your area yet,{' '}
      <Link to="/beta" className="text-brand-red hover:underline">
        join the beta
      </Link>{' '}
      and we will tell you as soon as we arrive.
    </p>
  ),
  app: (
    <p>
      <a
        href={APP_LINKS.customerAndroid}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-red hover:underline"
      >
        Download the Keplix app for Android
      </a>
      .
    </p>
  ),
  join: (
    <p>
      You can{' '}
      <Link to="/business" className="text-brand-red hover:underline">
        register your interest here
      </Link>
      .
    </p>
  ),
  support: (
    <p>
      Email{' '}
      <a href={`mailto:${CONTACT.email}`} className="text-brand-red hover:underline">
        {CONTACT.email}
      </a>{' '}
      or call {CONTACT.phoneDisplay}.
    </p>
  ),
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-ink-heading mb-4 border-b border-line-soft pb-2">{title}</h2>
    <div className="text-ink-body space-y-3 leading-relaxed">{children}</div>
  </section>
);

/**
 * Native <details>/<summary>: no state, keyboard accessible and screen-reader
 * friendly by default, and it still works if the bundle fails to load.
 *
 * The question is an <h3>, not a <span>. Answer engines lean heavily on
 * heading structure to pair a question with its answer, and this page is the
 * single most quotable thing on the site.
 */
const FaqItem: React.FC<{ faq: FaqData }> = ({ faq }) => (
  <details className="group rounded-xl border border-line-soft bg-white px-5 py-4 open:bg-gray-50">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 marker:hidden [&::-webkit-details-marker]:hidden">
      <h3 className="text-[17px] font-bold text-ink-heading sm:text-[18px]">{faq.question}</h3>
      <ChevronDown
        className="h-5 w-5 shrink-0 text-ink-faint transition-transform duration-200 group-open:rotate-180"
        aria-hidden="true"
      />
    </summary>
    <div className="mt-3 space-y-3 text-ink-body leading-relaxed">
      <p>{faq.answer}</p>
      {answerExtras[faq.id]}
    </div>
  </details>
);

const FAQ: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <PageBlob />

      <Seo
        title="Car Service FAQs — Booking, Pricing, Refunds"
        description="Answers to common questions about booking a car service with Keplix: comparing prices, payment methods, cancellations and refunds, tracking your service, and joining as a garage partner."
        jsonLd={[
          faqPageSchema(ALL_FAQS.map(({ question, answer }) => ({ question, answer }))),
          breadcrumbSchema([{ name: 'FAQ', path: '/faq' }]),
        ]}
      />

      {/* Hero Banner */}
      <div className="relative z-10 px-4 pb-8 pt-[69px]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-14 h-14 text-brand-red" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-ink">Frequently Asked Questions</h1>
          <p className="text-ink-muted text-lg">
            Everything you need to know about booking a car service — and about partnering with us.
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <div className="rounded-2xl bg-white shadow-card p-6 sm:p-10">
          <Section title="For Car Owners">
            {CUSTOMER_FAQS.map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))}
          </Section>

          <Section title="For Garages &amp; Workshops">
            {GARAGE_FAQS.map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))}
          </Section>

          <div className="rounded-xl border border-line-soft bg-gray-50 p-6 text-ink-body leading-relaxed">
            <p>
              <strong className="text-ink-heading">Still stuck?</strong> Send us a note through the{' '}
              <Link to="/contact" className="text-brand-red hover:underline">
                contact page
              </Link>{' '}
              or email{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-brand-red hover:underline">
                {CONTACT.email}
              </a>{' '}
              and a human will get back to you.
            </p>
          </div>
        </div>

        {/* Sits outside the white content card so it reads as separate from
            the page's own content rather than part of it. */}
        <AdSlot slot="pageFooter" className="mt-10" />
      </main>
    </div>
  );
};

export default FAQ;
