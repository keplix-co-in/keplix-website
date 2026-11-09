// Vitest smoke tests (DEV-29). Rendered through the same SSR entry the
// prerender uses, so no browser/jsdom environment is needed.
import { describe, it, expect, beforeAll } from 'vitest';
import { prepare, render } from '../entry-server';

beforeAll(async () => {
  await prepare();
});

describe('router smoke', () => {
  it.each(['/', '/about', '/services', '/faq', '/contact', '/refund-policy'])(
    'renders %s with a title tag',
    (url) => {
      const { html, head } = render(url);
      expect(html.length).toBeGreaterThan(100);
      expect(head).toMatch(/<title[^>]*>[^<]+<\/title>/);
    },
  );

  it('renders the NotFound page for unknown routes', () => {
    const { html } = render('/definitely-not-a-route');
    expect(html.length).toBeGreaterThan(0);
  });
});

describe('page modules', () => {
  const pages = import.meta.glob('../pages/*.tsx', { eager: true }) as Record<
    string,
    { default?: unknown }
  >;

  it('finds page modules', () => {
    expect(Object.keys(pages).length).toBeGreaterThan(10);
  });

  it.each(Object.keys(pages))('%s default-exports a component', (path) => {
    expect(typeof pages[path].default).toBe('function');
  });
});
