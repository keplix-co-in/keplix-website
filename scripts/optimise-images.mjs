/**
 * One-shot image optimiser for public/.
 *
 * Run with `npm run images:optimise`. Rewrites oversized source images in
 * place and keeps the filenames, so no markup has to change — then rewrites
 * the width/height attributes in src/ to match the new intrinsic sizes, since
 * stale dimensions would reintroduce exactly the layout shift they were added
 * to prevent.
 *
 * Why it was needed: several assets shipped far larger than they are ever
 * displayed — biz-cta-illustration.png was 4095x4096 for a slot a few hundred
 * pixels wide, and home-app-screen-3.png was 725 KB. Mobile visitors paid for
 * every byte.
 *
 * Deliberately in-place and idempotent: running it twice is a no-op once every
 * image is already within budget.
 */
import sharp from 'sharp';
import { readdir, stat, readFile, writeFile, rename } from 'node:fs/promises';
import { resolve, dirname, extname, basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const SRC = join(ROOT, 'src');

/** Nothing on this site is displayed wider than this, even at 2x on a large screen. */
const MAX_WIDTH = 1600;
/** Below this, re-encoding costs more complexity than it saves bytes. */
const MIN_SIZE_TO_TOUCH = 60_000;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (/\.tsx?$/.test(entry.name)) out.push(p);
  }
  return out;
}

async function main() {
  const files = (await readdir(PUBLIC)).filter((f) => /\.(png|jpe?g)$/i.test(f));
  const dimensions = new Map();
  let before = 0;
  let after = 0;

  for (const file of files) {
    const path = join(PUBLIC, file);
    const original = (await stat(path)).size;
    const isPng = /\.png$/i.test(file);
    const meta = await sharp(path).metadata();

    if (original < MIN_SIZE_TO_TOUCH && meta.width <= MAX_WIDTH) {
      dimensions.set('/' + file, [meta.width, meta.height]);
      continue;
    }

    const pipeline = sharp(path).resize({
      width: Math.min(meta.width, MAX_WIDTH),
      withoutEnlargement: true,
    });

    // PNG stays PNG and JPEG stays JPEG so every existing src keeps working.
    // palette:true is what actually shrinks these — they're illustrations and
    // UI screenshots, which quantise to 256 colours with no visible loss.
    const buffer = await (isPng
      ? pipeline.png({ palette: true, quality: 82, effort: 8 })
      : pipeline.jpeg({ quality: 82, mozjpeg: true })
    ).toBuffer();

    // Only keep the new file if it is actually smaller.
    if (buffer.length < original) {
      const tmp = path + '.tmp';
      await writeFile(tmp, buffer);
      await rename(tmp, path);
      after += buffer.length;
    } else {
      after += original;
    }

    before += original;
    const now = await sharp(path).metadata();
    dimensions.set('/' + file, [now.width, now.height]);
    console.log(
      `${file.padEnd(32)} ${(original / 1024).toFixed(0).padStart(5)}KB -> ` +
        `${((await stat(path)).size / 1024).toFixed(0).padStart(5)}KB  ${now.width}x${now.height}`,
    );
  }

  // Resizing changes the intrinsic size, so any width/height attribute
  // referring to these files is now wrong.
  let patched = 0;
  for (const file of await walk(SRC)) {
    const source = await readFile(file, 'utf8');
    let next = source;

    for (const [src, [w, h]] of dimensions) {
      const escaped = src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      next = next.replace(
        new RegExp(`(src="${escaped}"[\\s\\S]{0,400}?)width=\\{\\d+\\}\\s*height=\\{\\d+\\}`, 'g'),
        `$1width={${w}} height={${h}}`,
      );
    }

    if (next !== source) {
      await writeFile(file, next, 'utf8');
      patched += 1;
      console.log(`patched dimensions in ${file.replace(ROOT, '.')}`);
    }
  }

  console.log(
    `\n${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB ` +
      `across ${dimensions.size} images; ${patched} source files updated.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
