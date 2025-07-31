import { type NextRequest, NextResponse } from "next/server"
import { AIService } from "@/lib/ai"
import { createSustainabilityRecommendation, updateProject } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { projectId, projectData } = await request.json()

    if (!projectId || !projectData) {
      return NextResponse.json({ error: "Project ID and data are required" }, { status: 400 })
    }

    // Analyze sustainability with AI
    const analysis = await AIService.analyzeSustainability(projectData)

    // Update project with sustainability score
    await updateProject(projectId, {
      sustainability_score: analysis.score,
    })

    // Save recommendations
    for (const recommendation of analysis.recommendations) {
      await createSustainabilityRecommendation({
        project_id: projectId,
        category: "AI Generated",
        title: recommendation.substring(0, 100),
        description: recommendation,
        impact_score: analysis.score,
        priority: 1,
      })
    }

    return NextResponse.json({
      score: analysis.score,
      analysis: analysis.analysis,
      recommendations: analysis.recommendations,
    })
  } catch (error) {
    console.error("Sustainability analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze sustainability" }, { status: 500 })
  }
}
