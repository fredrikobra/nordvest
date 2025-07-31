import { type NextRequest, NextResponse } from "next/server"
import { getProject, updateProject, deleteProject } from "@/lib/supabase"
import { CacheService } from "@/lib/redis"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Try cache first
    const cached = await CacheService.getCachedProject(id)
    if (cached) {
      return NextResponse.json(cached)
    }

    const project = await getProject(id)
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Cache for 10 minutes
    await CacheService.cacheProject(project)

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    const project = await updateProject(id, body)

    // Invalidate caches
    await CacheService.invalidateProject(id)

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await deleteProject(id)

    // Invalidate caches
    await CacheService.invalidateProject(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
