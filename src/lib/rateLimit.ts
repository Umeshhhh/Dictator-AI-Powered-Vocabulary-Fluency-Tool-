import { getRedis } from "./redis"

type RateLimitOptions = {
    key: string,
    limit: number,
    windowSeconds: number
}

export const rateLimit = async ({ 
    key, 
    limit, 
    windowSeconds
} : RateLimitOptions) => {

    const redis = await getRedis();
    const result = await redis.eval(
        `
        local count = redis.call("INCR", KEYS[1])
        if count == 1 then
          redis.call("EXPIRE", KEYS[1], ARGV[1])
        end
        local ttl = redis.call("TTL", KEYS[1])
        return { count, ttl }
        `,
        {
            keys: [key],
            arguments: [String(windowSeconds)]
        }
    );

    const [countResult, ttlResult] = Array.isArray(result) ? result : [0, -1];
    const count = Number(countResult);
    const resetInSeconds = Number(ttlResult);

    return {
        success : count <= limit,
        count,
        remaining: Math.max(0, limit - count),
        limit,
        resetInSeconds
    };

}

export const resetRateLimit = async (key: string) => {
    const redis = await getRedis();
    await redis.del(key);
}
