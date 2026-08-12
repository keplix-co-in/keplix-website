/**
 * FAQ content, as data.
 *
 * Single source of truth for both the rendered page and the FAQPage JSON-LD.
 * Keeping them as one array is the point: schema that drifts from the visible
 * answer is worse than no schema, and Google treats a mismatch as a violation.
 *
 * `answer` is plain text so it can go straight into the structured data.
 * Anything needing a link goes in the page's `extra` map instead, which is
 * rendered after the answer but deliberately left out of the schema.
 */

export interface Faq {
  /** Stable id, used to attach optional JSX extras on the page. */
  id: string;
  question: string;
  answer: string;
}

export const CUSTOMER_FAQS: Faq[] = [
  {
    id: 'book',
    question: 'How do I book a car service on Keplix?',
    answer:
      'Open the Keplix app and tell us what your car needs. You will see verified workshops near you with their prices and ratings. Pick one, choose a date and time slot, and confirm. You get a booking confirmation straight away, and the workshop confirms the slot from their side.',
  },
  {
    id: 'compare',
    question: 'Can I compare car service prices before booking?',
    answer:
      'Yes — that is the point of Keplix. Every workshop shows an itemised price for the service you selected, so you can compare like for like rather than guessing. There are no platform fees added on top of the price you see.',
  },
  {
    id: 'payment-methods',
    question: 'What payment methods can I use?',
    answer:
      'Payments are handled through our payment gateway and support UPI, debit and credit cards, and net banking. You pay through the app when you book, so there is nothing to settle at the counter.',
  },
  {
    id: 'payment-safe',
    question: 'Is my payment safe on Keplix?',
    answer:
      'Yes. Card and UPI details are entered directly into the payment gateway’s own secure checkout, so Keplix never sees or stores your card number. Your money is held until the service is complete, which is also what lets us refund you cleanly if something goes wrong.',
  },
  {
    id: 'cancel',
    question: 'Can I cancel or reschedule a booking?',
    answer:
      'Yes, from the My Bookings section of the app. Cancel more than 24 hours before your slot for a full refund; inside 24 hours a partial refund applies. Rescheduling to another available slot with the same workshop is free.',
  },
  {
    id: 'refund-time',
    question: 'How long does a refund take?',
    answer:
      'Refunds go back to your original payment method and usually arrive within 5 to 7 working days, depending on your bank. You get a confirmation with a reference number as soon as the refund is initiated.',
  },
  {
    id: 'track',
    question: 'Can I track my car service while it is happening?',
    answer:
      'Yes. You can follow your booking through each stage — accepted, in progress and completed — from within the app, so you are not left wondering whether your car has even been looked at yet.',
  },
  {
    id: 'unhappy',
    question: 'What if I am not happy with the work?',
    answer:
      'Raise a dispute in the app within 7 days of the service, with photos if you have them. We acknowledge every dispute within 48 hours. Depending on what we find, the resolution may be a free rework, a partial refund or a full refund.',
  },
  {
    id: 'verified',
    question: 'Are the workshops on Keplix verified?',
    answer:
      'Every partner workshop is checked before it can accept bookings, and we track ratings and reviews from real completed services afterwards. Workshops that fall below our standards are removed from the platform.',
  },
  {
    id: 'history',
    question: 'Does Keplix keep a record of my car’s service history?',
    answer:
      'Yes. Every service booked through Keplix is stored against your vehicle, so you have a complete history in one place. It is genuinely useful when you come to sell the car.',
  },
  {
    id: 'cities',
    question: 'Which cities is Keplix available in?',
    answer:
      'We are rolling out city by city, starting with Delhi NCR and expanding across India. The app shows the workshops currently available near you.',
  },
  {
    id: 'app',
    question: 'Do I need the app, or can I book from the website?',
    answer:
      'Booking happens in the Keplix app, which is also where you track your service and keep your vehicle records. The Android app is available on the Play Store and an iOS version is on the way.',
  },
];

export const GARAGE_FAQS: Faq[] = [
  {
    id: 'join',
    question: 'How do I join Keplix as a workshop?',
    answer:
      'Download the Keplix Garage Partner app or register your interest through our Workshops page. You will be asked for your business details, documents and payout information, and our team verifies everything before your listing goes live.',
  },
  {
    id: 'cost',
    question: 'What does it cost to join Keplix as a garage?',
    answer:
      'Joining Keplix is free, and we do not take a commission on your bookings. You keep what you charge.',
  },
  {
    id: 'payouts',
    question: 'How and when do garages get paid?',
    answer:
      'Customers pay through the app when they book. Once the service is completed and confirmed, your earnings are released and transferred to the bank account you registered during onboarding. You can see every booking, its status and your earnings in the partner app.',
  },
  {
    id: 'verification',
    question: 'What do I need to provide during verification?',
    answer:
      'Your business registration details, proof of address for the workshop, owner identification, and the bank account or UPI ID you want to be paid into. Getting the payout details right matters — an incorrect account number will hold up your payments.',
  },
  {
    id: 'accept',
    question: 'Can a garage choose which bookings to accept?',
    answer:
      'Yes. Booking requests come through the partner app and you accept or decline each one. You also control your working hours and availability, so you only receive requests for slots you can actually take.',
  },
  {
    id: 'support',
    question: 'Who do partner garages contact for support?',
    answer:
      'Partner support is available by email and phone, and every partner has a point of contact for booking or payout issues.',
  },
];

export const ALL_FAQS: Faq[] = [...CUSTOMER_FAQS, ...GARAGE_FAQS];
