import React from 'react';
import { Link } from 'react-router-dom';
import { APP_LINKS, CONTACT } from './links';

/**
 * Extra JSX appended to specific FAQ answers — links that belong on the page
 * but deliberately not in the structured data, where plain prose reads
 * better and markup is disallowed. Keyed by FAQ id.
 *
 * Moved out of src/pages/FAQ.tsx (2026-09-14): a module-level constant
 * holding JSX, defined outside the page component, tripped
 * react-refresh/only-export-components' file-boundary check. Its own
 * message says exactly what to do -- put shared, non-component values in
 * their own file, matching the constants/faqs.ts, constants/links.ts and
 * constants/schema.ts siblings this same page already imports from.
 */
export const answerExtras: Record<string, React.ReactNode> = {
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
