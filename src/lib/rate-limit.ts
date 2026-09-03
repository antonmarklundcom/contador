/**
 * In-memory, per-IP fixed-window rate limit.
 *
 * Deliberately process-local: the site runs on a single Hostinger Node slot
 * and has no database (plan.md §1.5). It stops a script hammering the lead
 * endpoint; it is not a defence against a distributed flood.
 */
interface Window {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Window>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): RateLimitResult {
  const now = Date.now();
  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (windows.size > 5_000) {
    for (const [entryKey, entry] of windows) {
      if (entry.resetAt <= now) windows.delete(entryKey);
    }
  }

  return {
    allowed: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    retryAfter,
  };
}

/** Best-effort client IP behind Hostinger's proxy. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
