import { type NextRequest, NextResponse } from "next/server"
import { AIService } from "@/lib/ai"
import { sustainabilityApi } from "@/lib/supabase"
import { cache } from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const { projectId, description } = await request.json()

    // Check cache first
    const cacheKey = `sustainability:${projectId}`
    const cachedAnalysis = await cache.getCachedAnalysis(cacheKey)
    if (cachedAnalysis) {
      return NextResponse.json(cachedAnalysis)
    }

    // Generate AI analysis
    const analysis = await AIService.generateSustainabilityAnalysis(description)

    // Save recommendations to Supabase
    for (const recommendation of analysis.recommendations) {
      await sustainabilityApi.create({
        project_id: projectId,
        category: "AI Generated",
        title: recommendation,
        description: recommendation,
        impact_score: analysis.score,
        cost_estimate: null,
        savings_estimate: null,
        implementation_time: null,
        priority: 1,
      })
    }

    // Cache the analysis
    await cache.cacheAnalysis(cacheKey, analysis)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("POST /api/sustainability/analyze error:", error)
    return NextResponse.json({ error: "Failed to analyze sustainability" }, { status: 500 })
  }
}
