import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBlob from '../components/PageBlob';
import { APP_LINKS, CONTACT } from '../constants/links';
import AdSlot from '../components/AdSlot';

/**
 * Answers here must stay consistent with the claims made elsewhere on the
 * site — in particular the Workshops page advertises free-to-join with no
 * commission on bookings, and the Refund Policy page owns the cancellation
 * windows. If either changes, update it there first and mirror it here.
 */

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-ink-heading mb-4 border-b border-line-soft pb-2">{title}</h2>
    <div className="text-ink-body space-y-3 leading-relaxed">{children}</div>
  </div>
);

/**
 * Built on native <details>/<summary> rather than a JS accordion: it needs no
 * state, is keyboard accessible and screen-reader friendly out of the box,
 * and still works if the bundle fails to load. `group` + `open:` drive the
 * chevron rotation purely in CSS.
 */
const Faq: React.FC<{ q: string; children: React.ReactNode }> = ({ q, children }) => (
  <details className="group rounded-xl border border-line-soft bg-white px-5 py-4 open:bg-gray-50">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-heading marker:hidden [&::-webkit-details-marker]:hidden">
      <span>{q}</span>
      <ChevronDown
        className="h-5 w-5 shrink-0 text-ink-faint transition-transform duration-200 group-open:rotate-180"
        aria-hidden="true"
      />
    </summary>
    <div className="mt-3 space-y-3 text-ink-body leading-relaxed">{children}</div>
  </details>
);

const FAQ: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <PageBlob />

      {/* Hero Banner */}
      <div className="relative z-10 px-4 pb-8 pt-[69px]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-14 h-14 text-brand-red" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-ink">Frequently Asked Questions</h1>
          <p className="text-ink-muted text-lg">
            Everything you need to know about booking a service — and about partnering with us.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <div className="rounded-2xl bg-white shadow-card p-6 sm:p-10">

          <Section title="For Car Owners">
            <Faq q="How do I book a service?">
              <p>
                Open the Keplix app, tell us what your car needs, and you will see verified
                workshops near you with their prices and ratings. Pick one, choose a date and time
                slot, and confirm. You will get a booking confirmation straight away, and the
                workshop confirms your slot from their side.
              </p>
            </Faq>

            <Faq q="Can I compare prices before I book?">
              <p>
                Yes — that is the point. Every workshop shows an itemised price for the service you
                selected, so you can compare like for like rather than guessing. There are no
                platform fees added on top of the price you see.
              </p>
            </Faq>

            <Faq q="What payment methods can I use?">
              <p>
                Payments are handled through our payment gateway and support UPI, debit and credit
                cards, and net banking. You pay through the app when you book, so there is nothing
                to settle at the counter.
              </p>
            </Faq>

            <Faq q="Is my payment safe?">
              <p>
                Yes. Card and UPI details are entered directly into the payment gateway&apos;s own secure
                checkout — Keplix never sees or stores your card number. Your money is held until
                the service is complete, which is also what lets us refund you cleanly if something
                goes wrong.
              </p>
            </Faq>

            <Faq q="Can I cancel or reschedule a booking?">
              <p>
                You can, from the My Bookings section. Cancel more than 24 hours before your slot
                for a full refund; inside 24 hours a partial refund applies. Rescheduling to another
                available slot with the same workshop is free.
              </p>
              <p>
                Full details are on the{' '}
                <Link to="/refund-policy" className="text-brand-red hover:underline">
                  Refund &amp; Cancellation Policy
                </Link>{' '}
                page.
              </p>
            </Faq>

            <Faq q="How long does a refund take?">
              <p>
                Refunds go back to the original payment method and usually arrive within 5–7 working
                days, depending on your bank. You will get a confirmation with a reference number as
                soon as the refund is initiated.
              </p>
            </Faq>

            <Faq q="Can I track my service while it is happening?">
              <p>
                Yes. You can follow your booking through each stage — accepted, in progress and
                completed — from within the app, so you are not left wondering whether your car has
                even been looked at yet.
              </p>
            </Faq>

            <Faq q="What if I am not happy with the work?">
              <p>
                Raise a dispute in the app within 7 days of the service, with photos if you have
                them. We acknowledge every dispute within 48 hours. Depending on what we find, the
                resolution may be a free rework, a partial refund or a full refund.
              </p>
            </Faq>

            <Faq q="Are the workshops verified?">
              <p>
                Every partner workshop is checked before it can accept bookings, and we track
                ratings and reviews from real completed services afterwards. Workshops that fall
                below our standards are removed from the platform.
              </p>
            </Faq>

            <Faq q="Do you keep a record of my car's service history?">
              <p>
                Yes — every service booked through Keplix is stored against your vehicle, so you
                have a complete history in one place. It is genuinely useful when you come to sell
                the car.
              </p>
            </Faq>

            <Faq q="Which cities is Keplix available in?">
              <p>
                We are rolling out city by city, starting with Delhi NCR and expanding across
                India. The app shows the workshops currently available near you. If we are not live
                in your area yet,{' '}
                <Link to="/beta" className="text-brand-red hover:underline">
                  join the beta
                </Link>{' '}
                and we will tell you as soon as we arrive.
              </p>
            </Faq>

            <Faq q="Do I need the app, or can I book from the website?">
              <p>
                Booking happens in the app, which is where you also track your service and keep your
                vehicle records.{' '}
                <a
                  href={APP_LINKS.customerAndroid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-red hover:underline"
                >
                  Download the Keplix app for Android
                </a>
                . An iOS version is on the way.
              </p>
            </Faq>
          </Section>

          <Section title="For Garages &amp; Workshops">
            <Faq q="How do I join Keplix as a workshop?">
              <p>
                Download the Keplix Garage Partner app, or{' '}
                <Link to="/business" className="text-brand-red hover:underline">
                  register your interest here
                </Link>
                . You will be asked for your business details, documents and payout information, and
                our team verifies everything before your listing goes live.
              </p>
            </Faq>

            <Faq q="What does it cost to join?">
              <p>
                Joining Keplix is free, and we do not take a commission on your bookings. You keep
                what you charge.
              </p>
            </Faq>

            <Faq q="How and when do I get paid?">
              <p>
                Customers pay through the app when they book. Once the service is completed and
                confirmed, your earnings are released and transferred to the bank account you
                registered during onboarding. You can see every booking, its status and your
                earnings in the partner app.
              </p>
            </Faq>

            <Faq q="What do I need to provide during verification?">
              <p>
                Your business registration details, proof of address for the workshop, owner
                identification, and the bank account or UPI ID you want to be paid into. Getting the
                payout details right matters — an incorrect account number will hold up your
                payments.
              </p>
            </Faq>

            <Faq q="Can I choose which bookings to accept?">
              <p>
                Yes. Booking requests come through the partner app and you accept or decline each
                one. You also control your working hours and availability, so you only receive
                requests for slots you can actually take.
              </p>
            </Faq>

            <Faq q="Who do I contact if something goes wrong?">
              <p>
                Partner support is available by email at{' '}
                <a href={`mailto:${CONTACT.email}`} className="text-brand-red hover:underline">
                  {CONTACT.email}
                </a>{' '}
                or on {CONTACT.phoneDisplay}. Every partner also has a point of contact for booking
                or payout issues.
              </p>
            </Faq>
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

        {/* Sits outside the white content card, inside the same
            max-w-4xl wrapper, so it reads as separate from the page's
            own content rather than part of it. */}
        <AdSlot slot="pageFooter" className="mt-10" />
      </div>
    </div>
  );
};

export default FAQ;
