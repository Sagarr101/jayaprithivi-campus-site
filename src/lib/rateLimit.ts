/**
 * Simple in-memory rate limiter for API endpoints
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

/**
 * Rate limit middleware function
 * @param identifier - Unique identifier (IP, user ID, etc)
 * @param limit - Maximum requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @returns true if request should be allowed, false if rate limit exceeded
 */
export function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000 // 1 minute default
): boolean {
  const now = Date.now();
  const entry = store.get(identifier);

  // If no entry exists or the window has expired
  if (!entry || now >= entry.resetTime) {
    store.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  // If we're still within the window
  if (entry.count < limit) {
    entry.count++;
    return true;
  }

  return false;
}

/**
 * Get remaining requests for an identifier
 */
export function getRateLimitStatus(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
): { remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now >= entry.resetTime) {
    return {
      remaining: limit,
      resetTime: now + windowMs,
    };
  }

  return {
    remaining: Math.max(0, limit - entry.count),
    resetTime: entry.resetTime,
  };
}

/**
 * Clear rate limit for an identifier (e.g., on successful login)
 */
export function clearRateLimit(identifier: string) {
  store.delete(identifier);
}

/**
 * Clean expired entries periodically
 */
export function cleanupExpiredEntries() {
  const now = Date.now();
  let cleaned = 0;

  for (const [key, value] of store.entries()) {
    if (now >= value.resetTime) {
      store.delete(key);
      cleaned++;
    }
  }

  if (cleaned > 0) {
    console.log(`[RateLimit] Cleaned up ${cleaned} expired entries`);
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
