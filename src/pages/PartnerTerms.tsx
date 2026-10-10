import React from 'react';
import { Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBlob from '../components/PageBlob';
import { CONTACT } from '../constants/links';
import { LEGAL } from '../constants/legal';
import Seo from '../components/Seo';
import { breadcrumbSchema } from '../constants/schema';

/**
 * ⚠️ DRAFT PARTNER TERMS — NOT LEGALLY REVIEWED
 *
 * The garage portal (partner.keplix.co.in) and the partner app previously
 * linked only to the customer Terms, which say nothing about what a workshop
 * agrees to. This page fills that gap.
 *
 * Kept deliberately in step with what the backend does today:
 *   - platform fee: PlatformSettings.platformFeePercentage (10% default),
 *     withheld from the booking amount at payout — matches Terms.tsx §4.
 *   - payment is held until the service is completed — Terms.tsx §4.
 *   - customer refunds follow RefundPolicy.tsx / services/refundPolicy.js.
 * If any of those change, update this page in the same change. Have counsel
 * review before relying on it.
 */

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-ink-heading mb-4 border-b border-line-soft pb-2">
      {title}
    </h2>
    <div className="text-ink-body space-y-4 leading-relaxed">{children}</div>
  </div>
);

const link = 'text-brand-red hover:underline';

