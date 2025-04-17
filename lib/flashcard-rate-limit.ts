import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Custom rate limiter for flashcards
// 2 requests per 12 hours
const flashcardRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(2, "6h"), // 2 requests per 6 hours
  analytics: true,
});

export const flashcardRateLimit = async (ip: string) => {
  const { success, reset } = await flashcardRateLimiter.limit(ip);

  if (!success) {
    const resetTime = new Date(reset).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return {
      success: false,
      resetAt: resetTime,
    };
  }

  return {
    success: true,
  };
};
