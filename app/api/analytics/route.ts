import { type NextRequest, NextResponse } from "next/server"
import { analyticsApi } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")
    const eventType = searchParams.get("eventType")
    const limit = Number.parseInt(searchParams.get("limit") || "100")

    let events
    if (projectId) {
      events = await analyticsApi.getEventsByProject(projectId, limit)
    } else if (eventType) {
      events = await analyticsApi.getEventsByType(eventType, limit)
    } else {
      return NextResponse.json({ success: false, error: "projectId or eventType parameter required" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: events,
    })
  } catch (error) {
    console.error("GET analytics error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { projectId, eventType, eventData } = await request.json()

    if (!projectId || !eventType) {
      return NextResponse.json({ success: false, error: "projectId and eventType are required" }, { status: 400 })
    }

    await analyticsApi.logEvent(projectId, eventType, eventData || {})

    return NextResponse.json({
      success: true,
      message: "Event logged successfully",
    })
  } catch (error) {
    console.error("POST analytics error:", error)
    return NextResponse.json({ success: false, error: "Failed to log event" }, { status: 500 })
  }
}
