/**
 * The nine service categories, with enough real content to stand as landing
 * pages.
 *
 * These exist because the site previously had no page for any individual
 * service. Someone searching "car ac gas refill price delhi" — the way people
 * actually search for this — had nothing to land on, and the homepage tried to
 * rank for all nine at once and so ranked for none.
 *
 * Price bands are indicative ranges for a hatchback/sedan in Delhi NCR, stated
 * as ranges precisely because the real number depends on the car and the
 * workshop. Keep them honest: quoting a low number the app can't deliver is
 * worse than quoting nothing.
 */

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  /** Short label for nav, cards and breadcrumbs. */
  name: string;
  /** <h1> and <title> — phrased the way people search. */
  heading: string;
  title: string;
  description: string;
  /** Opening paragraph. Plain language, no marketing padding. */
  intro: string;
  /** What the job actually involves. */
  included: string[];
  /** How to tell you need it. */
  signs: string[];
  priceFrom: number;
  priceTo: number;
  /** Typical turnaround, shown as-is. */
  duration: string;
  faqs: ServiceFaq[];
}

export const SERVICES: Service[] = [
  {
    slug: 'car-service',
    name: 'Car Service & Maintenance',
    heading: 'Car Service & Maintenance',
    title: 'Car Service at Home & Garage — Compare Prices',
    description:
      'Book a periodic car service with a verified workshop near you. Compare itemised prices for oil change, filters and a full inspection before you commit.',
    intro:
      'A periodic service is the routine maintenance your car needs at fixed intervals — usually every 10,000 km or once a year, whichever comes first. It is the single cheapest thing you can do to avoid expensive repairs later, and the one most often skipped because nobody enjoys ringing round garages for quotes.',
    included: [
      'Engine oil and oil filter replacement',
      'Air filter and cabin filter check or replacement',
      'Brake inspection, including pad thickness',
      'Coolant, brake fluid and washer fluid top-up',
      'Battery health and terminal check',
      'Tyre pressure and tread depth check',
      'Multi-point inspection with a written report',
    ],
    signs: [
      'It has been more than a year or 10,000 km since the last service',
      'The service due light is on',
      'Fuel economy has dropped noticeably',
      'The engine sounds rougher than usual at idle',
    ],
    priceFrom: 2500,
    priceTo: 7000,
    duration: '3–5 hours',
    faqs: [
      {
        question: 'How often should a car be serviced in India?',
        answer:
          'Most manufacturers specify every 10,000 km or 12 months, whichever comes first. In heavy city traffic — a lot of idling and short trips — every 8,000 km is safer, because engine oil degrades on running hours as much as on distance.',
      },
      {
        question: 'What is the difference between a general service and a full service?',
        answer:
          'A general service covers oil, filters and a safety inspection. A full service adds items on a longer interval: spark plugs, brake fluid replacement, throttle body cleaning and wheel alignment. A full service is usually due every second or third visit.',
      },
      {
        question: 'Does servicing outside the dealership void my warranty?',
        answer:
          'No. Under Indian consumer law a manufacturer cannot void your warranty simply because you serviced elsewhere, as long as the work is done properly and to schedule with the right grade of parts and oil. Keep the invoice and the service record.',
      },
    ],
  },
  {
    slug: 'car-ac-repair',
    name: 'AC Repair & Gas Refill',
    heading: 'Car AC Repair & Gas Refill',
    title: 'Car AC Repair & Gas Refill — Compare Prices',
    description:
      'Car AC not cooling? Compare prices from verified workshops for gas refill, compressor repair and cooling coil replacement. Diagnosis before you pay.',
    intro:
      'When a car AC stops cooling, the cause is usually one of three things, and they differ enormously in cost: the refrigerant has leaked out, the compressor has failed, or the condenser is blocked. A refill on a system that is leaking is money thrown away — the gas will be gone again within weeks — so insist on a leak test first.',
    included: [
      'AC performance test and vent temperature reading',
      'Leak detection across the system',
      'Refrigerant evacuation and recharge to spec',
      'Compressor and clutch inspection',
      'Condenser and cooling coil cleaning',
      'Cabin filter check',
    ],
    signs: [
      'Air blows but is not cold, or cools only while moving',
      'A rattle or knock when the AC engages',
      'A musty smell from the vents',
      'Cooling faded gradually over a season — usually a slow leak',
    ],
    priceFrom: 1500,
    priceTo: 12000,
    duration: '2–6 hours',
    faqs: [
      {
        question: 'How much does a car AC gas refill cost in India?',
        answer:
          'A straightforward refill typically runs ₹1,500–₹3,500 depending on the refrigerant your car uses — R134a is cheaper than the R1234yf used in newer cars. If a leak has to be repaired first, expect more.',
      },
      {
        question: 'How often does car AC gas need topping up?',
        answer:
          'A sealed AC system should not need topping up at all. If yours needs gas every year, it has a leak. Repeated refills without fixing the leak also lose the compressor oil that circulates with the refrigerant, which eventually destroys the compressor.',
      },
      {
        question: 'Why is my car AC cooling only when the car is moving?',
        answer:
          'Usually a failing radiator or condenser fan. At speed, airflow through the condenser is enough to shed heat; in traffic the fan has to do that work, and if it is not spinning the pressure rises and cooling stops.',
      },
    ],
  },
  {
    slug: 'car-battery-replacement',
    name: 'Battery Replacement',
    heading: 'Car Battery Replacement',
    title: 'Car Battery Replacement — Compare Prices & Book',
    description:
      'Compare prices on car batteries from verified workshops, with fitting and old-battery buyback. Testing before replacement so you only buy one if you need one.',
    intro:
      'Most car batteries last three to five years in Indian conditions — heat shortens their life considerably. A battery rarely dies without warning, though: slow cranking on a cold morning usually gives you a week or two of notice. Have it load-tested before you replace it, because a flat battery is sometimes a failing alternator instead.',
    included: [
      'Battery load test and voltage check',
      'Alternator charging-rate test',
      'Terminal and earth-strap cleaning',
      'Replacement battery fitted, matched to your car',
      'Old battery collected for buyback',
      'Warranty documentation',
    ],
    signs: [
      'The engine cranks slowly before starting',
      'Headlights dim noticeably at idle',
      'The battery warning light stays on',
      'The car needs a jump start after standing a couple of days',
    ],
    priceFrom: 3500,
    priceTo: 12000,
    duration: '30–60 minutes',
    faqs: [
      {
        question: 'How long does a car battery last in India?',
        answer:
          'Typically three to five years. Sustained high temperatures accelerate the chemical wear, so batteries in Delhi, Rajasthan or Chennai often reach the lower end of that range.',
      },
      {
        question: 'How much is the old battery worth in buyback?',
        answer:
          'Usually ₹400–₹900 depending on size and current lead prices, and it is deducted from the new battery. Always hand the old one over — lead-acid batteries are hazardous waste and should not be disposed of any other way.',
      },
      {
        question: 'Is my problem the battery or the alternator?',
        answer:
          'If a jump start gets you going and the car then dies again shortly after, it is usually the alternator not recharging. If it runs fine once started but will not start again after standing, the battery is the likelier culprit. A load test settles it in minutes.',
      },
    ],
  },
  {
    slug: 'tyre-replacement-wheel-alignment',
    name: 'Tyres & Wheel Alignment',
    heading: 'Tyre Replacement & Wheel Alignment',
    title: 'Tyre Replacement & Wheel Alignment — Compare Prices',
    description:
      'Compare tyre prices and book fitting, balancing and computerised wheel alignment with verified workshops near you.',
    intro:
      'Tyres are the only part of your car that touches the road, and alignment is what stops them wearing out early. If your car pulls to one side, or the tread is visibly more worn on one edge than the other, the alignment is out — and every kilometre driven that way is shortening the life of a set of tyres worth several thousand rupees.',
    included: [
      'Tread depth measurement across all four tyres',
      'Computerised four-wheel alignment',
      'Wheel balancing with weights',
      'Tyre fitting and valve replacement',
      'Rotation to even out wear',
      'Nitrogen or air inflation to spec',
    ],
    signs: [
      'The car pulls left or right on a straight, flat road',
      'The steering wheel sits off-centre when driving straight',
      'Uneven wear across the tread',
      'Vibration through the steering at highway speed — usually balancing',
    ],
    priceFrom: 400,
    priceTo: 20000,
    duration: '1–2 hours',
    faqs: [
      {
        question: 'How often should wheel alignment be done?',
        answer:
          'Every 10,000 km, or immediately after a significant pothole or kerb strike. Given the state of many Indian roads, checking it at every service is sensible.',
      },
      {
        question: 'When do tyres need replacing?',
        answer:
          'When tread depth reaches 1.6 mm — the legal minimum, marked by the wear indicator bars in the grooves. Also replace on age: rubber hardens and grip falls away after about five to six years, even on a tyre that looks barely used.',
      },
      {
        question: 'What is the difference between alignment and balancing?',
        answer:
          'Alignment sets the angles at which the wheels meet the road, and fixes pulling and uneven wear. Balancing corrects weight distribution around each wheel, and fixes vibration at speed. They are separate jobs and often needed together.',
      },
    ],
  },
  {
    slug: 'denting-painting',
    name: 'Denting & Painting',
    heading: 'Car Denting & Painting',
    title: 'Car Denting & Painting — Compare Prices & Book',
    description:
      'Compare prices for dent removal, panel painting and scratch repair from verified body shops. Colour-matched paint and panel-level quotes.',
    intro:
      'Body work is where quotes vary most wildly between workshops, because the same dent can be fixed three different ways. A shallow dent with the paint intact can often be pushed out without repainting at all, which costs a fraction of a full panel respray. Getting itemised, panel-by-panel quotes is the whole point of comparing.',
    included: [
      'Panel-by-panel damage assessment',
      'Dent removal, including paintless repair where possible',
      'Scratch and scuff removal',
      'Computerised colour matching to your car',
      'Primer, paint and clear coat in a booth',
      'Polishing and buffing to blend with adjacent panels',
    ],
    signs: [
      'Dents or creases from a parking knock',
      'Scratches deep enough to catch a fingernail',
      'Paint fading or clear coat peeling on the roof or bonnet',
      'Rust starting around a chip or an old repair',
    ],
    priceFrom: 1500,
    priceTo: 25000,
    duration: '1–4 days',
    faqs: [
      {
        question: 'How much does it cost to repaint one panel?',
        answer:
          'Typically ₹3,000–₹7,000 per panel for a standard colour. Pearl, matte and multi-coat finishes cost more because they need more layers and are far harder to match.',
      },
      {
        question: 'Will the new paint match the rest of the car?',
        answer:
          'A good body shop scans the existing panel rather than going by the factory colour code, because paint fades with sun exposure over the years. They then blend into the adjoining panels so the transition is not visible.',
      },
      {
        question: 'Should I claim insurance for a small dent?',
        answer:
          'Often not. If the repair costs less than your no-claim bonus is worth, paying directly is cheaper overall. Compare the repair quote against what claiming would cost you in lost NCB at renewal.',
      },
    ],
  },
  {
    slug: 'car-wash-detailing',
    name: 'Car Wash & Detailing',
    heading: 'Car Wash & Detailing',
    title: 'Car Wash & Detailing — Compare Prices & Book',
    description:
      'Book a foam wash, interior deep clean, ceramic coating or full detailing with verified studios near you. Compare prices before booking.',
    intro:
      'Detailing is not just an expensive wash. It is paint correction — machine polishing away the fine swirl marks that dull the finish — followed by a protective layer that keeps it that way. Worth knowing what you are buying: a wash is upkeep, a coating is protection, and only paint correction actually restores gloss.',
    included: [
      'Foam wash and underbody rinse',
      'Interior vacuum and dashboard cleaning',
      'Seat and upholstery shampoo',
      'Machine polishing and paint correction',
      'Ceramic or Teflon coating',
      'Tyre dressing and glass polishing',
    ],
    signs: [
      'Paint looks dull or shows swirl marks in direct sun',
      'Water no longer beads on the surface',
      'Interior smells musty or the AC has an odour',
      'Preparing the car for sale',
    ],
    priceFrom: 500,
    priceTo: 25000,
    duration: '2 hours – 2 days',
    faqs: [
      {
        question: 'How long does ceramic coating last?',
        answer:
          'A properly applied coating lasts two to five years depending on the product and how the car is stored and washed. Claims of ten years are marketing; no consumer coating survives Indian sun and dust that long.',
      },
      {
        question: 'Is ceramic coating worth the money?',
        answer:
          'It makes washing far easier and protects against UV fading and light chemical etching. It does not prevent scratches or dents. If the car lives outdoors, the UV protection alone usually justifies it.',
      },
      {
        question: 'How often should a car be washed?',
        answer:
          'Every one to two weeks in normal use. More often if it is parked under trees or near construction — bird droppings and cement dust are both alkaline and will etch clear coat within days in the heat.',
      },
    ],
  },
  {
    slug: 'breakdown-assistance',
    name: 'Breakdown Assistance',
    heading: 'Roadside Breakdown Assistance',
    title: 'Roadside Breakdown Assistance — Book Help Nearby',
    description:
      'Stranded? Find verified workshops offering jump starts, flat tyre help, towing and on-the-spot repairs near you.',
    intro:
      'Most breakdowns are one of a handful of things: a flat battery, a puncture, running dry, or overheating. Several are fixable at the roadside in under an hour if the right person turns up with the right kit. The rest need a tow — and knowing which is which before anyone arrives saves both time and an argument about the bill.',
    included: [
      'Jump start for a flat battery',
      'Flat tyre change or on-site puncture repair',
      'Emergency fuel delivery',
      'Lockout assistance',
      'Minor on-the-spot mechanical repairs',
      'Towing to the nearest workshop',
    ],
    signs: [
      'Car will not start and the battery seems flat',
      'Puncture with no spare or no tools',
      'Temperature gauge in the red',
      'Warning light plus a loss of power',
    ],
    priceFrom: 500,
    priceTo: 5000,
    duration: '30–90 minutes to reach you',
    faqs: [
      {
        question: 'What should I do first when the car breaks down?',
        answer:
          'Get the car off the carriageway if it still moves, switch on the hazard lights, and place the warning triangle well behind the car — further than feels necessary on a highway. Then get yourself and any passengers out and away from the traffic side before calling anyone.',
      },
      {
        question: 'Can I keep driving if the engine is overheating?',
        answer:
          'No. Stop as soon as it is safe and let it cool. Continuing to drive an overheating engine can warp the cylinder head — a repair that costs many times what a tow would have. Do not open the radiator cap while it is hot.',
      },
      {
        question: 'How much does towing cost?',
        answer:
          'Usually ₹1,500–₹4,000 within a city depending on distance and whether a flatbed is needed. Check first whether your insurance policy or manufacturer warranty already includes roadside assistance — many do, and people forget.',
      },
    ],
  },
  {
    slug: 'car-accessories-fitting',
    name: 'Accessories Fitting',
    heading: 'Car Accessories & Fitting',
    title: 'Car Accessories & Fitting — Compare Prices',
    description:
      'Book professional fitting for infotainment systems, reverse cameras, seat covers, dashcams and lighting with verified workshops.',
    intro:
      'Accessories are worth having fitted properly, particularly anything electrical. Badly wired accessories are one of the most common causes of mysterious battery drain and, occasionally, of wiring fires — a dashcam spliced into the wrong circuit will happily flatten your battery over a long weekend.',
    included: [
      'Infotainment and speaker installation',
      'Reverse camera and parking sensors',
      'Dashcam fitting with concealed wiring',
      'Seat covers and floor mats',
      'Auxiliary and fog lamp fitting',
      'Body kits, spoilers and cosmetic trim',
    ],
    signs: [
      'You want features your car did not come with',
      'The factory head unit lacks Android Auto or CarPlay',
      'Parking visibility is poor',
      'You want dashcam footage for insurance claims',
    ],
    priceFrom: 500,
    priceTo: 30000,
    duration: '1–5 hours',
    faqs: [
      {
        question: 'Will fitting accessories affect my warranty?',
        answer:
          'Only the parts affected by the work. A manufacturer can decline a claim for damage caused by a badly wired accessory, but cannot void the whole warranty over a set of seat covers. Electrical work is where care matters most.',
      },
      {
        question: 'Are aftermarket infotainment systems reliable?',
        answer:
          'Quality varies widely. Look for a unit with a proper canbus adapter for your specific model so the steering controls and reverse camera keep working, and expect to pay for it — the cheapest units tend to fail on exactly those integrations.',
      },
      {
        question: 'Which accessories are not legal in India?',
        answer:
          'Pressure horns, very dark window film, and coloured or excessively bright auxiliary lights all attract fines. Structural body modifications need approval. A reputable workshop will tell you before fitting rather than after.',
      },
    ],
  },
  {
    slug: 'brake-repair',
    name: 'Brake Repair',
    heading: 'Brake Pad & Disc Replacement',
    title: 'Brake Repair & Pad Replacement — Compare Prices',
    description:
      'Compare prices for brake pad replacement, disc skimming and brake fluid change with verified workshops. Inspection before any work.',
    intro:
      'Brakes wear gradually, which is exactly what makes them easy to ignore. Pads are inexpensive; letting them wear down to the metal backing is not, because the disc gets scored and has to be skimmed or replaced too. A squeal is a warning built into the pad on purpose — it means book now, not eventually.',
    included: [
      'Pad thickness measurement on all wheels',
      'Disc and drum inspection for scoring and warping',
      'Brake pad or shoe replacement',
      'Disc skimming or replacement where needed',
      'Brake fluid check and bleed',
      'Handbrake adjustment and road test',
    ],
    signs: [
      'A squeal or grinding noise when braking',
      'The pedal feels soft or travels further than it used to',
      'The car pulls to one side under braking',
      'Vibration through the pedal when slowing from speed',
    ],
    priceFrom: 2000,
    priceTo: 15000,
    duration: '2–4 hours',
    faqs: [
      {
        question: 'How long do brake pads last?',
        answer:
          'Typically 30,000–50,000 km, but city driving with constant stop-start traffic wears them much faster — 20,000 km is common in dense traffic. Rear pads usually last considerably longer than front.',
      },
      {
        question: 'Why do my brakes squeal?',
        answer:
          'Most often the wear indicator — a small metal tab designed to contact the disc and squeal when the pad gets thin. It can also be dust or glazing after light use. A grinding noise, as opposed to a squeal, means the pad is gone and the disc is being damaged right now.',
      },
      {
        question: 'How often should brake fluid be changed?',
        answer:
          'Every two years, regardless of distance. Brake fluid absorbs moisture from the air over time, which lowers its boiling point — that is what causes brake fade on a long descent or after repeated hard stops.',
      },
    ],
  },
];

export const serviceBySlug = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);

export const formatPrice = (n: number): string => `₹${n.toLocaleString('en-IN')}`;
