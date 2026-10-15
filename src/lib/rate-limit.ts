/**
 * Proportionate in-memory rate limit for serverless form posts.
 * Not a global distributed lock — enough to slow casual abuse on a single instance.
 * On multi-instance hosts (e.g. Vercel), each instance has its own Map. For stronger
 * production abuse control, replace with a shared store (KV/Upstash) later.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSec: number };

export function checkRateLimit(
  key: string,
  options: { limit: number; windowMs: number } = {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  },
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return { ok: true, remaining: options.limit - 1 };
  }

  if (existing.count >= options.limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { ok: true, remaining: options.limit - existing.count };
}

export function clientKeyFromRequest(request: Request, scope: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";
  return `${scope}:${ip}`;
}

/** Test helper — clears memory between unit tests. */
export function resetRateLimitStore(): void {
  buckets.clear();
}
