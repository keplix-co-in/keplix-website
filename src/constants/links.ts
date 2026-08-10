/** Single source of truth for every external destination the site links to. */

export const APP_LINKS = {
  /** Customer-facing app (com.Keplix.UserSide) */
  customerAndroid:
    'https://play.google.com/store/apps/details?id=com.Keplix.UserSide',
  /** Garage/vendor partner app (com.keplix.carservice) */
  vendorAndroid:
    'https://play.google.com/store/apps/details?id=com.keplix.carservice',
  /** No iOS builds live yet — App Store badges render as "Coming soon". */
  ios: null,
} as const;

const SUPPORT_EMAIL = 'support@keplix.co.in';
const PHONE_E164 = '+919818915720';

export const CONTACT = {
  email: SUPPORT_EMAIL,
  phoneDisplay: '+91 98189 15720',
  tel: `tel:${PHONE_E164}`,
  whatsapp: `https://wa.me/${PHONE_E164.replace('+', '')}`,
  /** Opens a Gmail compose window pre-addressed to support. */
  gmailCompose: `https://mail.google.com/mail/?view=cm&fs=1&to=${SUPPORT_EMAIL}`,
  address: '9/2659, Kailash Nagar, Gandhi Nagar, Delhi, 110031',
} as const;

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/company/keplix/',
  instagram: 'https://www.instagram.com/keplix.co.in',
  threads: 'https://www.threads.com/@keplix.co.in',
  // `?s=21` on the supplied link is an iOS share-attribution param — dropped.
  twitter: 'https://x.com/keplix180865',
  // TODO: real URLs still needed for these two.
  facebook: 'https://www.facebook.com/keplix.co.in',
  youtube: 'https://www.youtube.com/@keplix.co.in',
} as const;
