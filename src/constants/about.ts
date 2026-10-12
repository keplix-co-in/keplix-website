/**
 * Who Keplix is. Shared by the About page and the website chatbot
 * (api/_knowledge.ts) so the two can't drift apart.
 *
 * Deliberately no counts or statistics here (garages, customers, bookings):
 * the bot must not state numbers that may be out of date. The About page's
 * timeline and founder letter stay in About.tsx for that reason.
 */

export const ABOUT_PILLARS = [
  {
    icon: '/icons/about-mission.svg',
    title: 'Our Mission',
    description: 'To simplify car care and build trust between car owners and garages.',
  },
  {
    icon: '/icons/about-vision.svg',
    title: 'Our Vision',
    description: "To become India's most trusted car care platform.",
  },
  {
    icon: '/icons/about-values.svg',
    title: 'Our Values',
    description: 'Transparency, Trust, Customer First, Innovation.',
  },
  {
    icon: '/icons/about-promise.svg',
    title: 'Our Promise',
    description: 'Better car care experiences for everyone.',
  },
];

/** A short, factual summary of the founder's letter on the About page. */
export const FOUNDER = {
  name: 'Vardan Chaturvedi',
  title: 'Founder & CEO',
  // Phrased to follow the name ("Vardan Chaturvedi studied…"). A sentence with
  // no subject made the bot supply a pronoun the site never states.
  background: 'studied automotive design (UPES Dehradun) and worked with brands like Hero, Studio 34 and Ace.',
  story:
    'Keplix started with a breakdown: the founder’s car broke down late at night on the Delhi–Dehradun highway, ' +
    'and every garage they reached quoted far more than the repair should have cost. That night showed how ' +
    'unorganised and unfair car servicing can be, especially for people who are stranded or don’t know genuine ' +
    'prices. Keplix is the fair, transparent marketplace the founder wished had existed that night.',
};
