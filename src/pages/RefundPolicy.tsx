import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBlob from '../components/PageBlob';
import { CONTACT } from '../constants/links';
// AdSlot deliberately removed: see the note in PrivacyPolicy.tsx history --
// ads on boilerplate legal pages with no unique content is a documented
// AdSense low-value-content rejection cause, and this site was rejected for
// exactly that.
import Seo from '../components/Seo';
import { breadcrumbSchema } from '../constants/schema';

/**
 * Section 1 (cancellation refund amount) is kept in sync with the actual
 * enforced policy in keplix-backend/services/refundPolicy.js -- audit #89
 * found this page still describing an unimplemented 24-hour/50% draft while
 * the backend had since shipped a different, simpler rule: full refund any
 * time before work starts (booking status pending/confirmed/scheduled), no
 * cancellation fee, no refund once status is in_progress or later. If that
 * backend logic changes, update this section to match -- do not let the two
 * drift apart again.
 *
 * Everything else on this page (processing times, dispute windows) is
 * process/support commitment, not something the backend enforces in code.
 */

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-ink-heading mb-4 border-b border-line-soft pb-2">{title}</h2>
    <div className="text-ink-body space-y-4 leading-relaxed">{children}</div>
  </div>
);

const RefundPolicy: React.FC = () => {
  return (
    <main className="relative overflow-hidden">
      <PageBlob />

      <Seo
        title="Refund &amp; Cancellation Policy"
        description="How cancellations and refunds work at Keplix: full refund any time before work starts, no refund once work has begun, and refunds back to your original payment method in 5-7 working days."
        jsonLd={[breadcrumbSchema([{ name: 'Refund Policy', path: '/refund-policy' }])]}
      />

      {/* Hero Banner */}
      <div className="relative z-10 px-4 pb-8 pt-[69px]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <RotateCcw className="w-14 h-14 text-brand-red" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-ink">Refund &amp; Cancellation Policy</h1>
          <p className="text-ink-muted text-lg">
            Last updated: <span className="text-brand-red font-semibold">March 07, 2026</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <div className="rounded-2xl bg-white shadow-card p-6 sm:p-10">

          {/* Draft notice — remove once the business has signed these terms off. */}
          <div className="mb-10 rounded-xl border border-line-soft bg-gray-50 p-6">
            <p className="text-ink-body leading-relaxed">
              <strong className="text-ink-heading">Draft for review.</strong> The timelines and
              amounts on this page are proposed defaults and are pending final approval. Please
              confirm the exact terms with our support team before relying on them for a specific
              booking.
            </p>
          </div>

          {/* Intro */}
          <div className="mb-10 text-ink-body leading-relaxed space-y-4">
            <p>
              This policy explains when you can cancel a booking made through{' '}
              <strong className="text-ink-heading">Keplix</strong>, what refund you can expect, and
              how long it takes to reach you. It applies to services booked and paid for through the
              Keplix app or website.
            </p>
            <p>
              We want cancelling to be as straightforward as booking. Wherever the outcome is in
              doubt, our support team will decide in your favour.
            </p>
          </div>

          <Section title="1. Cancelling a booking">
            <p>
              You can cancel any booking from the <strong className="text-ink-heading">My Bookings</strong>{' '}
              section of the Keplix app. What you get back depends on whether the workshop has
              started work yet — not on how close you are to your slot:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong className="text-ink-heading">Any time before work starts —</strong>{' '}
                full refund of everything you paid, with no cancellation fee, even if that's minutes
                before your slot.
              </li>
              <li>
                <strong className="text-ink-heading">After work has started —</strong>{' '}
                no refund, because parts and labour have already been committed. If you are unhappy
                with the work itself, see section 4.
              </li>
            </ul>
          </Section>

          <Section title="2. If the workshop cancels">
            <p>
              If a partner workshop cancels your booking, cannot honour the slot, or does not turn
              up, you receive a{' '}
              <strong className="text-ink-heading">100% refund regardless of timing</strong> — including
              cancellations made minutes before the appointment. We will also help you rebook with
              another verified workshop nearby.
            </p>
          </Section>

          <Section title="3. How refunds are paid">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Refunds always go back to the{' '}
                <strong className="text-ink-heading">original payment method</strong>. We cannot
                redirect a refund to a different card, account or wallet.
              </li>
              <li>
                Once approved, refunds are initiated immediately and typically appear within{' '}
                <strong className="text-ink-heading">5–7 working days</strong>. The exact timing
                depends on your bank or card issuer.
              </li>
              <li>
                You will receive a confirmation in the app and by email when a refund is initiated,
                including a reference number you can quote to your bank.
              </li>
            </ul>
          </Section>

          <Section title="4. Service quality and disputes">
            <p>
              If the work carried out was not what you agreed, was incomplete, or created a new
              problem, do not cancel — raise a dispute instead. Contact us within{' '}
              <strong className="text-ink-heading">7 days of the service date</strong> with your
              booking reference and photos where relevant.
            </p>
            <p>
              We acknowledge every dispute within{' '}
              <strong className="text-ink-heading">48 hours</strong> and aim to resolve it within{' '}
              <strong className="text-ink-heading">7 working days</strong>. Depending on the outcome,
              a resolution may be a free rework by the same workshop, a partial refund, or a full
              refund.
            </p>
          </Section>

          <Section title="5. What is not refundable">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Diagnostic or inspection fees, where the inspection has already been carried out and
                the findings shared with you.
              </li>
              <li>
                Parts that have been fitted and used, unless they are found to be faulty — in which
                case the manufacturer or workshop warranty applies.
              </li>
              <li>
                Bookings where you did not attend and did not cancel in advance.
              </li>
            </ul>
          </Section>

          <Section title="6. Getting help">
            <p>
              If anything about a refund is unclear, or a refund has not arrived within the expected
              window, contact us and we will chase it for you.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Email:{' '}
                <a href={`mailto:${CONTACT.email}`} className="text-brand-red hover:underline">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                Or use the{' '}
                <Link to="/contact" className="text-brand-red hover:underline">
                  contact form
                </Link>
                .
              </li>
            </ul>
            <p>
              You may also find your answer on our{' '}
              <Link to="/faq" className="text-brand-red hover:underline">
                FAQ page
              </Link>
              .
            </p>
          </Section>

        </div>

      </div>
    </main>
  );
};

export default RefundPolicy;