const PartnerTerms: React.FC = () => (
  <main className="relative overflow-hidden">
    <PageBlob />

    <Seo
      title="Partner Terms for Workshops"
      description="The agreement between Keplix and partner workshops: onboarding and verification, platform fee and payouts, service standards, cancellations, customer data and termination."
      canonical="/partner-terms"
      jsonLd={[breadcrumbSchema([{ name: 'Partner Terms', path: '/partner-terms' }])]}
    />

    <div className="relative z-10 px-4 pb-8 pt-[69px]">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-4 flex justify-center">
          <Handshake className="h-14 w-14 text-brand-red" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-ink md:text-5xl">Partner Terms</h1>
        <p className="text-lg text-ink-muted">
          The agreement between your workshop and Keplix when you use the Keplix Partner app or
          the partner portal.
        </p>
        <p className="mt-2 text-sm text-ink-muted">Last updated: October 08, 2026</p>
      </div>
    </div>

    <section className="relative z-10 mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-2xl bg-white p-6 shadow-card sm:p-10">
        <Section title="1. Who these terms apply to">
          <p>
            These terms apply to any workshop, garage or service centre (“Partner”, “you”) that
            registers on the Keplix Partner app or at partner.keplix.co.in. Keplix is operated by{' '}
            {LEGAL.entityName}, {LEGAL.addressLines.join(', ')}.
          </p>
          <p>
            Our{' '}
            <Link to="/terms" className={link}>Terms of Service</Link> and{' '}
            <Link to="/privacy-policy" className={link}>Privacy Policy</Link> also apply. Where they
            conflict with these Partner Terms on a matter between you and Keplix, these Partner
            Terms prevail. By registering, you confirm that you are authorised to accept them on
            behalf of the business.
          </p>
        </Section>

        <Section title="2. Onboarding and verification">
          <p>
            You must give accurate business details, documents, location and bank details, and keep
            them current. We verify Partners before a listing goes live and may ask for more
            information at any time. We may decline or pause a listing that we cannot verify.
          </p>
          <p>
            You are responsible for holding every licence, registration and tax registration (such
            as GST, where applicable) your business needs, and for the conduct of your staff.
          </p>
        </Section>

        <Section title="3. Prices and bookings">
          <p>
            You set the prices shown for your services. They must be honest, itemised where the app
            asks for it, and inclusive of the taxes you charge. Once you confirm a booking, you agree
            to honour the slot and the confirmed price.
          </p>
          <p>
            If a car needs work beyond what was booked, you must get the customer’s approval through
            the app before doing it or charging for it.
          </p>
        </Section>

        <Section title="4. Platform fee and payouts">
          <p>
            Joining Keplix is free. For each booking completed through Keplix, Keplix keeps a platform
            fee (currently 10% of the booking amount) and pays you the balance. We will give you
            notice in the app or by email before changing the fee, and the change will apply only to
            bookings made after it takes effect.
          </p>
          <p>
            Customers pay Keplix in the app. The money is held until the service is marked complete
            and is then released to the bank account you registered. Taking payment directly from a
            customer for a booking made through Keplix is not allowed.
          </p>
          <p>
            We may hold back or recover a payout that relates to a disputed, refunded or fraudulent
            booking until it is resolved.
          </p>
        </Section>

        <Section title="5. Cancellations and refunds">
          <p>
            Customers can cancel and get a full refund any time before work starts, as described in
            our <Link to="/refund-policy" className={link}>Refund &amp; Cancellation Policy</Link>. No
            payout is due for a booking cancelled before work starts.
          </p>
          <p>
            If you cancel a confirmed booking or do not turn up, the customer is refunded in full.
            Repeated cancellations or no-shows can lead to lower visibility, suspension or removal.
          </p>
        </Section>

        <Section title="6. Service quality and warranty">
          <p>
            You are responsible for the quality of your work, for the parts you fit, and for any
            warranty you offer. You agree to use parts that are what you describe them as (genuine,
            OEM-equivalent or aftermarket), and to complete any inspection or health report the app
            asks for.
          </p>
          <p>
            If a customer complains, you agree to work with us in good faith. A resolution may be a
            free rework, a partial refund or a full refund, and a refund upheld against you may be
            recovered from your payouts.
          </p>
        </Section>

        <Section title="7. Customer data">
          <p>
            You will receive customers’ names, phone numbers and vehicle details only to carry out
            their bookings. You must not use them for any other purpose, including marketing, share
            them with anyone else, or keep them longer than you need to. You must keep them secure
            and tell us straight away if you suspect they have been misused.
          </p>
        </Section>

        <Section title="8. Reviews and conduct">
          <p>
            You must not post, buy or solicit fake reviews, offer customers rewards for changing a
            review, or contact customers to move bookings off Keplix. Abusive or unsafe behaviour
            towards customers or our staff is grounds for immediate suspension.
          </p>
        </Section>

        <Section title="9. Suspension and termination">
          <p>
            You can stop using Keplix at any time by contacting us, after completing or cancelling
            any open bookings. We may suspend or remove a listing if these terms are breached, if
            there are repeated customer complaints, or if the law requires it. Where we can, we will
            tell you why and give you a chance to respond. Payouts already due for completed,
            undisputed bookings will still be paid.
          </p>
        </Section>

        <Section title="10. Liability and indemnity">
          <p>
            Keplix provides the platform; it does not carry out repairs. You are responsible for
            claims arising from your work, your parts, your premises and your staff, and you agree to
            compensate Keplix for losses it suffers because of them.
          </p>
          <p>
            Keplix is not liable for indirect losses or lost profits. Our total liability to you for
            any claim is limited to the platform fees we received from you in the three months
            before the claim. Nothing in these terms limits liability that cannot be limited by law.
          </p>
        </Section>

        <Section title="11. Changes, governing law and grievances">
          <p>
            We may update these terms. We will give notice of material changes in the app or by
            email, and continuing to use Keplix after they take effect means you accept them.
          </p>
          <p>
            These terms are governed by the laws of India, and the courts at Delhi have jurisdiction
            over any dispute. Complaints can be sent to our Grievance Officer at{' '}
            <a href={`mailto:${LEGAL.grievanceEmail}`} className={link}>{LEGAL.grievanceEmail}</a>.
            For anything else, email{' '}
            <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a> or call{' '}
            {CONTACT.phoneDisplay}.
          </p>
        </Section>
      </div>
    </section>
  </main>
);

export default PartnerTerms;
