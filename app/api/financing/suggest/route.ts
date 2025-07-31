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
    const cacheKey = `financing:${projectId || "anonymous"}`
    const cachedSuggestions = await CacheService.get(cacheKey)

    if (cachedSuggestions) {
      return NextResponse.json(cachedSuggestions)
    }

    // Get AI financing suggestions
    const suggestions = await AIService.suggestFinancing(projectData)

    // Update project with financing options if projectId provided
    if (projectId) {
      await DatabaseService.updateProject(projectId, {
        financing_options: suggestions.suggestions,
      })
    }

    // Cache the suggestions
    await CacheService.set(cacheKey, suggestions, 3600) // 1 hour

    return NextResponse.json(suggestions)
  } catch (error) {
    console.error("Financing suggestion error:", error)
    return NextResponse.json({ error: "Kunne ikke foreslå finansiering" }, { status: 500 })
  }
}
