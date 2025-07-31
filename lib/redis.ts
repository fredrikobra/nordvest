import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export class CacheService {
  // Cache keys
  private static PROJECTS_KEY = 'projects:all'
  private static PROJECT_KEY = (id: string) => `project:${id}`
  private static CONVERSATIONS_KEY = (projectId?: string) => 
    projectId ? `conversations:project:${projectId}` : 'conversations:all'
  private static AI_ANALYSIS_KEY = (projectId: string) => `ai:analysis:${projectId}`
  private static STATS_KEY = 'stats:projects'

  // Project caching
  static async cacheProjects(projects: any[], ttl = 300) {
    try {
      await redis.setex(this.PROJECTS_KEY, ttl, JSON.stringify(projects))
    } catch (error) {
      console.error('Cache projects error:', error)
    }
  }

  static async getCachedProjects() {
    try {
      const cached = await redis.get(this.PROJECTS_KEY)
      return cached ? JSON.parse(cached as string) : []
    } catch (error) {
      console.error('Get cached projects error:', error)
      return []
    }
  }

  static async cacheProject(project: any, ttl = 600) {
    try {
      await redis.setex(this.PROJECT_KEY(project.id), ttl, JSON.stringify(project))
    } catch (error) {
      console.error('Cache project error:', error)
    }
  }

  static async getCachedProject(id: string) {
    try {
      const cached = await redis.get(this.PROJECT_KEY(id))
      return cached ? JSON.parse(cached as string) : null
    } catch (error) {
      console.error('Get cached project error:', error)
      return null
    }
  }

  // Conversation caching
  static async cacheConversations(conversations: any[], projectId?: string, ttl = 300) {
    try {
      await redis.setex(this.CONVERSATIONS_KEY(projectId), ttl, JSON.stringify(conversations))
    } catch (error) {
      console.error('Cache conversations error:', error)
    }
  }

  static async getCachedConversations(projectId?: string) {
    try {
      const cached = await redis.get(this.CONVERSATIONS_KEY(projectId))
      return cached ? JSON.parse(cached as string) : []
    } catch (error) {
      console.error('Get cached conversations error:', error)
      return []
    }
  }

  // Statistics caching
  static async cacheStats(stats: any, ttl = 600) {
    try {
      await redis.setex(this.STATS_KEY, ttl, JSON.stringify(stats))
    } catch (error) {
      console.error('Cache stats error:', error)
    }
  }

  static async getCachedStats() {
    try {
      const cached = await redis.get(this.STATS_KEY)
      return cached ? JSON.parse(cached as string) : null
    } catch (error) {
      console.error('Get cached stats error:', error)
      return null
    }
  }

  // AI Analysis caching
  static async cacheAIAnalysis(projectId: string, analysis: any, ttl = 3600) {
    try {
      await redis.setex(this.AI_ANALYSIS_KEY(projectId), ttl, JSON.stringify(analysis))
    } catch (error) {
      console.error('Cache AI analysis error:', error)
    }
  }

  static async getCachedAIAnalysis(projectId: string) {
    try {
      const cached = await redis.get(this.AI_ANALYSIS_KEY(projectId))
      return cached ? JSON.parse(cached as string) : null
    } catch (error) {
      console.error('Get cached AI analysis error:', error)
      return null
    }
  }

  // Cache invalidation
  static async invalidateProject(id: string) {
    try {
      await Promise.all([
        redis.del(this.PROJECT_KEY(id)),
        redis.del(this.PROJECTS_KEY),
        redis.del(this.AI_ANALYSIS_KEY(id)),
        redis.del(this.STATS_KEY)
      ])
    } catch (error) {
      console.error('Invalidate project error:', error)
    }
  }

  static async invalidatePattern(pattern: string) {
    try {
      const keys = await redis.keys(pattern)
      if (keys.length > 0) {
        await redis.del(...keys)
      }
    } catch (error) {
      console.error('Invalidate pattern error:', error)
    }
  }

  // General cache operations
  static async set(key: string, value: any, ttl?: number) {
    try {
      if (ttl) {
        await redis.setex(key, ttl, JSON.stringify(value))
      } else {
        await redis.set(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error('Cache set error:', error)
    }
  }

  static async get(key: string) {
    try {
      const cached = await redis.get(key)
      return cached ? JSON.parse(cached as string) : null
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  static async del(key: string) {
    try {
      await redis.del(key)
    } catch (error) {
      console.error('Cache delete error:', error)
    }
  }
}

export { redis }
