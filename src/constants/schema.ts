import { APP_LINKS, CONTACT, SOCIALS } from './links';
import {
  DEFAULT_DESCRIPTION,
  SERVICE_CATEGORIES,
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
  telephone: CONTACT.phoneDisplay,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '9/2659, Kailash Nagar, Gandhi Nagar',
    addressLocality: 'Delhi',
    postalCode: '110031',
    addressCountry: 'IN',
  },
  sameAs: [
    SOCIALS.linkedin,
    SOCIALS.instagram,
    SOCIALS.threads,
    SOCIALS.twitter,
    SOCIALS.facebook,
    SOCIALS.youtube,
  ],
});

/** Enables the sitelinks search box, and tells engines this is a site not a page. */
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

/** The marketplace as a local business, with the services it brokers. */
export const localBusinessSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  '@id': `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  url: SITE_URL,
  image: absoluteUrl('/keplix-logo.png'),
  description: DEFAULT_DESCRIPTION,
  telephone: CONTACT.phoneDisplay,
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '9/2659, Kailash Nagar, Gandhi Nagar',
    addressLocality: 'Delhi',
    postalCode: '110031',
    addressCountry: 'IN',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  parentOrganization: { '@id': ORG_ID },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Car services',
    itemListElement: SERVICE_CATEGORIES.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service },
    })),
  },
});

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
 * FAQPage — the highest-value schema on this site. /faq already holds the
 * best, most quotable content, in exactly the Q&A shape answer engines mine.
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
  author?: { name: string } | null;
}): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt ?? undefined,
  image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
  datePublished: post.publishedAt ?? undefined,
  author: post.author?.name
    ? { '@type': 'Person', name: post.author.name }
    : { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${post.slug}`) },
  inLanguage: 'en-IN',
});

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
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'India' },
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
