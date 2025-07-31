import { type NextRequest, NextResponse } from "next/server"
import { healthCheck } from "@/lib/supabase"
import { redisCache } from "@/lib/redis"

export async function GET(request: NextRequest) {
  try {
    // Check database health
    const dbHealth = await healthCheck()

    // Check Redis health
    let redisHealth
    try {
      await redisCache.set("health_check", "ok", 10)
      const testValue = await redisCache.get("health_check")
      redisHealth = {
        status: testValue === "ok" ? "healthy" : "unhealthy",
        connection: "connected",
      }
    } catch (error) {
      redisHealth = {
        status: "unhealthy",
        connection: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }

    // Overall health status
    const isHealthy = dbHealth.status === "healthy" && redisHealth.status === "healthy"

    const healthStatus = {
      status: isHealthy ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealth,
        redis: redisHealth,
      },
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
    }

    return NextResponse.json(healthStatus, {
      status: isHealthy ? 200 : 503,
    })
  } catch (error) {
    console.error("Health check error:", error)

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 503,
      },
    )
  }
}
