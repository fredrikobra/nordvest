import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { CacheService } from "@/lib/redis"

export async function GET() {
  try {
    // Try cache first
    const cachedProjects = await CacheService.getCachedProjects()
    if (cachedProjects.length > 0) {
      return NextResponse.json(cachedProjects)
    }

    // Fetch from database
    const projects = await DatabaseService.getProjects()

    // Cache the results
    await CacheService.cacheProjects(projects)

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Get projects error:", error)
    return NextResponse.json({ error: "Kunne ikke hente prosjekter" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.status) {
      return NextResponse.json({ error: "Navn og status er påkrevd" }, { status: 400 })
    }

    const project = await DatabaseService.createProject(data)

    // Cache the new project
    await CacheService.cacheProject(project)

    // Invalidate projects list cache
    await CacheService.invalidatePattern("projects:*")

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json({ error: "Kunne ikke opprette prosjekt" }, { status: 500 })
  }
}
