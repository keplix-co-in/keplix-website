/**
 * In dev the Vite proxy forwards /content to the backend, which sidesteps CORS
 * (the backend only whitelists localhost:5173/5174 and the dev port drifts).
 * In production set VITE_API_BASE_URL to the API origin.
 */
const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export interface BlogPostSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string;
  readTime: number | null;
  publishedAt: string | null;
  author?: { name: string } | null;
}

export interface BlogPostFull extends BlogPostSummary {
  content: string;
}

interface Paginated<T> {
  data: T[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
}

export class ApiUnavailableError extends Error {}

async function getJson<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json' } });
  } catch {
    // Network-level failure: API down, wrong host, or offline.
    throw new ApiUnavailableError('Could not reach the API');
  }

  // 502/503/504 mean the API (or the dev proxy in front of it) is down, which
  // is worth distinguishing from a genuine 404/500 from the API itself.
  if (res.status === 502 || res.status === 503 || res.status === 504) {
    throw new ApiUnavailableError(`API unavailable (${res.status})`);
  }
  if (!res.ok) throw new Error(`Request failed (${res.status})`);

  return res.json() as Promise<T>;
}

export const fetchBlogPosts = () =>
  getJson<Paginated<BlogPostSummary>>('/content/blog/posts').then((r) => r.data);

export const fetchBlogPost = (slug: string) =>
  getJson<BlogPostFull>(`/content/blog/posts/${encodeURIComponent(slug)}`);

/** "12 Aug 2026" — publishedAt can be null for anything not yet live. */
export const formatPostDate = (iso: string | null): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
