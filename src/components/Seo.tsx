import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_TAGLINE,
  absoluteUrl,
} from '../constants/site';

interface SeoProps {
  /** Page title WITHOUT the brand suffix — that's appended here. */
  title?: string;
  description?: string;
  /** Absolute or root-relative image URL for social share cards. */
  image?: string;
  /** Override the canonical URL. Defaults to the current path. */
  canonical?: string;
  /** Keep this page out of the index (404s, thin utility pages). */
  noindex?: boolean;
  /** 'article' for blog posts, otherwise 'website'. */
  type?: 'website' | 'article';
  /** Article-only metadata. */
  publishedTime?: string | null;
  author?: string | null;
  /** JSON-LD blocks for this page. */
  jsonLd?: Record<string, unknown>[];
}

/**
 * Per-page metadata.
 *
 * Every route previously shared one <title> and one description from
 * index.html, so in a search index every page was a duplicate of every other
 * and no page could rank on its own terms.
 *
 * Uses react-helmet-async rather than a client-only title effect because the
 * prerender needs to read these tags on the server — see src/entry-server.tsx,
 * which pulls them out of the Helmet context and writes them into the static
 * HTML. Tags injected only in the browser are invisible to crawlers that
 * don't execute JavaScript, which is most AI crawlers.
 */
const Seo: React.FC<SeoProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  canonical,
  noindex = false,
  type = 'website',
  publishedTime,
  author,
  jsonLd = [],
}) => {
  const { pathname } = useLocation();
  const url = canonical ? absoluteUrl(canonical) : absoluteUrl(pathname);
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;
  const imageUrl = absoluteUrl(image);

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {/* No canonical on noindex pages. The 404 renders under whatever URL was
          missed, so a canonical there would announce a real, indexable page at
          a URL that does not exist. */}
      {!noindex && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="en_IN" />
      {type === 'article' && publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}
      {type === 'article' && author ? (
        <meta property="article:author" content={author} />
      ) : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
