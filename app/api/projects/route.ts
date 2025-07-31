import { type NextRequest, NextResponse } from "next/server"
import { projectsApi, analyticsApi } from "@/lib/supabase"
import { cache } from "@/lib/redis"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")

    // Check cache first
    const cacheKey = `projects_${status || "all"}_${limit || "all"}_${offset || "0"}`
    const cachedProjects = await cache.get(cacheKey)
    if (cachedProjects) {
      return NextResponse.json(cachedProjects)
    }

    let projects = await projectsApi.getAll()

    // Apply filters
    if (status) {
      projects = projects.filter((p) => p.status === status)
    }

    // Apply pagination
    if (limit) {
      const limitNum = Number.parseInt(limit)
      const offsetNum = Number.parseInt(offset || "0")
      projects = projects.slice(offsetNum, offsetNum + limitNum)
    }

    // Cache the results
    await cache.set(cacheKey, projects, 300) // 5 minutes

    return NextResponse.json(projects)
  } catch (error) {
    console.error("GET /api/projects error:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 })
    }

    // Create project
    const project = await projectsApi.create({
      name: body.name,
      description: body.description,
      status: body.status || "draft",
      user_email: body.user_email,
      user_name: body.user_name,
      company_name: body.company_name,
      phone: body.phone,
      project_data: body.project_data || {},
      estimated_cost: body.estimated_cost,
      sustainability_score: body.sustainability_score,
      location: body.location,
      project_type: body.project_type,
      square_meters: body.square_meters,
      target_completion_date: body.target_completion_date,
      budget_range: body.budget_range,
      special_requirements: body.special_requirements || [],
    })

    // Log analytics event
    try {
      await analyticsApi.logEvent(project.id, "project_created", {
        source: "api",
        user_agent: request.headers.get("user-agent"),
        ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
      })
    } catch (analyticsError) {
      console.error("Analytics logging error:", analyticsError)
    }

    // Invalidate cache
    await cache.invalidatePattern("projects_*")

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("POST /api/projects error:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
