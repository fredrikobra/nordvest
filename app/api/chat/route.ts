import { streamText } from "ai"
import { xai } from "@ai-sdk/xai"
import { createServerClient } from "@/lib/supabase"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json()

    const supabase = createServerClient()

    // Store user message
    if (messages.length > 0) {
      const userMessage = messages[messages.length - 1]
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage.content,
      })
    }

    const result = await streamText({
      model: xai("grok-beta"),
      messages,
      system: `Du er Nordvest Eksperten, en AI-assistent for Nordvest Bygginnredning AS i Ålesund. 

Du hjelper kunder med:
- Spørsmål om bygginnredning og renovering
- Planlegging av prosjekter
- Materialvalg og design
- Prisestimater og tilbud
- Tidsrammer for prosjekter

Nordvest Bygginnredning AS:
- Lokalisert på Tua 24, 6020 Ålesund
- Spesialiserer seg på kvalitetsinnredning
- Fokus på bærekraftige løsninger
- Erfarne håndverkere
- Tilbyr alt fra små oppgraderinger til store renoveringer

Svar alltid på norsk og vær hjelpsom, profesjonell og kunnskapsrik om bygginnredning.`,
      onFinish: async (result) => {
        // Store assistant response
        await supabase.from("chat_messages").insert({
          session_id: sessionId,
          role: "assistant",
          content: result.text,
        })
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
