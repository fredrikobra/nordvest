import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export class CacheService {
  static async get(key: string) {
    try {
      return await redis.get(key)
    } catch (error) {
      console.error("Redis get error:", error)
      return null
    }
  }

  static async set(key: string, value: any, ttl = 300) {
    try {
      if (ttl > 0) {
        return await redis.setex(key, ttl, JSON.stringify(value))
      } else {
        return await redis.set(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error("Redis set error:", error)
      return null
    }
  }

  static async del(key: string) {
    try {
      return await redis.del(key)
    } catch (error) {
      console.error("Redis del error:", error)
      return null
    }
  }

  static async invalidatePattern(pattern: string) {
    try {
      const keys = await redis.keys(pattern)
      if (keys.length > 0) {
        return await redis.del(...keys)
      }
      return 0
    } catch (error) {
      console.error("Redis invalidatePattern error:", error)
      return null
    }
  }

  // Specific cache methods
  static async getCachedProjects() {
    const cached = await this.get("projects:all")
    return cached ? JSON.parse(cached as string) : []
  }

  static async cacheProjects(projects: any[]) {
    return await this.set("projects:all", projects, 300) // 5 minutes
  }

  static async getCachedProject(id: string) {
    const cached = await this.get(`project:${id}`)
    return cached ? JSON.parse(cached as string) : null
  }

  static async cacheProject(project: any) {
    return await this.set(`project:${project.id}`, project, 600) // 10 minutes
  }

  static async invalidateProject(id: string) {
    await this.del(`project:${id}`)
    await this.invalidatePattern("projects:*")
  }

  static async getCachedConversations(projectId?: string) {
    const key = projectId ? `conversations:${projectId}` : "conversations:all"
    const cached = await this.get(key)
    return cached ? JSON.parse(cached as string) : []
  }

  static async cacheConversations(conversations: any[], projectId?: string) {
    const key = projectId ? `conversations:${projectId}` : "conversations:all"
    return await this.set(key, conversations, 300) // 5 minutes
  }
}
