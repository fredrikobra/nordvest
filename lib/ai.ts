import { xai } from "@ai-sdk/xai"
import { generateText, streamText } from "ai"

const model = xai("grok-3")

export class AIService {
  static async generateResponse(prompt: string, context?: any) {
    try {
      const systemPrompt = `Du er en AI-assistent for Nordvest Bygginnredning, et norsk bygginnredningsfirma.
      Du hjelper med:
      - Prosjektplanlegging og rådgivning
      - Bærekraftige byggeløsninger
      - Finansieringsalternativer
      - Materialvalg og design
      
      Svar alltid på norsk og vær profesjonell og hjelpsom.
      ${context ? `Kontekst: ${JSON.stringify(context)}` : ""}`

      const { text } = await generateText({
        model,
        system: systemPrompt,
        prompt,
      })

      return text
    } catch (error) {
      console.error("AI generation error:", error)
      throw new Error("Kunne ikke generere AI-respons")
    }
  }

  static async streamResponse(prompt: string, context?: any) {
    try {
      const systemPrompt = `Du er en AI-assistent for Nordvest Bygginnredning, et norsk bygginnredningsfirma.
      Du hjelper med:
      - Prosjektplanlegging og rådgivning
      - Bærekraftige byggeløsninger
      - Finansieringsalternativer
      - Materialvalg og design
      
      Svar alltid på norsk og vær profesjonell og hjelpsom.
      ${context ? `Kontekst: ${JSON.stringify(context)}` : ""}`

      return streamText({
        model,
        system: systemPrompt,
        prompt,
      })
    } catch (error) {
      console.error("AI streaming error:", error)
      throw new Error("Kunne ikke starte AI-strøm")
    }
  }

  static async analyzeSustainability(projectData: any) {
    try {
      const prompt = `Analyser bærekraften til dette byggeprosjektet og gi en score fra 1-100:
      
      Prosjektdata: ${JSON.stringify(projectData)}
      
      Vurder:
      - Materialvalg
      - Energieffektivitet
      - Miljøpåvirkning
      - Sirkulære løsninger
      - Lokale leverandører
      
      Gi en detaljert analyse med konkrete anbefalinger for forbedring.`

      const { text } = await generateText({
        model,
        system: "Du er en ekspert på bærekraftig bygging og miljøvennlige løsninger.",
        prompt,
      })

      // Extract score from response (simplified)
      const scoreMatch = text.match(/(\d+)\/100|(\d+) poeng|score[:\s]*(\d+)/i)
      const score = scoreMatch ? Number.parseInt(scoreMatch[1] || scoreMatch[2] || scoreMatch[3]) : 50

      return {
        analysis: text,
        score: Math.min(Math.max(score, 1), 100),
        recommendations: this.extractRecommendations(text),
      }
    } catch (error) {
      console.error("Sustainability analysis error:", error)
      throw new Error("Kunne ikke analysere bærekraft")
    }
  }

  static async suggestFinancing(projectData: any) {
    try {
      const prompt = `Foreslå finansieringsalternativer for dette norske byggeprosjektet:
      
      Prosjektdata: ${JSON.stringify(projectData)}
      
      Inkluder:
      - Grønne lån og tilskudd
      - Enova-støtte
      - Skattefordeler
      - Bankfinansiering
      - Leasingalternativer
      
      Gi konkrete forslag med kontaktinformasjon der det er mulig.`

      const { text } = await generateText({
        model,
        system: "Du er en ekspert på norsk bygge- og eiendomsfinansiering.",
        prompt,
      })

      return {
        suggestions: text,
        options: this.extractFinancingOptions(text),
      }
    } catch (error) {
      console.error("Financing suggestion error:", error)
      throw new Error("Kunne ikke foreslå finansiering")
    }
  }

  private static extractRecommendations(text: string): string[] {
    // Simple extraction of recommendations (could be improved with better parsing)
    const lines = text.split("\n")
    return lines
      .filter((line) => line.includes("anbefal") || line.includes("forbedr") || line.includes("vurder"))
      .map((line) => line.trim())
      .filter((line) => line.length > 10)
      .slice(0, 5)
  }

  private static extractFinancingOptions(text: string): any[] {
    // Simple extraction of financing options (could be improved with better parsing)
    const options = []
    const lines = text.split("\n")

    for (const line of lines) {
      if (line.includes("lån") || line.includes("tilskudd") || line.includes("støtte")) {
        options.push({
          type: line.includes("grønn") ? "green_loan" : "loan",
          description: line.trim(),
        })
      }
    }

    return options.slice(0, 3)
  }
}
