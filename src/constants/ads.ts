/**
 * Google AdSense configuration.
 *
 * Two independent switches, which is what lets ads be rolled out gradually:
 *
 *  1. `ADS_ENABLED` (the publisher ID) controls whether the AdSense script may
 *     load at all. It defaults to the real Keplix ID below, so the script is
 *     available — but still only after the visitor accepts cookies.
 *  2. Each entry in `AD_SLOTS` controls one manual ad unit. An unset slot
 *     renders nothing, so units can be switched on one at a time as they're
 *     created in the AdSense dashboard (Ads → By ad unit).
 *
 * With no slot IDs set, the only ads that can appear are Auto ads, if that is
 * turned on in the AdSense dashboard. Note that Auto ads let Google choose
 * placement site-wide, which overrides the deliberate decision to keep ads off
 * the homepage, /beta, /contact and /business — leave it off to preserve that.
 *
 * Overridable in Vercel (and .env.local for testing):
 *   VITE_ADSENSE_CLIENT            overrides the publisher ID; set empty to kill ads
 *   VITE_ADSENSE_SLOT_BLOG_GRID    in-grid unit on /blog
 *   VITE_ADSENSE_SLOT_ARTICLE_TOP  above the article header
 *   VITE_ADSENSE_SLOT_ARTICLE_MID  injected mid-article
 *   VITE_ADSENSE_SLOT_ARTICLE_END  after the article body
 *   VITE_ADSENSE_SLOT_PAGE_FOOTER  shared unit on FAQ / About / policy pages
 */

/**
 * The Keplix AdSense publisher ID.
 *
 * Hardcoded as the default rather than kept secret: a publisher ID is public
 * by nature — it appears in the HTML of every page that serves ads, and in
 * /ads.txt. The env var still overrides it, which is useful for pointing a
 * staging deploy at a different account or disabling ads entirely by setting
 * it to an empty string.
 */
const DEFAULT_ADSENSE_CLIENT = 'ca-pub-9187009647712371';

export const ADSENSE_CLIENT =
  import.meta.env.VITE_ADSENSE_CLIENT ?? DEFAULT_ADSENSE_CLIENT;

/**
 * Master switch. Checked by every ad component — nothing touches the network
 * or the DOM when this is false.
 */
export const ADS_ENABLED = Boolean(ADSENSE_CLIENT);

export const AD_SLOTS = {
  blogGrid: import.meta.env.VITE_ADSENSE_SLOT_BLOG_GRID ?? '',
  articleTop: import.meta.env.VITE_ADSENSE_SLOT_ARTICLE_TOP ?? '',
  articleMid: import.meta.env.VITE_ADSENSE_SLOT_ARTICLE_MID ?? '',
  articleEnd: import.meta.env.VITE_ADSENSE_SLOT_ARTICLE_END ?? '',
  pageFooter: import.meta.env.VITE_ADSENSE_SLOT_PAGE_FOOTER ?? '',
} as const;

export type AdSlotName = keyof typeof AD_SLOTS;

/** The script is loaded on demand after consent — never as a tag in index.html. */
export const ADSENSE_SCRIPT_SRC =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
