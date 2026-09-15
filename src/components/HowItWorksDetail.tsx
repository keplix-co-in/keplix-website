import React from 'react';

/**
 * Real explanatory prose for the homepage.
 *
 * The rest of the homepage is necessarily short — a hero, a step diagram, a
 * feature grid — because that is what a landing page is for. But a page built
 * entirely out of headlines and four-word bullets is exactly what Google's
 * reviewers read as thin ("Low value content", 2026-09; see the note in
 * constants/ads.ts). This section is the fix: three genuine, specific
 * explanations of how the mechanics behind those headlines actually work,
 * long enough to read as real content rather than another marketing band.
 *
 * Every claim here is something the product actually does, not a projection
 * or a stat. No invented numbers, no testimonials — same standard the rest of
 * this file has already been held to (see the removed trust-carousel note in
 * Future.tsx). If a sentence can't be traced to real backend behaviour, it
 * doesn't belong here.
 */
const HowItWorksDetail: React.FC = () => (
  <section className="relative z-10 mx-auto max-w-page px-4 py-16 sm:px-8 lg:px-16">
    <div className="mx-auto max-w-3xl">
      <h2 className="text-center text-2xl font-bold text-ink-heading sm:text-[28px]">
        What &ldquo;compare and book&rdquo; actually means
      </h2>

      <div className="mt-10 space-y-10">
        <article>
          <h3 className="text-xl font-bold text-ink-heading">
            Itemised prices, not a single estimate
          </h3>
          <p className="mt-3 leading-relaxed text-ink-body">
            Most car servicing in India still runs on a phone call: you describe the
            problem, a workshop guesses a number, and the real bill shows up after
            the work is already done. Keplix asks workshops to price each line item —
            parts, labour, and any inspection — before you commit to anything. You see
            that breakdown for every workshop that offers the service you asked for, so
            comparing two quotes means comparing the same things side by side, not two
            differently-worded phone calls.
          </p>
          <p className="mt-4 leading-relaxed text-ink-body">
            That only works if the number you see up front is the number on the final
            bill. Any change to the scope of work — a part that turns out to need
            replacing, say — has to be itemised and shown to you before it&rsquo;s
            added, not folded into the total afterwards.
          </p>
        </article>

        <article>
          <h3 className="text-xl font-bold text-ink-heading">
            What workshop verification checks
          </h3>
          <p className="mt-3 leading-relaxed text-ink-body">
            A workshop can&rsquo;t start accepting bookings on Keplix by signing up and
            listing prices. It goes through a verification step first — confirming the
            business is real and operating at the address it lists — before its
            services become visible to customers at all. That&rsquo;s a floor, not a
            guarantee of quality on every visit; it exists so that a listing on the
            platform corresponds to an actual, checkable garage rather than a name
            someone typed into a form.
          </p>
        </article>

        <article>
          <h3 className="text-xl font-bold text-ink-heading">
            Payment held until the job is actually done
          </h3>
          <p className="mt-3 leading-relaxed text-ink-body">
            When you pay for a booking, that payment doesn&rsquo;t go straight to the
            workshop. It&rsquo;s held against the booking, and the payout to the
            workshop is only released once the service is marked complete on your
            side. If a booking is cancelled inside the cancellation window, the same
            mechanism runs in reverse: a refund back to you rather than a payout
            forward to the workshop. Neither side has to trust the other on faith —
            the payment sits in the middle until there&rsquo;s something to release it
            for.
          </p>
        </article>
      </div>
    </div>
  </section>
);

export default HowItWorksDetail;
