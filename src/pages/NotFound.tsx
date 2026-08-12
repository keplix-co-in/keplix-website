import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import PageBlob from '../components/PageBlob';
import Seo from '../components/Seo';

/**
 * Catch-all route.
 *
 * Before this existed, every mistyped or stale URL returned HTTP 200 with an
 * empty app shell — a soft-404 farm that search engines will happily index and
 * that wastes crawl budget on URLs that were never real. `noindex` here keeps
 * them out of the index even though a static host still answers 200.
 */
const NotFound: React.FC = () => (
  <div className="relative overflow-hidden">
    <PageBlob />
    <Seo
      title="Page not found"
      description="The page you were looking for doesn't exist or has moved."
      noindex
    />

    <main className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center sm:px-8">
      <div className="flex justify-center mb-4">
        <Compass className="h-14 w-14 text-brand-red" />
      </div>
      <h1 className="text-4xl font-bold text-ink md:text-5xl">Page not found</h1>
      <p className="mt-4 text-lg text-ink-muted">
        The page you were looking for doesn&apos;t exist, or it may have moved.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="inline-flex h-11 items-center rounded-btn bg-brand-red px-6 text-sm font-bold text-white transition-colors hover:bg-brand-redHover"
        >
          Back to home
        </Link>
        <Link
          to="/blog"
          className="inline-flex h-11 items-center rounded-btn border border-line bg-white px-6 text-sm font-bold text-ink transition-colors hover:border-ink"
        >
          Read the blog
        </Link>
        <Link
          to="/faq"
          className="inline-flex h-11 items-center rounded-btn border border-line bg-white px-6 text-sm font-bold text-ink transition-colors hover:border-ink"
        >
          Browse FAQs
        </Link>
      </div>
    </main>
  </div>
);

export default NotFound;
