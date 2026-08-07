import React from 'react';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: 'When Should You Change Engine Oil?',
    excerpt: 'A complete guide to engine oil change intervals.',
    date: 'May 15, 2024',
    readTime: '5 min read',
  },
  {
    title: 'How to Choose a Good Garage?',
    excerpt: 'Tips to find a reliable and trusted garage.',
    date: 'May 5, 2024',
    readTime: '6 min read',
  },
  {
    title: 'Monsoon Car Care Tips',
    excerpt: 'Essential car care tips for the rainy season.',
    date: 'Apr 28, 2024',
    readTime: '4 min read',
  },
  {
    title: 'EV Maintenance Guide',
    excerpt: 'Everything you need to know about EV maintenance.',
    date: 'Apr 20, 2024',
    readTime: '5 min read',
  },
  {
    title: 'Tyre Care 101',
    excerpt: 'How to extend tyre life and stay safe on the road.',
    date: 'Apr 15, 2024',
    readTime: '4 min read',
  },
  {
    title: 'Summer Car Care Checklist',
    excerpt: 'Keep your car ready for the summer heat.',
    date: 'Apr 8, 2024',
    readTime: '4 min read',
  },
];

const Blog: React.FC = () => {
  return (
    <div>
      <section className="mx-auto max-w-page px-4 pb-4 pt-8 text-center sm:px-8">
        <h1 className="text-4xl font-bold text-[#0f172a] sm:text-[56px] sm:leading-[48px]">
          Blogs &amp; Resources
        </h1>
        <p className="mt-5 text-xl text-ink-muted">
          Tips, guides and expert advice for your car care.
        </p>
      </section>

      <section className="mx-auto max-w-page px-4 py-12 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {blogPosts.map((post) => (
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
