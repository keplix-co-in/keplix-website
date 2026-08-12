import React from 'react';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBlob from '../components/PageBlob';
import { CONTACT } from '../constants/links';
import Seo from '../components/Seo';
import { breadcrumbSchema } from '../constants/schema';

/**
 * ⚠️ DRAFT TERMS — NOT LEGALLY REVIEWED
 *
 * This page exists because the footer linked "Terms of Service" straight to the
 * privacy policy in two places. Those are different documents making different
 * promises, and showing one where a user expects the other is a trust problem
 * before it is an SEO one.
 *
 * What follows was written as a reasonable baseline for a marketplace that
 * takes payment and holds it in escrow. It has NOT been reviewed by a lawyer,
 * and it becomes binding on the company the moment it is public. Have counsel
 * read it — especially the liability, escrow and governing-law sections — and
 * make sure the cancellation terms stay in step with the Refund Policy page
 * and with what the payment backend actually enforces.
 */

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-ink-heading mb-4 border-b border-line-soft pb-2">
      {title}
    </h2>
    <div className="text-ink-body space-y-4 leading-relaxed">{children}</div>
  </div>
);

const Terms: React.FC = () => (
  <main className="relative overflow-hidden">
    <PageBlob />

    <Seo
      title="Terms of Service"
      description="The terms governing use of Keplix — how bookings, payments, cancellations and workshop responsibilities work between car owners, garages and Keplix."
      canonical="/terms"
      jsonLd={[breadcrumbSchema([{ name: 'Terms of Service', path: '/terms' }])]}
    />

    <div className="relative z-10 px-4 pb-8 pt-[69px]">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-4 flex justify-center">
          <FileText className="h-14 w-14 text-brand-red" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-ink md:text-5xl">Terms of Service</h1>
        <p className="text-lg text-ink-muted">
          The agreement between you and Keplix when you use this site or our apps.
        </p>
      </div>
    </div>

    <section className="relative z-10 mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-2xl bg-white p-6 shadow-card sm:p-10">
        <Section title="1. Who we are, and what Keplix does">
          <p>
            Keplix operates a marketplace that connects car owners with independent
            workshops and garages. We are not a repairer. We do not employ the
            mechanics who work on your car, and we do not carry out the service
            ourselves. What we provide is the platform: discovery, comparable
            quotes, booking, payment handling and support.
          </p>
          <p>
            By creating an account, booking a service, or otherwise using the site
            or apps, you agree to these terms. If you do not agree to them, please
            do not use the service.
          </p>
        </Section>

        <Section title="2. Eligibility">
          <p>
            You must be at least 18 years old and legally able to enter a contract.
            You agree that the information you give us — your contact details and
            your vehicle details — is accurate, and that you will keep it current.
            You are responsible for what happens under your account, so keep your
            login credentials to yourself.
          </p>
        </Section>

        <Section title="3. Bookings and quotes">
          <p>
            Prices shown before booking are quotes provided by the workshop, based
            on the vehicle and service details you supply. They are estimates, not
            fixed prices.
          </p>
          <p>
            Cars regularly need work that only becomes apparent once a mechanic has
            looked at them. Where that happens, the workshop must contact you and
            obtain your approval before carrying out any additional work or
            charging for it. You are never obliged to accept extra work.
          </p>
          <p>
            A booking is confirmed when you receive confirmation from us — not when
            you submit the request. Slots are subject to workshop availability.
          </p>
        </Section>

        <Section title="4. Payment and escrow">
          <p>
            Payments are processed by our payment partners. We do not store your
            card details.
          </p>
          <p>
            Payment for a booking is held by Keplix and released to the workshop
            after the service is completed. This is deliberate: it means that if
            something goes wrong, the money has not already left the system.
            Keplix retains a platform fee from each completed booking; the workshop
            receives the balance.
          </p>
          <p>
            You agree to pay the amount confirmed at booking, plus any additional
            work you have separately approved.
          </p>
        </Section>

        <Section title="5. Cancellations and refunds">
          <p>
            Cancellations and refunds are governed by our{' '}
            <Link to="/refund-policy" className="text-brand-red hover:underline">
              Refund &amp; Cancellation Policy
            </Link>
            , which forms part of these terms. In short: cancel well before your
            slot and you are refunded in full; cancel close to it and a charge may
            apply, because the workshop has held time for you.
          </p>
          <p>
            If a workshop cancels on you, or fails to carry out the service, you
            are refunded in full.
          </p>
        </Section>

        <Section title="6. Workshop responsibilities and service quality">
          <p>
            The workshop performing the service is responsible for the quality of
            its work, for the parts it fits, and for any warranty it offers on
            either. Any workmanship warranty is between you and that workshop.
          </p>
          <p>
            We verify workshops before they join the platform and we act on what
            customers tell us — including removing workshops that fall short. But
            we do not supervise individual repairs, and we do not warrant the work
            itself.
          </p>
          <p>
            If a service is not carried out properly, tell us. We will engage with
            the workshop on your behalf and, where the complaint is upheld, seek a
            rectification or a refund.
          </p>
        </Section>

        <Section title="7. Your vehicle">
          <p>
            You confirm that you own the vehicle or are authorised to have it
            serviced. Please remove valuables before handing it over. Neither
            Keplix nor the workshop is responsible for personal items left in a
            vehicle.
          </p>
        </Section>

        <Section title="8. Acceptable use">
          <p>You agree not to:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Use the platform for anything unlawful or fraudulent</li>
            <li>Submit false vehicle details, false bookings or fake reviews</li>
            <li>
              Attempt to circumvent the platform by arranging payment directly with
              a workshop for a booking made through Keplix
            </li>
            <li>
              Scrape, copy or redistribute content, pricing or workshop data from
              the platform
            </li>
            <li>Interfere with the security or operation of the service</li>
          </ul>
          <p>
            We may suspend or close accounts that breach these terms.
          </p>
        </Section>

        <Section title="9. Reviews and content you submit">
          <p>
            Reviews must reflect a genuine experience of a service you actually
            booked. We remove reviews that are abusive, defamatory, or that we have
            reason to believe are not genuine.
          </p>
          <p>
            You keep ownership of what you submit, and you grant us a licence to
            display it on the platform in connection with the service you reviewed.
          </p>
        </Section>

        <Section title="10. Liability">
          <p>
            Nothing in these terms limits liability for death or personal injury
            caused by negligence, for fraud, or for anything else that cannot
            lawfully be limited — including your rights under the Consumer
            Protection Act, 2019.
          </p>
          <p>
            Subject to that, Keplix is not liable for the acts or omissions of a
            workshop, and our total liability for any claim connected to a booking
            is limited to the amount you paid for that booking.
          </p>
        </Section>

        <Section title="11. Privacy">
          <p>
            How we handle your personal data is set out in our{' '}
            <Link to="/privacy-policy" className="text-brand-red hover:underline">
              Privacy Policy
            </Link>{' '}
            and our{' '}
            <Link to="/cookie-policy" className="text-brand-red hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
        </Section>

        <Section title="12. Changes to these terms">
          <p>
            We may update these terms as the service develops. Where a change
            materially affects your rights, we will give notice through the app or
            by email. Continuing to use Keplix after a change takes effect means
            you accept the updated terms.
          </p>
        </Section>

        <Section title="13. Governing law">
          <p>
            These terms are governed by the laws of India, and the courts at Delhi
            have jurisdiction over any dispute. We would much rather resolve
            things directly first — please contact us before it comes to that.
          </p>
        </Section>

        <Section title="14. Contact">
          <p>
            Questions about these terms: email{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-brand-red hover:underline">
              {CONTACT.email}
            </a>{' '}
            or call {CONTACT.phoneDisplay}. You can also reach us through the{' '}
            <Link to="/contact" className="text-brand-red hover:underline">
              contact page
            </Link>
            .
          </p>
        </Section>
      </div>
    </section>
  </main>
);

export default Terms;
