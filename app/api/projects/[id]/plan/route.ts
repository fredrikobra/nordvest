import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai"
import { projectsApi, analyticsApi } from "@/lib/supabase"
import { redisCache } from "@/lib/redis"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id

    // Check cache first
    const cachedPlan = await redisCache.getProjectData(projectId, "plan")
    if (cachedPlan) {
      return NextResponse.json({
        success: true,
        data: cachedPlan,
        cached: true,
      })
    }

    return NextResponse.json({
      success: true,
      data: null,
      message: "No plan generated yet. Use POST to generate a new plan.",
    })
  } catch (error) {
    console.error("GET plan error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch project plan" }, { status: 500 })
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
    await analyticsApi.logEvent(projectId, "project_plan_requested", {
      project_type: project.project_type,
      square_meters: project.square_meters,
      estimated_cost: project.estimated_cost,
      timestamp: new Date().toISOString(),
    })

    // Generate AI project plan
    const plan = await aiService.generateProjectPlan({
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

    // Cache the plan
    await redisCache.cacheProjectData(projectId, "plan", plan, 7200) // 2 hours

    // Update project data with plan summary
    await projectsApi.update(projectId, {
      project_data: {
        ...project.project_data,
        plan_generated: true,
        total_duration_weeks: plan.timeline.total_duration_weeks,
        phases_count: plan.phases.length,
        last_plan_update: new Date().toISOString(),
      },
    })

    // Log completion
    await analyticsApi.logEvent(projectId, "project_plan_completed", {
      total_duration_weeks: plan.timeline.total_duration_weeks,
      phases_count: plan.phases.length,
      risks_identified: plan.risk_assessment.length,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      data: plan,
    })
  } catch (error) {
    console.error("POST plan error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate project plan" }, { status: 500 })
  }
}
