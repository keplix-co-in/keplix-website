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

// getJson trusts `res.json()` to match T with no runtime check (audit #129):
// a proxy misconfiguration or an API error response that still returns 200
// (e.g. an HTML fallback page) would otherwise flow straight into components
// as if it were valid data instead of failing loudly. These two checks cover
// the actual failure mode -- wrong top-level shape -- without adding a
// schema-validation dependency for a two-endpoint site.
function assertPaginated<T>(value: unknown, path: string): Paginated<T> {
  if (
    !value ||
    typeof value !== 'object' ||
    !Array.isArray((value as Paginated<T>).data)
  ) {
    throw new Error(`Unexpected response shape from ${path}`);
  }
  return value as Paginated<T>;
}

function assertBlogPost(value: unknown, path: string): BlogPostFull {
  if (
    !value ||
    typeof value !== 'object' ||
    typeof (value as BlogPostFull).slug !== 'string' ||
    typeof (value as BlogPostFull).content !== 'string'
  ) {
    throw new Error(`Unexpected response shape from ${path}`);
  }
  return value as BlogPostFull;
}

export const fetchBlogPosts = () =>
  getJson<unknown>('/content/blog/posts').then(
    (r) => assertPaginated<BlogPostSummary>(r, '/content/blog/posts').data,
  );

export const fetchBlogPost = (slug: string) => {
  const path = `/content/blog/posts/${encodeURIComponent(slug)}`;
  return getJson<unknown>(path).then((r) => assertBlogPost(r, path));
};

export interface JobSheetItem {
  component: string;
  // Null when the vendor saved the sheet without filling this item in — the
  // "skip" path still records the sheet so the job can always be completed.
  status: 'GOOD' | 'ATTENTION' | 'REPLACE' | null;
  // Present on walk-in service items, which carry a price; null on inspection
  // components.
  price?: string | number | null;
  notes: string | null;
  photos: string[];
}

export interface JobSheetData {
  odometer_km: number | null;
  overall_notes: string | null;
  submitted_at: string;
  items: JobSheetItem[];
}

/** Shape returned by the public, unauthenticated /content/job-sheet/:token
 * endpoint — already redacted server-side (no phone, no email, no internal
 * ids, registration masked to last 4). See jobSheetController.js. */
export interface JobSheetResponse {
  type: 'walk_in' | 'booking';
  status: string;
  customer_first_name: string;
  vehicle?: { registration: string; make: string | null; model: string | null } | null;
  garage: { name: string; city: string | null };
  description?: string | null;
  amount_collected?: string | number | null;
  started_at?: string | null;
  completed_at?: string | null;
  service_name?: string;
  health_sheet: JobSheetData | null;
}

/** Returns null on a genuine 404 (bad/expired token) rather than throwing —
 * that's an expected, common outcome here, not an error condition. */
export async function fetchJobSheet(token: string): Promise<JobSheetResponse | null> {
  let res: Response;
  try {
    res = await fetch(`${BASE}/content/job-sheet/${encodeURIComponent(token)}`, {
      headers: { Accept: 'application/json' },
    });
  } catch {
    throw new ApiUnavailableError('Could not reach the API');
  }

  if (res.status === 404) return null;
  if (res.status === 502 || res.status === 503 || res.status === 504) {
    throw new ApiUnavailableError(`API unavailable (${res.status})`);
  }
  if (!res.ok) throw new Error(`Request failed (${res.status})`);

  const body: unknown = await res.json();
  if (
    !body ||
    typeof body !== 'object' ||
    typeof (body as JobSheetResponse).status !== 'string' ||
    typeof (body as JobSheetResponse).customer_first_name !== 'string' ||
    !(body as JobSheetResponse).garage
  ) {
    throw new Error('Unexpected response shape from /content/job-sheet');
  }
  return body as JobSheetResponse;
}

/** "12 Aug 2026" — publishedAt can be null for anything not yet live. */
export const formatPostDate = (iso: string | null): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
