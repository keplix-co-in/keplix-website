# Blog drafts for the AdSense re-review

AdSense rejected keplix.co.in for **"Low value content"** (October 2026). The
site already has 14 decent posts, so the problem was not thin content overall.
Three things counted against it:

- **A thin duplicate.** `/blog/summer-car-care-check` is a 355-word near-copy
  of the summer checklist post.
- **No new posts since 2026-09-08.** That weakens the "ongoing curation" signal
  reviewers look for.
- **A young site with little traffic.**

The posts in this folder are the fix. They are **not** read by the build. They
are source text to paste into the admin panel, which saves posts to the
backend `BlogPost` table.

## 1. Do first: unpublish the duplicate

Admin panel → Blogs → open `summer-car-care-check` → set status to **draft** →
save. The original summer checklist post stays live. `vercel.json` already
308-redirects the old URL to `/blog/summer-car-care-checklist`, so any links
or rankings it had pass to the real post. Unpublishing removes it from the
sitemap.

## 2. Publish the drafts: about two a week, not all at once

A sudden burst of posts looks less like ongoing curation than a steady
cadence. Suggested order (dates are targets, not hard rules):

| # | File | Publish by | Why then |
|---|------|-----------|----------|
| 02 | `02-diwali-road-trip-checklist.html` | **2026-10-20** | Diwali is 2026-11-08. It needs to be indexed before people search. |
| 01 | `01-car-ac-not-cooling.html` | 2026-10-23 | |
| 03 | `03-car-battery-signs-and-life.html` | 2026-10-28 | |
| 05 | `05-winter-smog-car-care.html` | 2026-11-02 | Before smog season peaks. |
| 04 | `04-wheel-alignment-vs-balancing.html` | 2026-11-09 | |
| 06 | `06-clutch-wear-city-driving.html` | 2026-11-16 | |

**Order matters for one link:** post 05 links to post 03
(`/blog/car-battery-life-in-india`). Publish 03 first, or that link 404s.
Every other internal link points at a post that is already live.

Then keep going at one or two new posts a week until the review request
(section 4). More topics that do not overlap the live posts:

- periodic service vs general service
- dent repair vs panel replacement
- what a car inspection report should contain
- CNG car maintenance
- car care for cars that sit unused for weeks

### How to paste one

1. Admin panel → Blogs → **New post**.
2. Copy **title**, **slug**, **category**, **read time** and **excerpt** from
   the comment at the top of the file into the matching fields.
3. Switch the editor to HTML/source mode if it has one, and paste everything
   *below* the `-->` line. If it has no source mode, paste into the visual
   editor and check that headings and lists survived.
4. Add a cover image you have the rights to. A photo from an actual partner
   garage is best.
5. Save as **draft**, preview it, then publish.
6. **Redeploy the website** (Vercel → Redeploy, or push to the website repo).
   `scripts/prerender.mjs` fetches posts *at build time* to write the sitemap
   and the prerendered HTML that crawlers read. A post published after the
   last build is missing from both until the next deploy. Unpublishing the
   duplicate needs a redeploy too, to drop it from the sitemap.
7. **Link it from its service page.** Add the post to `SERVICE_GUIDES` in
   `src/constants/serviceLinks.ts` under its service (01 → car-ac-repair,
   02/05/06 → car-service, 03 → car-battery-replacement,
   04 → tyre-replacement-wheel-alignment), then redeploy. Only published posts
   go in that list; a link to an unpublished slug shows "Article not found".

### Before publishing each post: make it yours

These drafts are a solid base, but they are generic. A sentence or two of
real Keplix experience in each post is the strongest "unique value" signal
you can add, and it is what separates your posts from every other car blog.
For example:

- something a partner garage told you;
- a common mistake you see in bookings;
- a typical price range in your city that you have actually seen on invoices.

Do not invent figures. Only add numbers you can stand behind.

Publish each post under a **real named author** (you, or a partner mechanic
with their consent) with a one-line credential, for example "Reviewed by
<name>, 12 years at <garage>, Pune". A named, credible author is one of the
clearest quality signals for both Google and the AdSense reviewer. The posts
currently carry none.

## 3. Check Google is picking them up

In Search Console for keplix.co.in:

- **URL Inspection** → paste each new post URL → *Request indexing*.
- **Sitemap**: open `https://keplix.co.in/sitemap.xml` and confirm the new
  slugs are listed, which means the redeploy in step 6 happened.
- **Performance**: after 3–4 weeks, look for impressions and clicks on the new
  posts. This is the "genuine user interest" signal.

## 4. Request the AdSense review

Wait until **at least late November / early December 2026**, by which time
the following should all be true:

- [ ] `summer-car-care-check` is unpublished
- [ ] all six drafts are published and indexed
- [ ] at least 2–3 further posts are published after them
- [ ] Search Console shows impressions on the new posts
- [ ] the site build containing the `google-adsense-account` meta tag in
      `index.html` is deployed (view-source on the homepage to confirm)

Then AdSense → Sites → keplix.co.in → *Request review*. Each rejection makes
the next review wait longer, so do not request early.

## Things already verified (no action needed)

- `public/ads.txt` has the correct publisher line.
- Ads only render on content pages and only after cookie consent
  (`src/constants/ads.ts`). Auto ads stay off.
- The `google-adsense-account` meta tag in `index.html` lets the reviewer
  see site ownership even though it never accepts cookies.
