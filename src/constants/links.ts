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
  instagram: 'https://www.instagram.com/keplix_official',
  twitter: 'https://x.com/keplix_official',
  facebook: 'https://www.facebook.com/keplix_official',
  linkedin: 'https://www.linkedin.com/company/keplix',
  youtube: 'https://www.youtube.com/@keplix_official',
} as const;
