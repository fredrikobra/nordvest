import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export class CacheService {
  private static TTL = 3600 // 1 hour

  static async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key)
      return data as T
    } catch (error) {
      console.error("Cache get error:", error)
      return null
    }
  }

  static async set(key: string, value: any, ttl: number = this.TTL): Promise<void> {
    try {
      await redis.setex(key, ttl, JSON.stringify(value))
    } catch (error) {
      console.error("Cache set error:", error)
    }
  }

  static async del(key: string): Promise<void> {
    try {
      await redis.del(key)
    } catch (error) {
      console.error("Cache delete error:", error)
    }
  }

  static async invalidatePattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern)
      if (keys.length > 0) {
        await redis.del(...keys)
      }
    } catch (error) {
      console.error("Cache invalidate error:", error)
    }
  }

  // Project-specific cache methods
  static async cacheProject(project: any): Promise<void> {
    await this.set(`project:${project.id}`, project)
  }

  static async getCachedProject(id: string): Promise<any> {
    return await this.get(`project:${id}`)
  }

  static async invalidateProject(id: string): Promise<void> {
    await this.del(`project:${id}`)
    await this.invalidatePattern("projects:*")
  }

  static async cacheProjects(projects: any[]): Promise<void> {
    await this.set("projects:all", projects)
  }

  static async getCachedProjects(): Promise<any[]> {
    return (await this.get("projects:all")) || []
  }
}
