import { APP_LINKS, CONTACT, SOCIALS } from './links';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from './site';
import { SERVICES } from './services';

/**
 * JSON-LD builders.
 *
 * These are what answer engines and rich results actually read. Everything is
 * derived from the same constants the UI uses (links.ts), so the address,
 * phone number and social profiles can't drift between what the page says and
 * what the machine-readable markup claims.
 *
 * Rendered through <Seo>, which emits them into the prerendered HTML — schema
 * injected client-side would be invisible to the crawlers this is aimed at.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Where Keplix actually operates. Partner garages are only in Delhi NCR so far
 * (see the "Which cities" answer in faqs.ts). Claiming all of India in markup
 * the site can't back up is a trust signal working against us, so widen this
 * only when bookings genuinely open elsewhere.
 */
const AREA_SERVED = { '@type': 'AdministrativeArea', name: 'Delhi NCR' };

/**
 * A compact, self-contained reference to the company for use inside other
 * nodes (publisher, broker). A bare `{ '@id': ORG_ID }` only resolves on pages
 * that also emit organizationSchema(), which blog posts and service pages
 * don't, so validators reported the publisher as missing name and logo there.
 */
const orgRef = (): Record<string, unknown> => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: absoluteUrl('/keplix-logo.png') },
});

/**
 * Author names that are account labels, not people. Posts written from the
 * admin panel are attributed to the admin user ("Super Admin"), which is worse
 * than no byline: it reads as machine-generated to readers, to Google's
 * quality raters and to the AdSense reviewer. Treated as "no author" and
 * replaced with the editorial team until posts carry a real named author.
 */
const PLACEHOLDER_AUTHORS = new Set(['super admin', 'superadmin', 'admin', 'administrator']);

export const EDITORIAL_AUTHOR = 'Keplix Editorial Team';

/** The byline to show for a post: its real author, or the editorial team. */
export const postAuthorName = (author?: { name: string } | null): string => {
  const name = author?.name?.trim();
  return name && !PLACEHOLDER_AUTHORS.has(name.toLowerCase()) ? name : EDITORIAL_AUTHOR;
};

/** The company itself. `sameAs` is what links the brand to its social profiles. */
export const organizationSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/keplix-logo.png'),
  description: DEFAULT_DESCRIPTION,
  email: CONTACT.email,
  // contactPoint rather than a bare `telephone`: it says what the number is
  // for (customer support, not a walk-in workshop) and which languages.
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: CONTACT.phoneDisplay,
    email: CONTACT.email,
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '9/2659, Kailash Nagar, Gandhi Nagar',
    addressLocality: 'Delhi',
    postalCode: '110031',
    addressCountry: 'IN',
  },
  areaServed: AREA_SERVED,
  // Facebook and YouTube are left out on purpose: links.ts marks those URLs as
  // unconfirmed TODOs, and a sameAs pointing at a profile that isn't ours (or
  // doesn't exist) muddies entity matching. Add them back once confirmed.
  sameAs: [SOCIALS.linkedin, SOCIALS.instagram, SOCIALS.threads, SOCIALS.twitter],
});

/**
 * Tells engines this is a site, not a page, and supplies the site name shown
 * in results. (Google retired the sitelinks search box, so no SearchAction.)
 */
export const websiteSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-IN',
});

// No AutoRepair / LocalBusiness node. Keplix is a marketplace that brokers
// independent partner garages; it doesn't repair cars at the registered
// office, so marking that address up as an auto-repair shop overstated what
// the business is and pointed local search at a place customers can't visit.
// Service pages carry the services instead (serviceSchema, with Keplix as the
// broker).

/** The two Play Store apps. */
export const mobileAppSchemas = (): Record<string, unknown>[] => [
  {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Keplix — Car Service Booking',
    operatingSystem: 'Android',
    applicationCategory: 'LifestyleApplication',
    url: APP_LINKS.customerAndroid,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    publisher: { '@id': ORG_ID },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Keplix Garage Partner',
    operatingSystem: 'Android',
    applicationCategory: 'BusinessApplication',
    url: APP_LINKS.vendorAndroid,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    publisher: { '@id': ORG_ID },
  },
];

/**
 * FAQPage. Google stopped showing FAQ rich results, so this no longer earns a
 * visual result in Search. It is kept because AI answer engines still read
 * the Q&A pairs, and the markup has to match the visible FAQ to stay valid.
 */
export const faqPageSchema = (
  faqs: { question: string; answer: string }[],
): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
});

export const blogPostingSchema = (post: {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  author?: { name: string } | null;
}): Record<string, unknown> => {
  const authorName = postAuthorName(post.author);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? undefined,
    // Article markup without an image isn't eligible for article rich
    // results; the site's share card is a better fallback than nothing.
    image: post.coverImage ? absoluteUrl(post.coverImage) : DEFAULT_OG_IMAGE,
    datePublished: post.publishedAt ?? undefined,
    // updatedAt only arrives once the backend's public blog select includes
    // it; until then this falls back to the publish date.
    dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
    author:
      authorName === EDITORIAL_AUTHOR
        ? { '@type': 'Organization', name: EDITORIAL_AUTHOR, url: absoluteUrl('/about') }
        : { '@type': 'Person', name: authorName },
    publisher: orgRef(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${post.slug}`) },
    inLanguage: 'en-IN',
  };
};

/** Breadcrumbs. Pass the trail excluding Home, which is prepended. */
export const breadcrumbSchema = (
  trail: { name: string; path: string }[],
): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

/**
 * Service schema for an individual service landing page.
 *
 * `offers` carries the indicative price band shown on the page. It is a range
 * rather than a single figure on purpose — the real number depends on the car
 * and the workshop, and publishing a precise price the app can't honour is
 * both a bad experience and a structured-data violation.
 */
export const serviceSchema = (service: {
  slug: string;
  name: string;
  description: string;
  priceFrom: number;
  priceTo: number;
}): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/services/${service.slug}#service`,
  name: service.name,
  description: service.description,
  serviceType: service.name,
  // `broker`, not `provider`: the work is done by independent partner garages
  // and Keplix arranges it. Saying Keplix provides the repair is the same
  // overstatement the old AutoRepair node made.
  broker: orgRef(),
  areaServed: AREA_SERVED,
  url: absoluteUrl(`/services/${service.slug}`),
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: service.priceFrom,
    highPrice: service.priceTo,
  },
});

/** The /services index: an ItemList pointing at each landing page. */
export const serviceListSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Car services offered by Keplix',
  itemListElement: SERVICES.map((service, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: service.name,
    url: absoluteUrl(`/services/${service.slug}`),
  })),
});
