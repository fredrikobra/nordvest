import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai"
import { projectsApi, financingApi, analyticsApi } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id

    // Get existing financing options
    const options = await financingApi.getByProjectId(projectId)

    return NextResponse.json({
      success: true,
      data: options,
    })
  } catch (error) {
    console.error("GET financing error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch financing options" }, { status: 500 })
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
    await analyticsApi.logEvent(projectId, "financing_analysis_requested", {
      estimated_cost: project.estimated_cost,
      project_type: project.project_type,
      timestamp: new Date().toISOString(),
    })

    // Generate AI financing suggestions
    const financing = await aiService.suggestFinancing({
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

    // Save financing options to database
    const savedOptions = await Promise.all(
      financing.financing_options.map((option) =>
        financingApi.create({
          project_id: projectId,
          type: option.type as any,
          title: option.title,
          description: option.description,
          amount: option.amount,
          interest_rate: option.interest_rate,
          term_months: option.term_months,
          requirements: option.requirements,
          benefits: option.benefits,
          provider: option.provider,
          application_url: option.application_url,
          status: "available",
          eligibility_score: option.eligibility_score,
          processing_time_days: option.processing_time_days,
          contact_info: {},
        }),
      ),
    )

    // Log completion
    await analyticsApi.logEvent(projectId, "financing_analysis_completed", {
      total_options: financing.financing_options.length,
      government_incentives: financing.government_incentives.length,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      data: {
        financing,
        options: savedOptions,
      },
    })
  } catch (error) {
    console.error("POST financing error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate financing options" }, { status: 500 })
  }
}
