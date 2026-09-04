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

/**
 * A prose section of the page body.
 *
 * These exist because the service pages were roughly 350 words of unique text
 * each -- an intro paragraph and two bullet lists. That is thin by any measure,
 * and it is the specific thing Google's AdSense review flagged as "low value
 * content". Bullets alone cannot explain *why* a job costs what it costs or how
 * to tell a fair quote from a bad one, which is the only reason someone
 * comparing workshops would read the page at all.
 */
export interface ServiceSection {
  heading: string;
  /** Paragraphs, rendered in order. Kept as an array so each stays readable. */
  body: string[];
}

/**
 * One row of the itemised cost breakdown.
 *
 * The whole product promise is "see itemised prices before you commit", so the
 * marketing site should show the same breakdown rather than a single vague
 * range. `note` carries the part that actually helps -- what moves the number.
 */
export interface PriceRow {
  item: string;
  range: string;
  note: string;
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
  /** Long-form body. Rendered between the lists and the FAQs. */
  sections: ServiceSection[];
  /** Itemised cost breakdown, rendered as a table. */
  priceTable: PriceRow[];
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
    sections: [
      {
        heading: 'What a periodic service actually covers',
        body: [
          'Periodic service, general service, full service: workshops use these terms loosely and rarely mean the same thing by them. In practice a periodic service is a fixed list of consumables replaced on a schedule, plus an inspection of the parts that wear out gradually. The consumables are engine oil and the oil filter, usually alongside the air and cabin filters. The inspection covers brakes, suspension, belts, hoses, battery and tyres.',
          'What separates a real service from a quick oil change is the inspection and the report that comes out of it. A workshop that hands the car back with nothing but a bill has not told you what it found. You should get written numbers: brake pad thickness in millimetres, tyre tread depth, battery voltage, and any fluid that was topped up. Those figures are what tell you whether the next six months are quiet or expensive.',
          'Anything beyond that list is a repair, not a service, and it should appear as a separate line you approved before the work started. This is the single most common place a bill inflates. A quoted service of ₹3,000 becomes ₹9,000 because brake pads, a timing belt and a coolant flush were folded in without a phone call.',
        ],
      },
      {
        heading: 'How to read a service quote',
        body: [
          'A quote worth trusting separates parts from labour. If you are handed one number for the whole job, ask for the split. Parts are verifiable against market prices; labour is where padding hides, because an hour of workshop time is whatever the workshop says it is.',
          'For engine oil specifically, ask three things: the brand, the grade, and the quantity in litres. Grade is printed in your owner manual as something like 5W-30 or 0W-20, and it is not a matter of preference. Quantity matters just as much, because most cars take between three and five litres, and being billed for five when the engine holds three and a half is a quiet few hundred rupees.',
          'On parts you will hear three words. Genuine means the carmaker box at the carmaker price. OEM means the same component from the same factory in the supplier box, typically 20 to 40 percent cheaper. Aftermarket covers everything else and ranges from excellent to worthless. For filters and consumables, good OEM is the sensible middle. For anything safety-critical, pay for known quality.',
        ],
      },
      {
        heading: 'Why the same service costs different amounts',
        body: [
          'Engine size is the first reason. Oil capacity scales with the engine, so a 1.2-litre hatchback might take three litres while a 2.2-litre diesel SUV takes six. That difference alone can be a couple of thousand rupees before anyone has touched a filter.',
          'Fuel type is the second. Diesel engines run dirtier and work their oil harder, so intervals are shorter and diesel-specific parts such as the fuel filter cost more to replace. A diesel car costs meaningfully more to maintain across its life, which is worth knowing before you buy one.',
          'The third is simply who is doing the work. An authorised dealership carries higher overheads and charges accordingly. A competent independent workshop typically comes in 30 to 50 percent lower on the identical job with the identical parts. Neither is automatically the right answer, but you should know which one you are paying for.',
        ],
      },
      {
        heading: 'Signs the workshop is padding the bill',
        body: [
          'Watch for urgency applied to things that are not urgent. Brake pads at 4mm need watching, not replacing today. A slightly weeping shock absorber is a note for the next service. If everything discovered is simultaneously critical, treat the whole list sceptically.',
          'Ask for the old parts back. It is a completely normal request, it costs the workshop nothing, and it is the cleanest way to confirm a part was actually replaced. A workshop that refuses, or produces a part that plainly does not match your car, has answered your real question.',
          'Finally, insist on being called before any work outside the agreed quote. This one habit prevents most billing disputes, because it turns a surprise at collection time into a decision you made with the number in front of you.',
        ],
      },
    ],
    priceTable: [
      { item: 'Engine oil (3-5 litres)', range: '₹1,400 - ₹3,600', note: 'Quantity scales with engine size; fully synthetic costs roughly double semi-synthetic.' },
      { item: 'Oil filter', range: '₹250 - ₹700', note: 'Always replaced with the oil. Keeping the old one contaminates the fresh oil immediately.' },
      { item: 'Air filter', range: '₹350 - ₹1,100', note: 'Cleaned rather than replaced on alternate services, unless you drive on dusty roads.' },
      { item: 'Cabin / AC filter', range: '₹400 - ₹1,400', note: 'Skippable on a newer car; overdue if the AC smells musty on start-up.' },
      { item: 'Fuel filter (diesel)', range: '₹900 - ₹2,600', note: 'Diesel only, and typically every second service rather than every one.' },
      { item: 'Labour', range: '₹700 - ₹2,000', note: 'Dealerships sit at the top of this band, independent workshops near the bottom.' },
    ],
    faqs: [
      {
        question: 'Can I supply my own oil and parts?',
        answer:
          'Many independent workshops will fit parts you supply, though most charge full labour and will not warranty a component they did not source. Dealerships almost never allow it. If you do supply your own, keep the purchase invoice: it is the only proof of grade and authenticity if the part later fails.',
      },
      {
        question: 'Is fully synthetic oil worth the extra cost?',
        answer:
          'It is if your manual specifies it, in which case it is not really optional. If your car is older and calls for semi-synthetic, fully synthetic buys slightly better cold-start protection and a longer safe interval, but not enough to justify the cost on a low-mileage city car. Follow the manual rather than the upsell.',
      },
      {
        question: 'What actually happens if I skip a service?',
        answer:
          'Nothing, briefly, which is exactly why it is easy to keep skipping. Oil degrades and stops carrying heat and debris away, so wear accelerates quietly. The failures that follow are gradual rather than dramatic, surfacing as poorer mileage, rough idling and eventually a repair costing many times the service you avoided.',
      },
      {
        question: 'Do I need a service if the car has barely been driven?',
        answer:
          'Yes. Oil ages by time as well as by distance, and a car that mostly sits is arguably harder on oil than one driven regularly, because short trips never get the engine hot enough to burn off condensation. Service it annually regardless of what the odometer says.',
      },
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
    sections: [
      {
        heading: 'Why car AC stops cooling',
        body: [
          'Car air conditioning is a sealed loop. Refrigerant is compressed, cooled into a liquid in the condenser at the front of the car, then allowed to expand inside the cabin where it absorbs heat. Nothing in that loop is consumed. A system that has lost gas has lost it through a leak, and the leak is the actual fault.',
          'That single fact explains most of the money wasted on car AC in India. A refill makes the cold air come back, so it feels like a repair. But if the gas escaped once it will escape again, usually within a few months, and the second refill costs exactly as much as the first. Two or three refills add up to more than finding and fixing the leak would have.',
          'Common leak points are the condenser, which sits behind the front grille and takes stone damage; the rubber O-rings at pipe joints, which harden with age; and the compressor shaft seal. A workshop that offers a refill without offering a leak test is selling you a symptom fix and knows it.',
        ],
      },
      {
        heading: 'Gas refill is not always the answer',
        body: [
          'Before agreeing to anything, ask for the readings. A technician should connect a manifold gauge set and tell you the high-side and low-side pressures. Those two numbers narrow the fault considerably: low on both sides points to lost refrigerant, high on both suggests overcharging or a blocked condenser, and a wide split points at a blockage in the expansion valve.',
          'If the diagnosis is a leak, the honest method is a dye test or an electronic sniffer. Dye is cheap: it goes in with the gas, the system runs for a few days, and the leak shows up under UV light as a bright stain. It costs a few hundred rupees and it turns guesswork into evidence.',
          'Be wary of the phrase top-up. Automotive AC is not designed to be topped up like tyre pressure. Correct practice is to evacuate the system completely, pull a vacuum to boil off any moisture, then charge the exact weight of refrigerant the manufacturer specifies, which is printed on a sticker under the bonnet. Adding gas on top of an unknown quantity is how systems end up overcharged, which cools badly and strains the compressor.',
        ],
      },
      {
        heading: 'What a proper AC job includes',
        body: [
          'A complete service should cover: recovery of the existing refrigerant, a vacuum hold test to prove the system is sealed, replacement of the receiver-drier or accumulator if the system has been open to air, a measured recharge by weight, and a temperature reading at the centre vent afterwards.',
          'That last step is the one to insist on. A healthy system should deliver air roughly 8 to 12 degrees Celsius below ambient at the vent, measured with the engine warm and the blower on maximum. Without a number, cold is just an opinion, and a marginal system that will fail again in six weeks feels fine on a short test drive.',
          'The cabin filter deserves a mention here because it is cheap and routinely ignored. A clogged filter chokes airflow, which makes a perfectly healthy system feel weak, and it is the usual reason an AC smells of damp socks. Replacing it costs a fraction of any actual AC repair and is worth ruling out first.',
        ],
      },
      {
        heading: 'Reading an AC quote',
        body: [
          'AC is the service where quotes vary most wildly, because the failure modes range from a ₹400 filter to a ₹20,000 compressor. Insist that the quote names the specific part being replaced and why. Compressor is not a diagnosis; a seized clutch, a failed bearing, or low system pressure that starved it of oil are diagnoses.',
          'If a compressor replacement is proposed, ask what killed it. Compressors rarely fail without a reason, and if the underlying cause is debris in the lines, a new compressor fitted into a dirty system will fail the same way. A proper job in that case includes flushing the lines and replacing the expansion valve and drier, which is why the good quote is sometimes the more expensive one.',
          'Finally, ask whether the refrigerant is R134a or R1234yf. Most cars in India use R134a, but newer models increasingly use R1234yf, which costs several times more per kilogram. Being quoted R134a prices and charged R1234yf prices, or worse, having the wrong gas put in, is a genuine risk worth one question.',
        ],
      },
    ],
    priceTable: [
      { item: 'AC gas recharge (R134a)', range: '₹1,500 - ₹3,000', note: 'Includes evacuation and a measured refill. R1234yf on newer cars costs considerably more.' },
      { item: 'Leak test (dye or sniffer)', range: '₹500 - ₹1,200', note: 'Worth paying for every time. Without it, a refill is a guess with an expiry date.' },
      { item: 'Cabin / AC filter', range: '₹400 - ₹1,400', note: 'The cheapest possible cause of weak airflow. Rule it out before anything else.' },
      { item: 'Condenser', range: '₹3,500 - ₹9,000', note: 'Sits behind the grille, so stone damage and corrosion are the usual killers.' },
      { item: 'Cooling coil / evaporator', range: '₹4,000 - ₹11,000', note: 'Buried in the dashboard, so labour often exceeds the cost of the part.' },
      { item: 'Compressor', range: '₹9,000 - ₹22,000', note: 'The one job that exceeds the usual band. Always ask what caused the failure.' },
    ],
    faqs: [
      {
        question: 'Why does my AC smell bad when I switch it on?',
        answer:
          'Almost always the cabin filter and the evaporator behind it. Condensation collects there and, in a humid climate, grows mould. Replacing the filter fixes the mild cases; a persistent smell needs an evaporator clean with an antibacterial foam. It is unpleasant rather than dangerous, and it is cheap to sort out.',
      },
      {
        question: 'Is it normal for the car to feel slower with the AC on?',
        answer:
          'Yes. The compressor is driven by the engine and consumes real power, so a small-engined car will feel noticeably less eager with the AC running, and fuel consumption rises. What is not normal is stalling, a loud rattle when the AC engages, or the temperature gauge climbing, all of which point to a fault.',
      },
      {
        question: 'How often does AC gas actually need topping up?',
        answer:
          'In a properly sealed system, never. Manufacturers do not specify a refill interval because refrigerant is not a consumable. Slow permeation through the hoses over many years is real but marginal. If you are refilling every season, you have a leak that nobody has bothered to look for.',
      },
      {
        question: 'Can I run the AC in winter?',
        answer:
          'It is a good idea. Running it for ten minutes every couple of weeks keeps the compressor seals lubricated and stops them drying out, which is a common cause of leaks in cars that only use AC for six months of the year. It also clears a fogged windscreen far faster than heat alone.',
      },
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
    sections: [
      {
        heading: 'Telling a dying battery from a dying alternator',
        body: [
          'These two faults feel almost identical from the driver seat, and replacing the wrong one is a common and expensive mistake. The distinction is simple: the battery starts the car, the alternator keeps it running and recharges the battery. If the car starts fine but dies while driving, suspect the alternator. If it struggles to start but runs normally once going, suspect the battery.',
          'The test takes two minutes with a multimeter. With the engine off, a healthy battery reads about 12.6 volts. Below 12.4 it is partly discharged; below 12.0 it is flat. Now start the engine and read again: with the alternator working you should see 13.7 to 14.7 volts. If that number stays around 12, the alternator is not charging, and a new battery will simply be flattened by the same fault.',
          'A jump start that works, followed by the car dying again shortly afterwards, is the classic alternator signature. So is a battery warning light that appears while driving rather than at start-up, and headlights that dim noticeably at idle then brighten when you rev.',
        ],
      },
      {
        heading: 'What battery your car actually needs',
        body: [
          'Three numbers define a battery. Capacity in amp-hours (Ah) is how much charge it holds. Cold cranking amps (CCA) is how hard it can push to turn the engine over. Group size is the physical dimensions and terminal layout, which determines whether it will fit the tray and reach the cables at all.',
          'The safe default is to match what the manufacturer fitted, which is printed on the label of the battery currently in the car. Going up modestly in amp-hours is generally harmless and buys a little more reserve. Going down is a false economy that shortens life, because a smaller battery is worked harder on every start.',
          'One genuine exception matters: cars with automatic start-stop need an AGM or EFB battery, not a conventional flooded one. Start-stop cycles the battery far more aggressively than normal driving, and a standard battery in that role typically fails within a year. If your car switches its engine off at traffic lights, this applies to you, and it costs more.',
        ],
      },
      {
        heading: 'Warranty, and what pro-rata really means',
        body: [
          'Battery warranties are usually quoted as something like 24 plus 24 months, and the two halves are very different. The first number is the full replacement period: fail inside it and you get a new battery at no cost. The second is pro-rata, meaning you get a discount on a replacement scaled to how much of the term has elapsed.',
          'A pro-rata claim at month 40 of a 24 plus 24 warranty is worth much less than people expect, often a third or less of the new price. It is not worthless, but it should not be the reason you pay a premium for a longer headline number. A 24-month full replacement term beats a 12 plus 48 on almost any realistic arithmetic.',
          'Keep the original invoice, and make sure the fitting date is marked on the battery label, which most retailers do with a punch or a sticker. Claims are refused for missing proof of purchase far more often than for any technical reason.',
        ],
      },
      {
        heading: 'What a proper replacement includes',
        body: [
          'The physical swap takes about fifteen minutes, but a few details separate a good job from a lazy one. Terminals and clamps should be cleaned of corrosion, because a bad connection mimics a bad battery. The hold-down bracket must be refitted, since a battery sliding around its tray is both a short-circuit risk and a way to crack the case.',
          'The charging system should be tested after fitting, for the reason described above: if the alternator was the real fault, you want to discover that now rather than in a fortnight. Any workshop replacing a battery has the meter in hand already, so there is no excuse for skipping it.',
          'Finally, the old battery has real scrap value, generally between ₹500 and ₹1,500 depending on size. That should appear on your invoice as a buyback credit. If nobody mentions it, ask, because a battery quietly kept and sold on is money that was yours.',
        ],
      },
    ],
    priceTable: [
      { item: 'Hatchback battery (35-45 Ah)', range: '₹3,500 - ₹6,000', note: 'Small petrol cars. The mainstream Indian brands occupy most of this band.' },
      { item: 'Sedan battery (45-65 Ah)', range: '₹5,000 - ₹8,500', note: 'Larger petrol and small diesel engines need more cranking power.' },
      { item: 'SUV / diesel battery (65-80 Ah)', range: '₹7,000 - ₹12,000', note: 'Diesel engines need substantially higher cold cranking amps to turn over.' },
      { item: 'AGM / EFB (start-stop cars)', range: '₹9,000 - ₹18,000', note: 'Required, not optional, if your car has automatic start-stop.' },
      { item: 'Terminal cleaning and clamps', range: '₹150 - ₹600', note: 'Corroded terminals imitate a failing battery. Cheap to rule out first.' },
      { item: 'Old battery buyback', range: 'minus ₹500 - ₹1,500', note: 'A credit, not a charge. It should appear on your invoice.' },
    ],
    faqs: [
      {
        question: 'Does jump starting damage the battery?',
        answer:
          'Done correctly, no. The risks are procedural rather than inherent: reversed polarity can destroy electronics in both cars, and connecting the final negative lead to the flat battery rather than to an unpainted engine earth point can ignite the hydrogen a charging battery gives off. Follow the sequence and it is safe.',
      },
      {
        question: 'How long can a car sit before the battery goes flat?',
        answer:
          'Two to four weeks for a healthy battery in a modern car. Alarms, immobilisers and keyless-entry receivers draw a small current constantly. If you are leaving it longer, either disconnect the negative terminal or fit a trickle charger. Repeatedly draining a battery flat permanently reduces its capacity.',
      },
      {
        question: 'Can I fit a bigger battery than the original?',
        answer:
          'A modest step up in amp-hours is fine and gives you more reserve, provided it physically fits the tray and the terminals sit on the correct sides. What you cannot do is compensate for a charging fault with a bigger battery, and a much larger unit may not fully recharge on short journeys, which shortens its life rather than extending it.',
      },
      {
        question: 'Is a more expensive brand actually worth it?',
        answer:
          'Within the established brands the difference is smaller than the price gap suggests, and warranty terms matter more than the badge. What is worth avoiding is an unbranded battery with no traceable warranty, because the whole value of a warranty is being able to claim on it. Check the manufacturing date too: batteries deteriorate on the shelf, and anything more than about six months old is stock nobody wanted.',
      },
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
    sections: [
      {
        heading: 'Reading the numbers on your tyre',
        body: [
          'Every tyre carries its specification on the sidewall, in a format like 185/65 R15 88H. The first number is the width in millimetres. The second is the aspect ratio, meaning the sidewall height as a percentage of that width. R means radial construction, and 15 is the wheel diameter in inches. The final pair is the load index and speed rating.',
          'Those last two are the ones people ignore and should not. The load index is the maximum weight the tyre can carry, and the speed rating is the maximum speed it is built to sustain. Fitting a tyre with a lower rating than the manufacturer specified is both a safety problem and, in the event of a claim, potentially an insurance one. Going higher is harmless but rarely worth paying for.',
          'You will also find a four-digit date code, usually inside an oval, reading something like 2224. That means the twenty-second week of 2024. Rubber ages whether or not it is used, and a tyre more than five or six years old should be treated with suspicion no matter how much tread remains. Always check this on tyres sold as new: old stock is common and heavily discounted for a reason.',
        ],
      },
      {
        heading: 'When tyres genuinely need replacing',
        body: [
          'The legal minimum tread depth in India is 1.6mm, and every tyre has moulded wear indicators sitting at exactly that height in the main grooves. When the tread wears flush with those bars, the tyre is finished. In practice, wet grip degrades sharply below about 3mm, so replacing at 2 to 3mm is the sensible call rather than running to the legal limit.',
          'Tread depth is not the only reason to replace. Sidewall bulges mean the internal structure has failed, usually from a pothole impact, and that tyre can burst without warning. Cracking between the tread blocks indicates age hardening. Any of these justify replacement regardless of how much tread is left.',
          'Uneven wear is a diagnosis rather than a verdict. Wear on both outer edges means chronic underinflation. Wear in the centre strip means overinflation. Wear on one edge only points to an alignment problem, and feathered edges you can feel by running a hand across the tread usually mean a toe setting that is out. Replacing tyres without fixing the cause simply consumes the new set the same way.',
        ],
      },
      {
        heading: 'Alignment, balancing and rotation are three different jobs',
        body: [
          'These get conflated constantly, and workshops are not always careful about explaining the difference. Wheel alignment adjusts the angles at which the wheels meet the road, principally toe, camber and caster. It is what stops the car pulling to one side and what prevents tyres scrubbing themselves away at the edges.',
          'Wheel balancing is about weight distribution around the rim. Small lead or adhesive weights are added to counteract heavy spots. Imbalance shows up as a vibration through the steering wheel at a particular speed, typically 80 to 100 km/h, and it gets worse the faster you go. Balancing is done every time a tyre is fitted, and again if a weight is thrown.',
          'Rotation is simply moving the tyres between positions to even out wear, because front tyres on most cars wear faster than rear ones. Doing it every 10,000 km or so meaningfully extends the life of a set. None of these three substitutes for the others, and a workshop that responds to a vibration complaint by doing an alignment has not addressed it.',
        ],
      },
      {
        heading: 'Buying tyres without overpaying',
        body: [
          'Tyre pricing is unusually opaque because the same size spans a wide quality range. A budget tyre and a premium one in 185/65 R15 can differ by a factor of two. The difference is real and shows up mostly in wet braking distance and tread life, but the premium is not always worth it on a car that does 8,000 city kilometres a year.',
          'What is worth insisting on is replacing in pairs at minimum, fitted on the same axle. Mixing tyres of substantially different tread depth or grip across an axle affects braking stability. Fitting a single new tyre alongside a worn one is acceptable only as a temporary measure.',
          'Check what the quoted price includes. Fitting, balancing, a new valve and disposal of the old tyre should all be part of it. Being quoted a low per-tyre price and then charged separately for each of those is a common way to make a number look competitive when it is not.',
        ],
      },
    ],
    priceTable: [
      { item: 'Tyre, hatchback (13-14 inch)', range: '₹3,000 - ₹6,000', note: 'Per tyre. Budget and premium brands differ by roughly double in the same size.' },
      { item: 'Tyre, sedan (15-16 inch)', range: '₹4,500 - ₹9,000', note: 'Per tyre. Larger diameters and lower profiles cost disproportionately more.' },
      { item: 'Tyre, SUV (17-19 inch)', range: '₹8,000 - ₹20,000', note: 'Per tyre. This is where a full set becomes a significant expense.' },
      { item: 'Wheel alignment', range: '₹400 - ₹1,200', note: 'Four-wheel alignment costs more than two-wheel and is what most modern cars need.' },
      { item: 'Wheel balancing', range: '₹100 - ₹300', note: 'Per wheel. Should be included free when you buy tyres from the same workshop.' },
      { item: 'Tyre rotation', range: '₹200 - ₹600', note: 'For all four. Cheap, routinely skipped, and it measurably extends tread life.' },
    ],
    faqs: [
      {
        question: 'How often should I check tyre pressure?',
        answer:
          'Every two weeks, and always before a long drive. Check when the tyres are cold, because pressure rises as they heat up and a reading taken after an hour of driving will be misleadingly high. The correct figure is on a sticker inside the driver door frame or in the manual, not on the tyre sidewall, which shows the maximum rather than the recommended pressure.',
      },
      {
        question: 'Is nitrogen in tyres actually better than air?',
        answer:
          'Marginally, and less than the marketing suggests. Nitrogen molecules diffuse through rubber slightly more slowly, so pressure stays stable a little longer, and it carries no moisture. But ordinary air is already 78 percent nitrogen. If it is free, take it; if it costs meaningfully more, checking your pressure regularly achieves more for nothing.',
      },
      {
        question: 'Do I need to replace all four tyres at once?',
        answer:
          'Not necessarily on a front-wheel-drive car, where replacing in pairs on the same axle is fine, with the newer pair conventionally fitted at the rear for stability. Full-time all-wheel-drive cars are the exception: significant differences in rolling circumference between wheels can damage the centre differential, so those generally do need all four replaced together.',
      },
      {
        question: 'What causes a car to pull to one side?',
        answer:
          'Alignment is the usual answer, but check tyre pressures first because an underinflated tyre on one side produces exactly the same symptom for free. If pressures are equal and it still pulls, alignment is likely. A pull that appears only under braking is different again and points at the brakes, typically a sticking caliper rather than anything to do with the wheels.',
      },
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
    sections: [
      {
        heading: 'What actually happens to a damaged panel',
        body: [
          'Body repair is a sequence, and the price follows how far down that sequence your damage sits. A shallow dent with the paint intact can sometimes be pushed out from behind and needs no paint at all. A dent with cracked paint needs filling, priming, painting and clearing. A crease across a body line, or damage to a structural member, may mean the panel is replaced rather than repaired.',
          'The step that separates cheap work from good work is preparation, and it is invisible in the finished job for the first few months. Proper repair means stripping to bare metal where necessary, treating it against rust, filling in thin layers rather than one thick one, and sanding progressively finer. Skipping stages produces a panel that looks perfect on collection and shows filler lines or bubbling within a year.',
          'Paint itself is applied in coats: primer for adhesion, base coat for colour, clear coat for gloss and UV protection. A quote that saves money by skipping clear coat, or by applying colour straight over old paint without primer, is buying you a finish that will fade and peel. Ask what the process is, not just what the price is.',
        ],
      },
      {
        heading: 'Why colour matching is harder than it sounds',
        body: [
          'Your car did not leave the factory the colour it is now. Paint fades under sun, and a five-year-old red is measurably different from fresh red of the same code. This is why a technically correct colour match, mixed exactly to the manufacturer code, can still look obviously wrong against the panel next to it.',
          'Good body shops handle this by blending. Rather than painting the repaired panel to its edges and stopping, they fade the new colour into the adjacent panels so the transition happens gradually and the eye cannot find an edge. Blending costs more because it involves preparing and painting more surface area, and it is the single biggest reason two quotes for the same dent differ by thousands.',
          'Metallic and pearl finishes are harder still, because the effect depends on how the metallic flakes lie, which depends on spray technique. Whites and solid colours are the most forgiving. If your car is a pearl white or a metallic grey, expect a competent shop to say the job needs blending, and be sceptical of one that promises a perfect match on the panel alone.',
        ],
      },
      {
        heading: 'Insurance, and when not to claim',
        body: [
          'Comprehensive motor insurance in India carries a compulsory deductible, plus whatever voluntary excess you selected, and claims cost you your no-claim bonus. That bonus climbs to 50 percent of the own-damage premium after five claim-free years, which is a substantial sum to give up.',
          'The arithmetic is usually straightforward. Add the deductible to the value of the no-claim bonus you would lose, over more than one renewal, and compare that to the repair cost. For a single scratched bumper the answer is almost always to pay cash. For a repair running into tens of thousands, claiming makes sense.',
          'One caveat worth knowing: most policies depreciate plastic and rubber parts heavily unless you have bought a zero-depreciation add-on, so the payout on a bumper replacement may be far less than the invoice. Ask your insurer what the settlement would actually be before assuming a claim covers it.',
        ],
      },
      {
        heading: 'Judging a body shop before you commit',
        body: [
          'Ask to see a car they finished recently, ideally in daylight rather than under workshop lighting. Look along the panel at a shallow angle rather than straight on. Orange-peel texture, a slight ripple in the reflection, or a visible edge where new paint meets old are the things that show up this way and stay hidden face-on.',
          'Ask about the paint booth. A proper heated, filtered spray booth is what keeps dust out of the finish and cures the clear coat evenly. Painting in the open, which still happens, produces a finish with dust nibs in it that no amount of polishing removes.',
          'Finally, ask about the warranty on the paintwork itself, and get it in writing. A shop confident in its preparation will typically warrant against peeling, bubbling and colour failure for a year or more. One that will not put anything in writing has told you what it thinks of its own work.',
        ],
      },
    ],
    priceTable: [
      { item: 'Dent removal, no paint (per panel)', range: '₹1,500 - ₹4,000', note: 'Only possible where the paint is unbroken. The cheapest good outcome available.' },
      { item: 'Scratch repair, single panel', range: '₹2,500 - ₹6,000', note: 'Depends on depth. Through to primer costs far more than a clear-coat scuff.' },
      { item: 'Full panel respray', range: '₹4,000 - ₹9,000', note: 'Per panel. Blending into adjacent panels adds cost but avoids a visible edge.' },
      { item: 'Bumper repair and repaint', range: '₹3,500 - ₹8,000', note: 'Plastic needs a flex additive in the paint, or it cracks at the first knock.' },
      { item: 'Panel replacement', range: '₹8,000 - ₹25,000', note: 'Part cost dominates. Ask whether the panel is genuine, OEM or aftermarket.' },
      { item: 'Full body respray', range: '₹35,000 - ₹90,000', note: 'Rarely worth it except on a car you intend to keep for years.' },
    ],
    faqs: [
      {
        question: 'How long does paint take to fully cure?',
        answer:
          'The car is safe to drive within a day or two, but the paint continues hardening for around 30 days. During that window avoid automatic car washes, waxing, polishing, and parking under trees where sap and bird droppings can etch the soft surface. Wash by hand with plain water and a soft mitt if you need to.',
      },
      {
        question: 'Is paintless dent removal worth considering?',
        answer:
          'When it applies, it is clearly the best option: no filler, no paint, no colour matching, and it preserves the factory finish, which matters for resale. It works only where the paint is completely unbroken and the technician can reach behind the panel. Sharp creases, dents on body lines and damage near panel edges are usually outside what it can fix.',
      },
      {
        question: 'Will a repair show on the car history at resale?',
        answer:
          'A buyer with a paint depth gauge, which costs very little, can identify a resprayed panel in seconds because refinished paint is thicker than factory paint. This is normal and not something to hide; a well-documented repair with an invoice reassures a buyer far more than an unexplained thickness reading does.',
      },
      {
        question: 'Should I use the shop my insurer recommends?',
        answer:
          'Network garages are convenient because the insurer settles directly and you avoid paying upfront and claiming back. The trade-off is that rates are pre-negotiated, which can put pressure on how much time goes into preparation. You are entitled to use any shop you choose, though a non-network claim means reimbursement rather than cashless settlement.',
      },
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
    sections: [
      {
        heading: 'Washing, polishing and coating are not the same thing',
        body: [
          'These three words get used interchangeably in advertising, and they describe completely different processes at completely different price points. Washing removes dirt. Polishing removes a microscopic layer of the clear coat to level out scratches. Coating adds a sacrificial protective layer on top. Only the first is routine maintenance.',
          'Polishing is the one to be careful with, because it is subtractive. Your clear coat is finite, typically a little over a tenth of a millimetre thick, and every machine polish takes some of it away. Done occasionally by someone competent, it transforms a dull car. Done aggressively or repeatedly, it eventually cuts through to the colour coat, and at that point the only fix is a respray.',
          'Coating, whether wax, sealant or ceramic, is purely additive and carries no such risk. It is what you apply after polishing to protect the finish you have just corrected. A detailing package that offers a coating without any correction step is protecting the swirl marks rather than removing them, which is fine and cheap, but it will not make the paint look new.',
        ],
      },
      {
        heading: 'What ceramic coating does and does not do',
        body: [
          'A ceramic coating is a liquid polymer that bonds to the clear coat and cures into a hard, hydrophobic layer. What it genuinely delivers is easier cleaning, because dirt and water sheet off rather than clinging; better resistance to chemical etching from bird droppings and hard water; and a deep gloss that lasts years rather than weeks.',
          'What it does not do is make paint scratch-proof. Marketing frequently implies it does. A coating adds meaningful resistance to very light marring, the kind an improper wash inflicts, but it will not stop a key, a stone chip or a careless trolley. If you want genuine impact protection, that is paint protection film, which is a different product at several times the price.',
          'Coating is also only as good as the preparation underneath it. The paint must be decontaminated and corrected first, because whatever is on the surface gets sealed under a layer that lasts for years. A cheap ceramic job that skips correction locks in every swirl mark, and removing it means polishing the coating off and starting again.',
        ],
      },
      {
        heading: 'How washing damages paint, and how to avoid it',
        body: [
          'Most of the fine swirl marks visible on a dark car in sunlight were not caused by anything dramatic. They were caused by washing. Dragging a dirty sponge across a dry panel grinds grit into the clear coat, and automatic brush washes do the same thing at speed with equipment that has already been dragged over hundreds of other cars.',
          'The method that avoids this is a pre-rinse to float off loose grit, a foam soak to lift what remains, and then two buckets, one with soapy water and one with plain water to rinse the mitt between panels so the grit ends up in the bucket rather than back on the paint. Drying with a plush microfibre towel or blown air rather than a squeegee finishes the job.',
          'Timing matters too. Washing in direct sun causes water and detergent to dry on the panel before you rinse, leaving mineral spots that etch into the clear coat. Wash in shade or early morning, and never let a panel dry on its own.',
        ],
      },
      {
        heading: 'Choosing a package without overpaying',
        body: [
          'Detailing packages are typically tiered, and the honest way to read them is to ask what correction is included. Exterior wash and interior vacuum is maintenance and should be cheap. A single-stage machine polish plus a sealant is a genuine improvement lasting several months. Multi-stage correction plus a ceramic coating is the expensive tier and only makes sense on paint worth protecting.',
          'For a daily-driven car in an Indian city, an honest assessment is that a good wash routine plus a sealant twice a year gets you most of the visual benefit at a fraction of the cost. Ceramic coating pays off on newer cars, darker colours where swirls show badly, and cars kept for the long term.',
          'Interior work is priced separately and deserves attention. Fabric seat shampooing, leather conditioning and an AC vent clean address things a wash never touches, and on a used car they make more difference to how it feels than another layer of gloss on the bonnet does.',
        ],
      },
    ],
    priceTable: [
      { item: 'Exterior wash', range: '₹300 - ₹800', note: 'Routine maintenance. Hand wash with the two-bucket method, not a brush tunnel.' },
      { item: 'Wash plus interior vacuum', range: '₹500 - ₹1,500', note: 'The sensible regular option for most owners.' },
      { item: 'Interior deep clean', range: '₹2,500 - ₹7,000', note: 'Seat shampoo, leather conditioning, vent clean. Transforms an older cabin.' },
      { item: 'Machine polish (single stage)', range: '₹3,000 - ₹8,000', note: 'Removes light swirls. Subtractive, so not something to repeat often.' },
      { item: 'Paint sealant', range: '₹2,000 - ₹5,000', note: 'Four to six months of protection. The value option against ceramic.' },
      { item: 'Ceramic coating', range: '₹12,000 - ₹25,000', note: 'Two to five years. Price depends far more on correction hours than on the bottle.' },
    ],
    faqs: [
      {
        question: 'How often should I wash my car?',
        answer:
          'Every one to two weeks in normal conditions, and sooner if it has been exposed to bird droppings, tree sap or salt, all of which etch paint if left. Frequency matters less than method: a fortnightly careful wash does far less damage than a weekly one with a dirty sponge.',
      },
      {
        question: 'Does ceramic coating mean I never have to wax again?',
        answer:
          'Yes, in the sense that waxing over a ceramic coating serves no purpose and can mask its water behaviour. You still need to wash the car regularly, and most coatings benefit from a compatible topper product every year or so. A coating reduces maintenance rather than eliminating it.',
      },
      {
        question: 'Is an automatic car wash bad for the paint?',
        answer:
          'Brush-based tunnel washes are the ones to avoid, because the brushes retain grit from previous cars and drag it across your panels. Touchless automatic washes are much safer for the paint, though they clean less thoroughly and rely on stronger chemicals. A careful hand wash remains the best option.',
      },
      {
        question: 'Can detailing remove deep scratches?',
        answer:
          'Only if the scratch has not gone through the clear coat. The test is to run a fingernail lightly across it: if the nail catches, it is too deep for polishing and needs paint. Polishing removes clear coat to level the surface around a scratch, so there is a limit to how much can be taken before the panel needs refinishing instead.',
      },
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
    sections: [
      {
        heading: 'The first two minutes matter most',
        body: [
          'Before diagnosing anything, make the car safe. Get it as far off the carriageway as you can manage, switch the hazard lights on immediately, and place the warning triangle well back down the road, considerably further than feels necessary at speed. On a highway, that means a hundred metres or more so approaching drivers have time to react.',
          'Then get everyone out of the car and behind the barrier, on the side away from traffic. This is counterintuitive, because the car feels like shelter, but a stationary vehicle on the shoulder of a highway is one of the more dangerous places to sit. The exception is dense, slow-moving city traffic with nowhere safe to stand, where staying belted in is the better option.',
          'Only once that is done should you work out what is wrong. Note the location precisely before you call for help, because the single most common cause of a long wait is a vague location. A highway kilometre marker, an exit number or a dropped map pin turns an hour of searching into a direct approach.',
        ],
      },
      {
        heading: 'Judging whether it is drivable',
        body: [
          'Some faults leave you a limited amount of safe driving; others do not. Overheating is the clearest do-not-drive case. If the temperature gauge is in the red or steam is coming from the bonnet, continuing will warp the cylinder head, which converts an inexpensive hose failure into an engine rebuild. Stop, switch off, and wait for it to cool before doing anything else.',
          'A red warning light generally means stop; an amber one generally means investigate soon. Oil pressure and battery charge lights are the two that warrant pulling over immediately. Losing oil pressure destroys an engine in minutes, and a charge failure means you are running on battery reserve and will lose the ignition entirely, quite possibly at an inconvenient moment.',
          'Brake and steering faults are never drivable. A pedal that goes soft or sinks, a steering wheel that suddenly feels loose, or a loud knock from a wheel are all reasons to stop where you are rather than pressing on to the next town. So is a burning smell, which usually means something is overheating badly enough to be a fire risk.',
        ],
      },
      {
        heading: 'What roadside assistance actually covers',
        body: [
          'Assistance divides into two categories, and the difference matters when you call. On-the-spot repairs are minor fixes done at the roadside: a jump start, a tyre change, fuel delivery if you have run dry, or a lockout. These resolve most calls and are quick.',
          'Towing is what happens when the fault cannot be fixed there. Cost depends on distance, vehicle weight and whether a flatbed is required. A flatbed is necessary rather than optional for all-wheel-drive cars, for automatics in many cases, and for any car with damaged steering or a seized wheel, because towing those with wheels on the ground causes further damage.',
          'If your car is under manufacturer warranty, roadside assistance is very often already included for the warranty period, and many comprehensive insurance policies include it as an add-on. It is worth checking what you already have before paying separately, because a large share of people pay twice for coverage they hold and have forgotten about.',
        ],
      },
      {
        heading: 'Avoiding the call in the first place',
        body: [
          'The great majority of breakdowns are not sudden. Battery failure, overheating from a slow coolant leak, and tyre blowouts from chronic underinflation all give weeks of warning to anyone looking. A five-minute check every couple of weeks, covering tyre pressures, coolant level, engine oil and how eagerly the car starts, removes most of the risk.',
          'Before any long drive, extend that to a proper look: tyre tread and pressures including the spare, all fluid levels, wiper condition, and every exterior light. The spare is the one people discover has been flat for two years at precisely the wrong moment, and on cars supplied with a repair kit rather than a spare, check that the sealant has not passed its expiry date.',
          'Keep a basic kit in the boot. A torch, a power bank, jump leads, a warning triangle, a reflective jacket and a litre of water cover most situations, and the water serves both the radiator and the people waiting beside it. None of it is expensive, and it converts a stranded evening into an inconvenience.',
        ],
      },
    ],
    priceTable: [
      { item: 'Jump start at roadside', range: '₹500 - ₹1,200', note: 'The most common call-out. Often free if your car is still under warranty.' },
      { item: 'Flat tyre change', range: '₹500 - ₹1,500', note: 'Assumes a usable spare. Without one, this becomes a tow.' },
      { item: 'Emergency fuel delivery', range: '₹500 - ₹1,500', note: 'Plus the cost of the fuel itself. Common and nothing to be embarrassed about.' },
      { item: 'Lockout assistance', range: '₹800 - ₹2,500', note: 'Expect to be asked for proof of ownership before anyone opens the car.' },
      { item: 'Towing, within city', range: '₹1,500 - ₹3,500', note: 'Distance-based. Confirm the destination workshop before the truck leaves.' },
      { item: 'Flatbed towing', range: '₹2,500 - ₹5,000', note: 'Required for all-wheel drive, many automatics, and any seized or damaged wheel.' },
    ],
    faqs: [
      {
        question: 'Can I keep driving if the engine is overheating?',
        answer:
          'No. This is the fault most likely to turn a modest repair into an engine replacement. Pull over, switch off, and let it cool for at least thirty minutes. Do not open the radiator cap while hot, because the system is pressurised and the escaping coolant will scald. Once cool, a coolant top-up may get you to a workshop, but only if the leak is slow.',
      },
      {
        question: 'What should I check before calling for help?',
        answer:
          'Confirm your exact location, ideally as a dropped pin or a highway marker. Note what the car actually did, including any warning lights, noises or smells, because that determines whether a technician or a tow truck is sent. Check the obvious things too: fuel level, and whether the gear selector is properly in park or neutral, both of which account for more call-outs than anyone admits.',
      },
      {
        question: 'Is roadside assistance worth paying for separately?',
        answer:
          'Check what you already hold first. New cars usually include it for the warranty period, and many comprehensive insurance policies bundle it cheaply as an add-on. If you have neither, it is inexpensive relative to a single unplanned tow, and the value is highest for people who drive long distances or older cars.',
      },
      {
        question: 'What if the car needs towing to a workshop I do not know?',
        answer:
          'You are entitled to choose the destination, and you should. A tow to whichever garage the driver prefers can leave your car somewhere you have no relationship with and no price agreement. Decide where it is going before the truck departs, and get the repair quoted before any work starts.',
      },
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
    sections: [
      {
        heading: 'Fitting quality matters more than the product',
        body: [
          'Most accessory problems are not caused by the accessory. They are caused by how it was wired in. The common shortcut is to splice into whatever wire is nearest and convenient, often by cutting the insulation and twisting a new wire in, then wrapping it in tape. That joint corrodes, works loose with vibration, and eventually either stops working or shorts.',
          'A proper installation takes power from the fuse box using an add-a-fuse tap, includes a fuse rated for the new circuit, uses soldered or properly crimped connections with heat-shrink rather than tape, and routes wiring through existing looms and grommets so nothing chafes against a metal edge. It takes longer and it is the entire difference between an installation that lasts and one that becomes an electrical fault.',
          'This matters more on modern cars than it used to. Contemporary vehicles run networked electronics, and an incorrectly earthed accessory or one drawing power from the wrong circuit can produce faults that appear nowhere near the accessory itself: intermittent warning lights, a battery that drains overnight, or a control module behaving oddly. Diagnosing those costs far more than the careful installation would have.',
        ],
      },
      {
        heading: 'Warranty, and what actually voids it',
        body: [
          'The fear that any accessory voids your warranty is overstated, but the reverse assumption is also wrong. In practice, a manufacturer cannot void an entire warranty because you fitted something. What they can do is decline a specific claim where the accessory caused the failure, and electrical accessories are where that argument most often succeeds.',
          'So the practical rule is about traceability. Keep the installation invoice, keep the product documentation, and have work done somewhere that will stand behind it. If a dashcam is wired properly to a fused circuit and your gearbox fails, no reasonable assessor connects the two. If it is spliced into the ignition harness with tape and you develop an electrical fault, you have handed them the argument.',
          'Some modifications carry more risk than others. Anything touching the engine management, suspension geometry or braking system is materially more likely to affect a claim than a set of seat covers or a reversing camera. Structural changes and remapping are in a different category again, and worth discussing with both your dealer and your insurer beforehand.',
        ],
      },
      {
        heading: 'What is legal in India, and what is not',
        body: [
          'A few rules are worth knowing because enforcement is real. Window tinting is the most commonly misunderstood: the Supreme Court has held that films reducing visibility below the prescribed limits are not permitted, and cars are regularly challaned for aftermarket black film. The safe position is that factory-tinted glass within the legal transmission limits is fine, and stuck-on dark film is not.',
          'Multi-tone and pressure horns are prohibited, as are horns exceeding the permitted sound level. Bull bars and crash guards are also prohibited, and are frequently removed at checkpoints. They are not merely a legal problem: by transmitting impact loads into the chassis they defeat the crumple zones and can prevent airbags deploying as designed.',
          'Lighting is the other common area. Fitting high-intensity aftermarket bulbs into headlamp housings designed for a different light source produces glare that dazzles oncoming drivers and does not meet the beam pattern requirements. Auxiliary lamps have their own rules about placement and use. Any structural or visual change significant enough to alter the vehicle from its registered particulars also requires endorsement on the registration certificate.',
        ],
      },
      {
        heading: 'Choosing accessories worth fitting',
        body: [
          'The accessories that genuinely earn their cost tend to be the unglamorous ones. A reversing camera with sensors materially reduces low-speed damage. A dashcam is worth having the first time you need to prove what happened at a junction. Good floor liners protect resale value in a way that shows years later.',
          'Infotainment upgrades are the category to think hardest about. Aftermarket units vary enormously, and the cheapest ones bring poor screens, laggy software and no update path. On many cars the factory unit is also integrated with steering controls, parking sensors and vehicle settings, so replacing it means either losing functions or paying for an adapter to retain them. Budget for the adapter or keep the original.',
          'Whatever you fit, ask what happens if you want it removed later. A clean installation can be reversed, leaving no cut wires and no drilled holes, which matters at resale. An installation that required cutting the loom or the dashboard cannot be undone, and a buyer who spots it will assume, often rightly, that other corners were cut too.',
        ],
      },
    ],
    priceTable: [
      { item: 'Reverse camera and sensors', range: '₹3,000 - ₹9,000', note: 'Fitting is most of the cost. Wiring to the reverse light and screen is the fiddly part.' },
      { item: 'Dashcam (fitted and hardwired)', range: '₹3,500 - ₹15,000', note: 'Insist on a fused tap rather than a spliced joint, and on concealed wiring.' },
      { item: 'Android infotainment unit', range: '₹8,000 - ₹30,000', note: 'Budget for a canbus adapter if you want to keep the steering controls.' },
      { item: 'Speaker upgrade (front pair)', range: '₹3,000 - ₹12,000', note: 'Damping the door panel affects the result as much as the speakers do.' },
      { item: 'Seat covers and floor liners', range: '₹2,500 - ₹15,000', note: 'Custom-cut liners protect resale value more than most cosmetic additions.' },
      { item: 'Central locking and alarm', range: '₹2,500 - ₹7,000', note: 'Wiring quality matters here more than anywhere. A bad job drains the battery.' },
    ],
    faqs: [
      {
        question: 'Will fitting accessories affect my resale value?',
        answer:
          'It depends entirely on reversibility. Cleanly installed, tasteful and removable additions are neutral to slightly positive. Anything requiring cut wiring, drilled panels or a modified dashboard reduces value, because the next buyer sees work they did not choose and cannot easily undo. Keep the original parts if you replace anything.',
      },
      {
        question: 'Can accessories drain my battery?',
        answer:
          'Yes, and it is one of the most common consequences of a poor installation. Anything wired to a permanently live circuit rather than a switched one keeps drawing current after you park, and dashcams in parking mode are the usual offender. If your battery started going flat after an accessory was fitted, that is where to look first.',
      },
      {
        question: 'Should I get accessories fitted at the dealership?',
        answer:
          'Dealerships are the safest option for warranty purposes and generally do competent work, at a premium. A good independent specialist often does equal or better work for less, particularly on audio and electronics, which dealerships tend to subcontract anyway. The question to ask either way is what warranty they give on the installation itself, not just on the part.',
      },
      {
        question: 'Are aftermarket infotainment systems reliable?',
        answer:
          'The good ones are, and the cheap ones are not, with a wide gap between. What separates them is processor speed, screen quality and whether the manufacturer issues software updates. Also confirm before buying that the unit retains your existing functions, because losing steering controls or parking sensor display is a daily annoyance that no screen size compensates for.',
      },
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
    sections: [
      {
        heading: 'How a brake job is actually priced',
        body: [
          'Brakes are quoted as a job but built from separate components, and knowing which is which prevents most overcharging. Pads are the consumable, designed to wear out, and they are cheap. Discs, sometimes called rotors, wear far more slowly and only need replacing when they go below a minimum thickness or warp. Calipers rarely need replacing at all.',
          'The default assumption should be pads only. A workshop that quotes pads and discs together on every job is either working on a badly neglected car or padding the invoice. Discs have a minimum thickness stamped on them, and a technician can measure the actual figure with a micrometer in under a minute. Ask for that number before agreeing to replace them.',
          'The rear brakes on many Indian hatchbacks are drums rather than discs, which changes the job entirely. Drum brake shoes typically last much longer than front pads, and a full brake service on such a car often means front pads only, with the rear inspected and adjusted rather than replaced.',
        ],
      },
      {
        heading: 'What the noises mean',
        body: [
          'A high-pitched squeal when braking gently is usually the wear indicator, a small metal tab designed to touch the disc and make exactly that sound when the pad gets thin. It is doing its job: the car is telling you to book a replacement in the next few weeks. It is not an emergency, but it is not something to ignore for months either.',
          'A harsh grinding sound is a different matter. That is metal on metal, meaning the friction material is entirely gone and the pad backing plate is cutting into the disc. Every stop from that point deepens the damage and turns a pad-only job into pads and discs. This one warrants stopping the car and arranging a repair rather than finishing the week.',
          'A rhythmic pulsing through the pedal, in time with wheel rotation, usually means a warped disc or uneven pad deposits. It often follows a hard stop from high speed, or driving through a puddle with hot brakes. Mild cases can sometimes be machined flat; severe ones need new discs.',
        ],
      },
      {
        heading: 'Brake fluid is the part everybody forgets',
        body: [
          'Brake fluid is hygroscopic, meaning it absorbs moisture from the air over time, and this matters more than it sounds. Water lowers the boiling point of the fluid. Under sustained heavy braking, on a hill descent for instance, that absorbed water can boil, and vapour is compressible in a way liquid is not. The result is a pedal that sinks to the floor with little braking effect.',
          'Most manufacturers specify a fluid change every two years regardless of mileage, and it is among the cheapest safety-critical jobs on a car. It is also among the most commonly skipped, because nothing visibly deteriorates and the car gives no warning until the day you need the brakes most.',
          'A technician can test the moisture content with a cheap electronic tester in seconds. If the fluid in your car has never been changed and the car is more than three years old, it is due, and you should treat a workshop that has never mentioned it as having been incurious about your brakes.',
        ],
      },
      {
        heading: 'Choosing pads, and what to avoid',
        body: [
          'Pads come in several friction materials. Organic pads are quiet and gentle on discs but wear faster. Semi-metallic pads bite harder and handle heat better at the cost of more noise and more disc wear. Ceramic pads are quiet, low-dust and long-lasting, and cost the most. For ordinary city driving, decent organic or ceramic pads are the sensible choice.',
          'What to avoid is the cheapest unbranded set available. Brake pads are the single component where the gap between adequate and poor has direct safety consequences, because a pad that fades under heat gives you no warning until you need a hard stop. The saving between a poor pad and a good one is a few hundred rupees across the life of the set.',
          'After fitting, new pads need bedding in: a series of moderate stops from around 50 km/h to transfer an even layer of friction material onto the disc. A workshop that hands the car back with a warning to brake gently for the first hundred kilometres is giving you correct advice, not covering itself.',
        ],
      },
    ],
    priceTable: [
      { item: 'Front brake pads (set)', range: '₹1,200 - ₹4,500', note: 'The routine consumable. Quality matters more here than on almost any other part.' },
      { item: 'Rear brake pads (set)', range: '₹1,000 - ₹4,000', note: 'Many hatchbacks use rear drums instead, which are cheaper and last longer.' },
      { item: 'Brake discs (pair)', range: '₹3,000 - ₹9,000', note: 'Only if measured below minimum thickness or warped. Not a routine item.' },
      { item: 'Brake fluid change', range: '₹600 - ₹1,800', note: 'Due every two years regardless of mileage. Cheap, safety-critical, routinely skipped.' },
      { item: 'Disc machining / skimming', range: '₹400 - ₹1,200', note: 'Per disc. A cheaper alternative to replacement if enough thickness remains.' },
      { item: 'Caliper service or rebuild', range: '₹800 - ₹3,500', note: 'Needed when a caliper sticks, which causes pulling and rapid one-sided wear.' },
    ],
    faqs: [
      {
        question: 'Should I replace discs every time I replace pads?',
        answer:
          'No, and being told otherwise is a reliable sign of upselling. Discs typically outlast two or three sets of pads. The only valid reasons to replace them are measured thickness below the manufacturer minimum, visible scoring deep enough to catch a fingernail, warping that causes pedal pulsation, or cracking. Ask for the measured figure.',
      },
      {
        question: 'Why does the brake pedal go soft after heavy use?',
        answer:
          'Usually brake fade, caused by heat. Either the pads have exceeded their working temperature and lost friction, or moisture in old brake fluid has boiled and introduced compressible vapour into the lines. The second cause is the more serious and the more preventable, and it is why the two-year fluid change exists.',
      },
      {
        question: 'Is it safe to drive with squealing brakes?',
        answer:
          'For a short period, yes, if it is the light squeal of a wear indicator. Book the replacement rather than putting it off. If the noise is grinding rather than squealing, or if the pedal feels different, or if the car pulls under braking, treat it as urgent and stop driving the car until it is looked at.',
      },
      {
        question: 'How long do brake pads last?',
        answer:
          'Anywhere between 25,000 and 60,000 km, and the spread is almost entirely down to how and where you drive. Dense city traffic with constant stop-start wears pads several times faster than highway use. Weight matters too, so a loaded SUV goes through pads faster than a light hatchback. Have them measured at each service rather than guessing from the odometer.',
      },
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
