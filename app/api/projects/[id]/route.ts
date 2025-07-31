import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { CacheService } from "@/lib/redis"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Try cache first
    const cachedProject = await CacheService.getCachedProject(id)
    if (cachedProject) {
      return NextResponse.json(cachedProject)
    }

    // Fetch from database
    const project = await DatabaseService.getProject(id)

    if (!project) {
      return NextResponse.json({ error: "Prosjekt ikke funnet" }, { status: 404 })
    }

    // Cache the result
    await CacheService.cacheProject(project)

    return NextResponse.json(project)
  } catch (error) {
    console.error("Get project error:", error)
    return NextResponse.json({ error: "Kunne ikke hente prosjekt" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const data = await request.json()

    const project = await DatabaseService.updateProject(id, data)

    // Update cache
    await CacheService.cacheProject(project)

    // Invalidate projects list cache
    await CacheService.invalidatePattern("projects:*")

    return NextResponse.json(project)
  } catch (error) {
    console.error("Update project error:", error)
    return NextResponse.json({ error: "Kunne ikke oppdatere prosjekt" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await DatabaseService.deleteProject(id)

    // Remove from cache
    await CacheService.invalidateProject(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete project error:", error)
    return NextResponse.json({ error: "Kunne ikke slette prosjekt" }, { status: 500 })
  }
}
