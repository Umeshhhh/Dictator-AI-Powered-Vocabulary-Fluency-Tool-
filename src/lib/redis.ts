import { createClient } from "redis";

const globalForRedis = global as unknown as { redis: ReturnType<typeof createClient> }

export const redis = globalForRedis.redis || createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

(async () => {
  if (!redis.isOpen) {
    try {
      await redis.connect();
      console.log("✅ Redis connected");
    } catch (err) {
      console.error("Redis connection error:", err);
    }
  }
})();
