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
import { ABOUT_PILLARS, FOUNDER } from '../src/constants/about.js';

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

## About Keplix
- Keplix is a car-service marketplace: it connects car owners with verified workshops (garages) near them. Owners compare itemised prices, book a slot, pay and track the job in one app. Workshops get customers and run their jobs through Keplix.
- Where: rolling out city by city, starting with Delhi NCR and expanding across India. The app shows the workshops available near you.
- Founded by ${FOUNDER.name} (${FOUNDER.title}). ${FOUNDER.name} ${FOUNDER.background}
- Why it exists: ${FOUNDER.story}
${ABOUT_PILLARS.map((p) => `- ${p.title}: ${p.description}`).join('\n')}
- The vision is an aspiration, not a claim about today.
- No figures (number of garages, customers, bookings, cities) are published here; don't state any.

## Why choose Keplix (car owners)
Every point restates a fact elsewhere in KNOWLEDGE; the source is in brackets.
- Verified workshops: each partner is checked before it can take bookings, rated by real customers, and removed if it falls below standard. [FAQ: verified]
- Upfront, itemised prices you compare like for like before booking, with no platform fee added on top. [FAQ: compare]
- Book a slot in minutes in the app; the workshop confirms it. [FAQ: book]
- Pay securely in the app (UPI, cards, net banking); Keplix never sees your card, and the money is held until the service is complete. [FAQ: payment-methods, payment-safe]
- Track the job live: accepted, in progress, completed. [FAQ: track]
- Fair cancellation: full refund if you cancel before work starts; 100% refund if the workshop cancels or doesn't show; a dispute process if you're unhappy. [Cancellation and refund policy]
- Your car's full service history in one place, useful when selling. [FAQ: history]
- Real humans on WhatsApp, phone and email. [Contact]

## Why join Keplix (garages / workshops)
Free to join; customers who have already chosen and paid; paid out after every completed service (Keplix keeps a 10% platform fee); dedicated partner support; digital tools to manage bookings, walk-ins and payouts. [Business page, garage FAQs]

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
