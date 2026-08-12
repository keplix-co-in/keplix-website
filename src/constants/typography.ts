/**
 * Shared type scale for the marketing pages.
 *
 * Every section on this site is hand-rolled — there is no SectionHeading
 * component — so the supporting line under a heading had drifted into eight
 * different class combinations, and seven of them carried no font-weight at
 * all (rendering at 400 next to siblings at 500). These constants give the two
 * recurring roles one definition each.
 *
 * Deliberately size and weight ONLY. Colour and spacing stay at the call site,
 * because they legitimately differ per section (light text on the dark bands,
 * different muted greys, different margins).
 */

/**
 * The descriptive line directly beneath a section heading.
 * Scales 16 → 18 → 22px so it stays comfortable on a phone while reading as a
 * proper sub-heading on desktop.
 */
export const sectionSubtitleClass =
  'text-base font-semibold sm:text-lg md:text-[22px]';

/**
 * Titles inside feature/step/contact cards — the small headings that were
 * sitting at 16px and getting lost against their own body copy.
 */
export const cardTitleClass = 'text-[17px] font-bold sm:text-[18px]';
