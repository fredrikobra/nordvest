import type { NextRequest } from "next/server"
import { AIService } from "@/lib/ai"
import { DatabaseService } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { message, projectId, context } = await request.json()

    if (!message) {
      return new Response("Melding er påkrevd", { status: 400 })
    }

    // Get project context if projectId is provided
    let projectContext = null
    if (projectId) {
      projectContext = await DatabaseService.getProject(projectId)
    }

    // Combine context
    const fullContext = {
      ...context,
      project: projectContext,
    }

    // Stream AI response
    const result = await AIService.streamResponse(message, fullContext)

    // Store conversation in database (we'll get the full response when stream ends)
    const conversation = await DatabaseService.createConversation({
      project_id: projectId || null,
      user_message: message,
      ai_response: "Streaming...", // Will be updated when stream completes
      context_data: fullContext,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Kunne ikke behandle samtale", { status: 500 })
  }
}
