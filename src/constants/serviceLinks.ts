/**
 * Internal links between the service pages and the blog.
 *
 * Before this, service pages linked to no articles and articles linked to no
 * service, so every post was reachable only from /blog and Google had no
 * signal that "brake warning signs" and /services/brake-repair belong to the
 * same topic. The hub-and-spoke mapping here is what gives each service page
 * its supporting articles, and each article a page to send readers on to.
 *
 * Blog posts live in the backend, so this list is maintained by hand.
 * ONLY list posts that are already published: a link to an unpublished slug
 * renders the "Article not found" page. When a draft from blog-drafts/ goes
 * live, add it here under its service (see blog-drafts/README.md for which).
 */

export interface GuideLink {
  slug: string;
  title: string;
}

const g = (slug: string, title: string): GuideLink => ({ slug, title });

/** Service slug → published articles that support it, most relevant first. */
export const SERVICE_GUIDES: Record<string, GuideLink[]> = {
  'car-service': [
    g('when-should-you-change-your-engine-oil', 'When Should You Change Your Engine Oil?'),
    g('how-to-read-a-car-service-bill', 'How to Read a Car Service Bill'),
    g(
      'dealership-or-independent-garage-which-should-you-use',
      'Dealership or Independent Garage: Which Should You Use?',
    ),
    g('how-to-choose-a-garage-you-can-actually-trust', 'How to Choose a Garage You Can Actually Trust'),
    g('what-your-car-s-warning-lights-actually-mean', "What Your Car's Warning Lights Actually Mean"),
  ],
  'car-ac-repair': [g('summer-car-care-checklist', 'Summer Car Care Checklist')],
  'car-battery-replacement': [
    g('what-your-car-s-warning-lights-actually-mean', "What Your Car's Warning Lights Actually Mean"),
  ],
  'tyre-replacement-wheel-alignment': [
    g('tyre-care-101-pressure-tread-and-rotation', 'Tyre Care 101: Pressure, Tread and Rotation'),
    g('brake-warning-signs-you-should-not-ignore', 'Brake Warning Signs You Should Not Ignore'),
  ],
  'brake-repair': [
    g('brake-warning-signs-you-should-not-ignore', 'Brake Warning Signs You Should Not Ignore'),
    g('what-your-car-s-warning-lights-actually-mean', "What Your Car's Warning Lights Actually Mean"),
  ],
  'denting-painting': [
    g(
      'car-insurance-claims-in-india-when-to-claim-and-when-to-pay',
      'Car Insurance Claims in India: When to Claim and When to Pay',
    ),
  ],
  'car-wash-detailing': [g('monsoon-car-care-what-actually-matters', 'Monsoon Car Care: What Actually Matters')],
  'breakdown-assistance': [
    g('what-your-car-s-warning-lights-actually-mean', "What Your Car's Warning Lights Actually Mean"),
    g('monsoon-car-care-what-actually-matters', 'Monsoon Car Care: What Actually Matters'),
  ],
  'car-accessories-fitting': [],
};

/**
 * Service slug → the services most often needed alongside it.
 *
 * Replaces `SERVICES.slice(0, 4)`, which meant the last four services in the
 * list (brake repair, car wash, breakdown, accessories) were never linked from
 * any other service page. Every service appears in at least two lists here.
 */
export const RELATED_SERVICES: Record<string, string[]> = {
  'car-service': ['brake-repair', 'car-ac-repair', 'car-battery-replacement', 'tyre-replacement-wheel-alignment'],
  'car-ac-repair': ['car-service', 'car-battery-replacement', 'car-wash-detailing', 'breakdown-assistance'],
  'car-battery-replacement': ['breakdown-assistance', 'car-service', 'car-accessories-fitting', 'car-ac-repair'],
  'tyre-replacement-wheel-alignment': ['brake-repair', 'car-service', 'breakdown-assistance', 'car-wash-detailing'],
  'denting-painting': ['car-wash-detailing', 'car-accessories-fitting', 'car-service', 'tyre-replacement-wheel-alignment'],
  'car-wash-detailing': ['denting-painting', 'car-accessories-fitting', 'car-ac-repair', 'car-service'],
  'breakdown-assistance': ['car-battery-replacement', 'tyre-replacement-wheel-alignment', 'brake-repair', 'car-service'],
  'car-accessories-fitting': ['car-battery-replacement', 'car-wash-detailing', 'denting-painting', 'car-service'],
  'brake-repair': ['tyre-replacement-wheel-alignment', 'car-service', 'breakdown-assistance', 'denting-painting'],
};

/**
 * Article slug → the service it should send readers to. Posts not listed
 * fall back to general car service, which fits every maintenance article.
 * Includes the blog-drafts/ slugs so the card is right the moment they publish.
 */
const POST_SERVICE: Record<string, string> = {
  'summer-car-care-checklist': 'car-ac-repair',
  'tyre-care-101-pressure-tread-and-rotation': 'tyre-replacement-wheel-alignment',
  'brake-warning-signs-you-should-not-ignore': 'brake-repair',
  'car-insurance-claims-in-india-when-to-claim-and-when-to-pay': 'denting-painting',
  'monsoon-car-care-what-actually-matters': 'car-service',
  // blog-drafts/
  'car-ac-not-cooling': 'car-ac-repair',
  'car-battery-life-in-india': 'car-battery-replacement',
  'wheel-alignment-vs-wheel-balancing': 'tyre-replacement-wheel-alignment',
};

export const serviceSlugForPost = (postSlug: string): string =>
  POST_SERVICE[postSlug] ?? 'car-service';
