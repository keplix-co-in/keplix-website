import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import PageBlob from '../components/PageBlob';
import {
  ApiUnavailableError,
  fetchBlogPosts,
  formatPostDate,
  type BlogPostSummary,
} from '../lib/api';
import { sectionSubtitleClass, cardTitleClass } from '../constants/typography';
import AdSlot from '../components/AdSlot';
import { getInitialData } from '../lib/initialData';
import Seo from '../components/Seo';
import { breadcrumbSchema } from '../constants/schema';

const Blog: React.FC = () => {
  // Seeded from the build-time payload so the prerendered HTML actually lists
  // the articles. Without it this page shipped a heading and no links at all.
  // The client re-fetches below to pick up anything published since the deploy.
  const initialPosts = getInitialData().posts;
  const [posts, setPosts] = useState<BlogPostSummary[]>(initialPosts ?? []);
  const [loading, setLoading] = useState(!initialPosts);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    let cancelled = false;

    fetchBlogPosts()
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .catch((err) => {
        if (cancelled) return;
        // A background refresh that fails must not wipe out the posts already
        // on screen from the build-time payload.
        if (initialPosts?.length) return;
        // In dev, an unreachable API almost always means the backend isn't
        // running — say so instead of a vague "something went wrong".
        setLoadError(
          err instanceof ApiUnavailableError && import.meta.env.DEV
            ? 'Cannot reach the API. Start the backend: cd keplix-backend && npm start'
            : "We couldn't load the articles just now.",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [initialPosts]);

  // Categories come from whatever is actually published, so a new category in
  // the admin shows up here without a code change.
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        (post.excerpt ?? '').toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [posts, search, activeCategory]);

  return (
    <main className="relative overflow-hidden">
      <PageBlob />

      <Seo
        title="Car Care Blog — Tips, Guides and Advice"
        description="Practical car maintenance guides, servicing advice and cost breakdowns from the Keplix team. Learn what your car actually needs and what it should cost."
        jsonLd={[breadcrumbSchema([{ name: 'Blog', path: '/blog' }])]}
      />

      <section className="relative z-10">
        <div className="mx-auto max-w-page px-4 pb-4 pt-8 text-center sm:px-8">
          {/* leading was 48px against a 56px font, so a title that wrapped to
              two lines overlapped itself and clipped descenders at >=640px. */}
          <h1 className="text-4xl font-bold leading-tight text-[#0f172a] sm:text-[56px] sm:leading-[64px]">
            Blogs &amp; Resources
          </h1>
          <p className={`${sectionSubtitleClass} mt-5 text-ink-muted`}>
            Tips, guides and expert advice for your car care.
          </p>
        </div>
      </section>

      {!loading && !loadError && posts.length > 0 && (
        <section className="relative z-10 mx-auto max-w-page px-4 pt-8 sm:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
                size={18}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-btn border border-line bg-white py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition-colors focus:border-ink"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeCategory === category
                      ? 'bg-brand-red text-white'
                      : 'border border-line bg-white text-ink-body hover:border-ink'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative z-10 mx-auto max-w-page px-4 py-12 sm:px-8">
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl border border-line-soft bg-white/60"
              />
            ))}
          </div>
        )}

        {!loading && loadError && (
          <p className="py-16 text-center text-base text-ink-muted">
            {loadError} Please refresh, or email us at{' '}
            <a href="mailto:support@keplix.co.in" className="text-brand-red">
              support@keplix.co.in
            </a>
            .
          </p>
        )}

        {!loading && !loadError && posts.length === 0 && (
          <p className="py-16 text-center text-base text-ink-muted">
            No articles published yet — check back soon.
          </p>
        )}

        {!loading && !loadError && posts.length > 0 && (
          <>
            {filteredPosts.length === 0 ? (
              <p className="py-16 text-center text-base text-ink-muted">
                No articles match your search. Try a different keyword or
                category.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredPosts.map((post, i) => (
                  <React.Fragment key={post.id}>
                  {/* Full-width so it never shifts a card into the opposite
                      column. Placed after the 4th post rather than at the top
                      so the page leads with content. Only rendered once there
                      are enough posts for it not to dominate the page. */}
                  {i === 4 && filteredPosts.length > 5 && (
                    <AdSlot slot="blogGrid" className="sm:col-span-2" />
                  )}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex flex-col justify-between overflow-hidden rounded-2xl border border-line-soft bg-white shadow-card transition-shadow hover:shadow-cardHover"
                  >
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-44 w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-brand-red">
                          {post.category}
                        </span>
                        <h3 className={`${cardTitleClass} mt-2 text-ink-heading`}>
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="mt-2 text-sm text-ink-muted">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-xs text-ink-faint">
                          {formatPostDate(post.publishedAt)}
                          {post.readTime ? ` · ${post.readTime} min read` : ''}
                        </span>
                        <ArrowRight className="text-ink" size={18} />
                      </div>
                    </div>
                  </Link>
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* This page is the full listing, so "view all" means clearing any
                active search or category filter. */}
            {(search !== '' || activeCategory !== 'All') && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => {
                    setSearch('');
                    setActiveCategory('All');
                  }}
                  className="text-xl font-bold text-[#ef4444] hover:underline"
                >
                  View All Blogs
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Blog;
