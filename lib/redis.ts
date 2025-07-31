import { createClient } from "@upstash/redis"

// Create Redis client
const redis = createClient({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Cache interface
interface CacheOptions {
  ttl?: number // Time to live in seconds
}

class RedisCache {
  private defaultTTL = 3600 // 1 hour default

  async get<T>(key: string): Promise<T | null> {
    try {
      const result = await redis.get(key)
      return result as T
    } catch (error) {
      console.error("Redis get error:", error)
      return null
    }
  }

  async set<T>(key: string, value: T, options?: CacheOptions): Promise<boolean> {
    try {
      const ttl = options?.ttl || this.defaultTTL
      await redis.setex(key, ttl, JSON.stringify(value))
      return true
    } catch (error) {
      console.error("Redis set error:", error)
      return false
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      await redis.del(key)
      return true
    } catch (error) {
      console.error("Redis delete error:", error)
      return false
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await redis.exists(key)
      return result === 1
    } catch (error) {
      console.error("Redis exists error:", error)
      return false
    }
  }

  generateKey(...parts: string[]): string {
    return parts.join(":")
  }
}

export const redisCache = new RedisCache()
export const cache = redisCache // Named export for compatibility
