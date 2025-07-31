import { aiService } from "@/lib/ai"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json()

    if (!message) {
      return new Response(JSON.stringify({ error: "Melding er påkrevd" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const result = await aiService.streamResponse(message, context)

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(
      JSON.stringify({
        error: "En feil oppstod under behandling av forespørselen",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
