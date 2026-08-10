import React from 'react';

/**
 * Figma "Ellipse 2" — present on every page frame as a DIRECT CHILD of the
 * frame (x:-126, y:276, 643x632). It sits on top of the page background and
 * underneath every content section, so it must be rendered at the page root,
 * never inside a section (a section's `overflow-hidden` would clip it).
 *
 * Vertical offset: Figma's header block ends at y=139 and the ellipse starts
 * at y=276, so it sits 137px below where page content begins. Our sticky
 * Header is 119px tall and occupies normal flow, so `top: 137px` on the page
 * root reproduces Figma exactly.
 */
const PageBlob: React.FC<{ color?: string }> = ({ color = 'bg-[#f7e6e6]' }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute -left-[126px] top-[137px] z-0 h-[632px] w-[643px] rounded-full ${color}`}
  />
);

/**
 * Figma "Ellipse 1" — Business page only (x:886, y:-23, 623x632). In the
 * 1280-wide frame it spans 886->1509, i.e. it bleeds 229px past the right
 * edge, mirroring how Ellipse 2 bleeds 126px past the left. Both are
 * edge-anchored.
 */
export const PageBlobRight: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute -right-[229px] -top-[23px] z-0 h-[632px] w-[623px] rounded-full bg-[#4176F3]/20"
  />
);

export default PageBlob;
