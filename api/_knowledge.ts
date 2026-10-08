/**
 * What the website chatbot (api/chat.ts) knows about Keplix.
 *
 * Built from the same constants the site renders (FAQs, services, contact
 * details) so the bot cannot drift from the pages. Only facts that live
 * nowhere else are written by hand below. Keep them in sync with the backend
 * like RefundPolicy.tsx asks.
 */
import { CUSTOMER_FAQS, GARAGE_FAQS, type Faq } from '../src/constants/faqs.js';
import { SERVICES, formatPrice } from '../src/constants/services.js';
import { SITE_URL, SITE_TAGLINE, DEFAULT_DESCRIPTION } from '../src/constants/site.js';
import { APP_LINKS, CONTACT } from '../src/constants/links.js';

// The 'cancel' FAQ still describes the old 24-hour/partial-refund draft, which
// the backend never shipped (see the header comment in RefundPolicy.tsx). The
// policy section below is the real rule, so that FAQ is left out here.
const STALE_FAQ_IDS = new Set(['cancel']);

const faqBlock = (faqs: Faq[]) =>
  faqs
    .filter((f) => !STALE_FAQ_IDS.has(f.id))
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join('\n\n');

const servicesBlock = SERVICES.map(
  (s) =>
    `### ${s.name} (${SITE_URL}/services/${s.slug})\n` +
    `${s.description}\n` +
    `Indicative price: ${formatPrice(s.priceFrom)}–${formatPrice(s.priceTo)} (hatchback/sedan, Delhi NCR; the real quote depends on the car and the workshop). Typical time: ${s.duration}.\n` +
    `Includes: ${s.included.join('; ')}.\n` +
    s.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n'),
).join('\n\n');

export const KNOWLEDGE = `
# Keplix: ${SITE_TAGLINE}
${DEFAULT_DESCRIPTION}
Website: ${SITE_URL}

## Apps
- Customer app (Android): ${APP_LINKS.customerAndroid}
- Garage partner app (Android): ${APP_LINKS.vendorAndroid}
- Garage partner web portal: ${APP_LINKS.vendorWeb}
- iOS: not available yet, coming soon.
- Booking happens in the app. The website explains services and lets people contact us.

## Contact / human support
- Email: ${CONTACT.email}
- Phone: ${CONTACT.phoneDisplay}
- WhatsApp: ${CONTACT.whatsapp}
- Contact form: ${SITE_URL}/contact
- Address: ${CONTACT.address}

## Cancellation and refund policy (authoritative)
- Customers cancel from My Bookings in the app.
- Cancel any time before the workshop starts work: full refund and no cancellation fee, even minutes before the slot.
- Once work has started: no refund for cancelling. If unhappy with the work, raise a dispute instead.
- If the workshop cancels, can't honour the slot, or doesn't turn up: 100% refund, and we help rebook.
- Refunds go to the original payment method only and usually arrive in 5–7 working days. The customer gets a reference number.
- Disputes: within 7 days of the service, with the booking reference and photos. Acknowledged within 48 hours, and we aim to resolve them within 7 working days. The outcome can be free rework, a partial refund or a full refund.
- Not refundable: diagnostic fees for inspections already done and shared, fitted parts that aren't faulty (warranty applies), and no-shows who didn't cancel.
- The policy page is marked as a draft pending final approval. Full text: ${SITE_URL}/refund-policy

## Job tracking
- Walk-in customers get a tracking link by SMS/WhatsApp (${SITE_URL}/job/...). App bookings are tracked in the app.

## Customer FAQs
${faqBlock(CUSTOMER_FAQS)}

## Garage / workshop partner FAQs
${faqBlock(GARAGE_FAQS)}
More for garages: ${SITE_URL}/business

## Services
${servicesBlock}
`.trim();
