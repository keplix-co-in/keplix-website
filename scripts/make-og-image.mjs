/**
 * Generates public/og-image.png — the 1200x630 card used for link previews.
 *
 * Previously og:image pointed at the square logo, which social platforms
 * letterbox or crop badly. Regenerate with `node scripts/make-og-image.mjs`
 * after a brand change.
 */
import sharp from 'sharp';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fef2f2"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="10" fill="#e11d48"/>
  <text x="80" y="250" font-family="Helvetica,Arial,sans-serif" font-size="76" font-weight="bold" fill="#0f172a">Compare. Book. Drive.</text>
  <text x="80" y="340" font-family="Helvetica,Arial,sans-serif" font-size="38" fill="#475569">Compare prices from verified car workshops,</text>
  <text x="80" y="394" font-family="Helvetica,Arial,sans-serif" font-size="38" fill="#475569">book in minutes and track it in real time.</text>
  <text x="80" y="520" font-family="Helvetica,Arial,sans-serif" font-size="44" font-weight="bold" fill="#e11d48">keplix.co.in</text>
</svg>`;

const logo = await sharp(join(ROOT, 'public', 'keplix-logo.png'))
  .resize({ width: 190, height: 190, fit: 'inside' })
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logo, top: 60, left: 940 }])
  .png()
  .toFile(join(ROOT, 'public', 'og-image.png'));

console.log('wrote public/og-image.png (1200x630)');
