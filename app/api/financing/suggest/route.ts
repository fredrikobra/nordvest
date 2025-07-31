import { type NextRequest, NextResponse } from "next/server"
import { AIService } from "@/lib/ai"
import { createFinancingOption } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { projectId, projectData } = await request.json()

    if (!projectId || !projectData) {
      return NextResponse.json({ error: "Project ID and data are required" }, { status: 400 })
    }

    // Get financing suggestions from AI
    const suggestions = await AIService.suggestFinancing(projectData)

    // Save financing options
    for (const option of suggestions.options) {
      await createFinancingOption({
        project_id: projectId,
        type: option.type || "green_loan",
        title: option.description.substring(0, 100),
        description: option.description,
        provider: "AI Suggested",
      })
    }

    return NextResponse.json({
      suggestions: suggestions.suggestions,
      options: suggestions.options,
    })
  } catch (error) {
    console.error("Financing suggestion error:", error)
    return NextResponse.json({ error: "Failed to suggest financing" }, { status: 500 })
  }
}
