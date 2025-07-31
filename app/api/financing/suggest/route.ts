import { type NextRequest, NextResponse } from "next/server"
import { AIService } from "@/lib/ai"
import { financingApi } from "@/lib/supabase"
import { cache } from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const { projectId, budget, sustainabilityScore } = await request.json()

    // Check cache first
    const cacheKey = `financing:${projectId}`
    const cachedSuggestions = await cache.getCachedAnalysis(cacheKey)
    if (cachedSuggestions) {
      return NextResponse.json(cachedSuggestions)
    }

    // Generate AI suggestions
    const suggestions = await AIService.generateFinancingSuggestions(budget, sustainabilityScore)

    // Save options to Supabase
    for (const option of suggestions.options) {
      await financingApi.create({
        project_id: projectId,
        type: option.type as any,
        title: `${option.provider} - ${option.type}`,
        description: option.description,
        amount: option.amount,
        interest_rate: option.interestRate,
        term_months: 60,
        requirements: option.requirements,
        benefits: [],
        provider: option.provider,
        application_url: null,
      })
    }

    // Cache the suggestions
    await cache.cacheAnalysis(cacheKey, suggestions)

    return NextResponse.json(suggestions)
  } catch (error) {
    console.error("POST /api/financing/suggest error:", error)
    return NextResponse.json({ error: "Failed to generate financing suggestions" }, { status: 500 })
  }
}
