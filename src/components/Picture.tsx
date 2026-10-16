import React from 'react';

/**
 * <img> with a WebP sibling offered first.
 *
 * Every raster in public/ that a page shows has a .webp next to it, generated
 * with sharp at quality 80 — about a third of the PNG bytes on average, and
 * home-app-screen-3 went from 237 KB to 63 KB. The PNG/JPG stays as the <img>
 * fallback rather than being deleted: browsers without WebP still get a
 * picture, and og-image.png and the logos have to stay PNG anyway for social
 * cards and schema.org, so public/ keeps both formats on purpose.
 *
 * If you add an image here, add its .webp too (sharp, quality 80) — this
 * component assumes the sibling exists and would otherwise 404 its source.
 */
type PictureProps = React.ImgHTMLAttributes<HTMLImageElement> & { src: string };

const Picture: React.FC<PictureProps> = ({ src, ...img }) => (
  // display:contents so the <img> stays the flex/grid item and its layout
  // classes (shrink-0, self-center, hidden sm:block) keep working unchanged.
  <picture className="contents">
    <source srcSet={src.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
    <img src={src} {...img} />
  </picture>
);

export default Picture;
