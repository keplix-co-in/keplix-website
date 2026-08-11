import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DOMPurify from 'dompurify';
import PageBlob from '../components/PageBlob';
import AdSlot from '../components/AdSlot';
import { fetchBlogPost, formatPostDate, type BlogPostFull } from '../lib/api';

/**
 * Only inject a mid-article ad once the piece is long enough that it isn't
 * the dominant element on the page — short posts get the top and end units
 * only.
 */
const MIN_BLOCKS_FOR_MID_AD = 6;
const MID_AD_AFTER_BLOCK = 3;

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const [midAdHost, setMidAdHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    fetchBlogPost(slug)
      .then((data) => {
        if (!cancelled) setPost(data);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // The body is author-written HTML. It's already sanitised server-side on
  // write; sanitising again here means a bad row in the DB still can't run
  // script in a visitor's browser.
  const safeHtml = useMemo(
    () => (post ? DOMPurify.sanitize(post.content) : ''),
    [post],
  );

  /**
   * Creates a host element part-way through the article for an in-content ad.
   *
   * The body is injected as one opaque HTML string via dangerouslySetInnerHTML,
   * so React never sees the individual paragraphs and there is no JSX seam to
   * render into. Rather than splitting the HTML (which can cut through a
   * <pre>, <table> or <blockquote>), this inserts an empty container into the
   * rendered DOM and then portals the ad into it — React still owns the ad
   * component's lifecycle, and the article markup is untouched.
   *
   * Keyed on safeHtml because React replaces the whole subtree when the
   * article changes, which silently discards any node we added.
   */
  useEffect(() => {
    setMidAdHost(null);
    const body = bodyRef.current;
    if (!body || !safeHtml) return;

    const blocks = Array.from(body.children);
    if (blocks.length < MIN_BLOCKS_FOR_MID_AD) return;

    const anchor = blocks[MID_AD_AFTER_BLOCK];
    if (!anchor) return;

    const host = document.createElement('div');
    body.insertBefore(host, anchor);
    setMidAdHost(host);

    return () => {
      host.remove();
    };
  }, [safeHtml]);

  return (
    <div className="relative overflow-hidden">
      <PageBlob />

      <article className="relative z-10 mx-auto max-w-[860px] px-4 py-12 sm:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted transition-colors hover:text-brand-red"
        >
          <ArrowLeft size={16} />
          Back to blogs
        </Link>

        {loading && (
          <div className="mt-10 space-y-4">
            <div className="h-10 w-3/4 animate-pulse rounded bg-white/70" />
            <div className="h-64 animate-pulse rounded-2xl bg-white/70" />
            <div className="h-4 w-full animate-pulse rounded bg-white/70" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-white/70" />
          </div>
        )}

        {!loading && notFound && (
          <div className="py-20 text-center">
            <h1 className="text-3xl font-bold text-ink">Article not found</h1>
            <p className="mt-3 text-ink-muted">
              This post may have been moved or unpublished.
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-block rounded-btn bg-brand-red px-6 py-3 font-bold text-white"
            >
              Browse all articles
            </Link>
          </div>
        )}

        {!loading && post && (
          <>
            {/* Above the header rather than between the header and the cover
                image: the cover has no intrinsic size and already shifts as it
                loads, so an ad there would compound the movement.

                Every slot is keyed on slug because BlogPost does NOT unmount
                when navigating between articles (it re-fetches on [slug]), and
                AdSense will not re-fill an <ins> it has already filled. */}
            <AdSlot key={`top-${slug}`} slot="articleTop" className="mt-8" />

            <header className="mt-8">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-red">
                {post.category}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-[40px] sm:leading-[52px]">
                {post.title}
              </h1>
              <p className="mt-4 text-sm text-ink-faint">
                {[
                  post.author?.name,
                  formatPostDate(post.publishedAt),
                  post.readTime ? `${post.readTime} min read` : null,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </header>

            {post.coverImage && (
              <img
                src={post.coverImage}
                alt=""
                className="mt-8 w-full rounded-2xl object-cover"
                loading="lazy"
                decoding="async"
              />
            )}

            <div
              ref={bodyRef}
              className="blog-body mt-10"
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />

            {midAdHost &&
              createPortal(
                <AdSlot key={`mid-${slug}`} slot="articleMid" className="my-8" />,
                midAdHost,
              )}

            <AdSlot key={`end-${slug}`} slot="articleEnd" className="mt-12" />
          </>
        )}
      </article>
    </div>
  );
};

export default BlogPost;
