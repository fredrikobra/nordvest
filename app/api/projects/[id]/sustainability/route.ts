import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai"
import { projectsApi, sustainabilityApi, analyticsApi } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id

    // Get existing recommendations
    const recommendations = await sustainabilityApi.getByProjectId(projectId)

    return NextResponse.json({
      success: true,
      data: recommendations,
    })
  } catch (error) {
    console.error("GET sustainability error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch sustainability recommendations" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id

    // Get project details
    const project = await projectsApi.getById(projectId)
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    // Log analytics event
    await analyticsApi.logEvent(projectId, "sustainability_analysis_requested", {
      project_type: project.project_type,
      square_meters: project.square_meters,
      timestamp: new Date().toISOString(),
    })

    // Generate AI sustainability analysis
    const analysis = await aiService.analyzeSustainability({
      id: project.id,
      name: project.name,
      description: project.description || undefined,
      location: project.location || undefined,
      project_type: project.project_type || undefined,
      square_meters: project.square_meters || undefined,
      budget_range: project.budget_range || undefined,
      sustainability_score: project.sustainability_score || undefined,
      estimated_cost: project.estimated_cost || undefined,
      special_requirements: project.special_requirements || undefined,
    })

    // Save recommendations to database
    const savedRecommendations = await Promise.all(
      analysis.recommendations.map((rec) =>
        sustainabilityApi.create({
          project_id: projectId,
          category: rec.category,
          title: rec.title,
          description: rec.description,
          impact_score: rec.impact_score,
          cost_estimate: rec.cost_estimate,
          savings_estimate: rec.savings_estimate,
          implementation_time: rec.implementation_time,
          priority: rec.priority,
          status: "pending",
          environmental_impact: rec.environmental_impact,
          roi_months: rec.roi_months,
          certification_eligible: rec.certification_eligible,
        }),
      ),
    )

    // Update project sustainability score
    await projectsApi.update(projectId, {
      sustainability_score: analysis.overall_score,
    })

    // Log completion
    await analyticsApi.logEvent(projectId, "sustainability_analysis_completed", {
      overall_score: analysis.overall_score,
      recommendations_count: analysis.recommendations.length,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      data: {
        analysis,
        recommendations: savedRecommendations,
      },
    })
  } catch (error) {
    console.error("POST sustainability error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate sustainability analysis" }, { status: 500 })
  }
}
