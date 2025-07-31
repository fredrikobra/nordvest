import { type NextRequest, NextResponse } from "next/server"
import { AIService } from "@/lib/ai"
import { DatabaseService } from "@/lib/database"
import { CacheService } from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const { projectId, projectData } = await request.json()

    if (!projectData) {
      return NextResponse.json({ error: "Prosjektdata er påkrevd" }, { status: 400 })
    }

    // Check cache first
    const cacheKey = `sustainability:${projectId || "anonymous"}`
    const cachedAnalysis = await CacheService.get(cacheKey)

    if (cachedAnalysis) {
      return NextResponse.json(cachedAnalysis)
    }

    // Perform AI analysis
    const analysis = await AIService.analyzeSustainability(projectData)

    // Update project with sustainability score if projectId provided
    if (projectId) {
      await DatabaseService.updateProject(projectId, {
        sustainability_score: analysis.score,
      })
    }

    // Cache the analysis
    await CacheService.set(cacheKey, analysis, 7200) // 2 hours

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Sustainability analysis error:", error)
    return NextResponse.json({ error: "Kunne ikke analysere bærekraft" }, { status: 500 })
  }
}
