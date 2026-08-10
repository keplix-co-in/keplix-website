import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DOMPurify from 'dompurify';
import PageBlob from '../components/PageBlob';
import { fetchBlogPost, formatPostDate, type BlogPostFull } from '../lib/api';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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
              />
            )}

            <div
              className="blog-body mt-10"
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />
          </>
        )}
      </article>
    </div>
  );
};

export default BlogPost;
