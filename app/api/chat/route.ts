import { streamText } from "ai"
import { xai } from "@ai-sdk/xai"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json()

    // Store session if it doesn't exist
    const { error: sessionError } = await supabase.from("chat_sessions").upsert({
      session_id: sessionId,
      title: messages[1]?.content?.substring(0, 50) || "New Chat",
    })

    if (sessionError) {
      console.error("Session error:", sessionError)
    }

    // Store user message
    const userMessage = messages[messages.length - 1]
    if (userMessage?.role === "user") {
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage.content,
      })
    }

    const result = await streamText({
      model: xai("grok-beta"),
      messages,
      system: `Du er Nordvest Eksperten, en AI-assistent for Nordvest Bygginnredning AS. Du er ekspert på:

- Kontorløsninger og bygginnredning
- Glassvegger og systemvegger
- Møteromssystemer og akustikkløsninger
- Bærekraftige ombruksløsninger
- Kontorplanlegging og design

Svar alltid på norsk og vær hjelpsom, profesjonell og kunnskapsrik. Hvis du ikke vet svaret på noe, si det ærlig og foreslå at kunden kontakter oss direkte.

Nordvest Bygginnredning AS tilbyr:
- Systemvegger (fleksible og modulære veggløsninger)
- Glassvegger (elegante løsninger for lys og åpenhet)
- Akustikkløsninger (optimal lyddemping)
- Ombruksløsninger (bærekraftige løsninger med høy gjenbruksgrad)
- Kontorplanlegging og prosjektledelse

Kontaktinformasjon:
- Telefon: +47 XX XX XX XX
- E-post: post@nordvestbygg.no
- Adresse: [Adresse]`,
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
