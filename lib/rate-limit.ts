import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(2, "60s"),
  analytics: true,
});

export const rateLimit = async (ip: string) => {
  const { success, reset } = await rateLimiter.limit(ip);

  if (!success) {
    const resetTime = new Date(reset).toLocaleString('en-US', {
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
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
