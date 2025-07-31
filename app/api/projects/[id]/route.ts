import { type NextRequest, NextResponse } from "next/server"
import { projectsApi } from "@/lib/supabase"
import { cache } from "@/lib/redis"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Check cache first
    const cacheKey = `project_${id}`
    const cachedProject = await cache.getCachedProject(id)
    if (cachedProject) {
      return NextResponse.json(cachedProject)
    }

    const project = await projectsApi.getById(id)
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Cache the project
    await cache.cacheProject(id, project)

    return NextResponse.json(project)
  } catch (error) {
    console.error(`GET /api/projects/${params.id} error:`, error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    const updatedProject = await projectsApi.update(id, body)

    // Invalidate cache
    await cache.invalidateProject(id)

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error(`PUT /api/projects/${params.id} error:`, error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await projectsApi.delete(id)

    // Invalidate cache
    await cache.invalidateProject(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`DELETE /api/projects/${params.id} error:`, error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
