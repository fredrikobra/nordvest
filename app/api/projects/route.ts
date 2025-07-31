import { type NextRequest, NextResponse } from "next/server"
import { getProjects, createProject } from "@/lib/supabase"
import { CacheService } from "@/lib/redis"

export async function GET() {
  try {
    // Try to get from cache first
    const cached = await CacheService.getCachedProjects()
    if (cached.length > 0) {
      return NextResponse.json(cached)
    }

    // Get from Supabase
    const projects = await getProjects()

    // Cache the result for 5 minutes
    await CacheService.cacheProjects(projects)

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, user_email, user_name, company_name, phone, estimated_cost, project_data } = body

    if (!name) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 })
    }

    const project = await createProject({
      name,
      description,
      user_email,
      user_name,
      company_name,
      phone,
      estimated_cost,
      project_data: project_data || {},
      status: "draft",
    })

    // Clear cache
    await CacheService.invalidatePattern("projects:*")

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
