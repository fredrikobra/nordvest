import { type NextRequest, NextResponse } from "next/server"
import { AIService } from "@/lib/ai"
import { createMessage, createConversation } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId, projectId, context } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Generate AI response
    const aiResponse = await AIService.generateResponse(message, context)

    // Save conversation if new
    let currentConversationId = conversationId
    if (!currentConversationId) {
      const conversation = await createConversation({
        project_id: projectId,
        title: message.substring(0, 50) + "...",
      })
      currentConversationId = conversation.id
    }

    // Save messages
    await createMessage({
      conversation_id: currentConversationId,
      role: "user",
      content: message,
      metadata: context || {},
    })

    await createMessage({
      conversation_id: currentConversationId,
      role: "assistant",
      content: aiResponse,
      metadata: {},
    })

    return NextResponse.json({
      response: aiResponse,
      conversationId: currentConversationId,
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
