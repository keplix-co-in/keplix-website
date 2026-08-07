import React, { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import PageBlob from '../components/PageBlob';

const blogPosts = [
  {
    title: 'When Should You Change Engine Oil?',
    excerpt: 'A complete guide to engine oil change intervals.',
    date: 'May 15, 2024',
    readTime: '5 min read',
    category: 'Maintenance',
  },
  {
    title: 'How to Choose a Good Garage?',
    excerpt: 'Tips to find a reliable and trusted garage.',
    date: 'May 5, 2024',
    readTime: '6 min read',
    category: 'Guides',
  },
  {
    title: 'Monsoon Car Care Tips',
    excerpt: 'Essential car care tips for the rainy season.',
    date: 'Apr 28, 2024',
    readTime: '4 min read',
    category: 'Seasonal',
  },
  {
    title: 'EV Maintenance Guide',
    excerpt: 'Everything you need to know about EV maintenance.',
    date: 'Apr 20, 2024',
    readTime: '5 min read',
    category: 'EV',
  },
  {
    title: 'Tyre Care 101',
    excerpt: 'How to extend tyre life and stay safe on the road.',
    date: 'Apr 15, 2024',
    readTime: '4 min read',
    category: 'Maintenance',
  },
  {
    title: 'Summer Car Care Checklist',
    excerpt: 'Keep your car ready for the summer heat.',
    date: 'Apr 8, 2024',
    readTime: '4 min read',
    category: 'Seasonal',
  },
];

const categories = ['All', 'Maintenance', 'Guides', 'Seasonal', 'EV'];

const Blog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="relative overflow-hidden">
      <PageBlob />

      <section className="relative z-10">
        <div className="mx-auto max-w-page px-4 pb-4 pt-8 text-center sm:px-8">
          <h1 className="text-4xl font-bold text-[#0f172a] sm:text-[56px] sm:leading-[48px]">
            Blogs &amp; Resources
          </h1>
          <p className="mt-5 text-xl text-ink-muted">
            Tips, guides and expert advice for your car care.
          </p>
        </div>
      </section>

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

      <section className="relative z-10 mx-auto max-w-page px-4 py-12 sm:px-8">
        {filteredPosts.length === 0 ? (
          <p className="py-16 text-center text-base text-ink-muted">
            No articles match your search. Try a different keyword or category.
          </p>
        ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <article
              key={post.title}
              className="flex flex-col justify-between rounded-2xl border border-line-soft bg-white p-6 shadow-card transition-shadow hover:shadow-cardHover"
            >
              <div>
                <h3 className="text-lg font-bold text-ink-heading">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">{post.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-ink-faint">
                  {post.date} &middot; {post.readTime}
                </span>
                <ArrowRight className="text-ink" size={18} />
              </div>
            </article>
          ))}
        </div>
        )}

        <div className="mt-10 text-center">
          <a
            href="#"
            className="text-xl font-bold text-[#ef4444] hover:underline"
          >
            View All Blogs
          </a>
        </div>
      </section>
    </div>
  );
};

export default Blog;
