import { generateText, streamText } from "ai"
import { xai } from "@ai-sdk/xai"

const model = xai("grok-beta")

export class AIService {
  static async generateResponse(prompt: string, context?: any) {
    try {
      const systemPrompt = `Du er en ekspert på bygginnredning og bærekraftig bygging i Norge. 
      Du jobber for Nordvest Bygginnredning i Ålesund og hjelper kunder med:
      - Planlegging av byggprosjekter
      - Bærekraftige løsninger
      - Finansieringsmuligheter
      - Tekniske råd og veiledning
      
      Svar alltid på norsk og vær hjelpsom og profesjonell.
      ${context ? `Kontekst: ${JSON.stringify(context)}` : ""}`

      const { text } = await generateText({
        model,
        system: systemPrompt,
        prompt,
      })

      return text
    } catch (error) {
      console.error("AI generation error:", error)
      throw new Error("Kunne ikke generere svar fra AI")
    }
  }

  static async streamResponse(prompt: string, context?: any) {
    try {
      const systemPrompt = `Du er en ekspert på bygginnredning og bærekraftig bygging i Norge. 
      Du jobber for Nordvest Bygginnredning i Ålesund og hjelper kunder med:
      - Planlegging av byggprosjekter
      - Bærekraftige løsninger
      - Finansieringsmuligheter
      - Tekniske råd og veiledning
      
      Svar alltid på norsk og vær hjelpsom og profesjonell.
      ${context ? `Kontekst: ${JSON.stringify(context)}` : ""}`

      return streamText({
        model,
        system: systemPrompt,
        prompt,
      })
    } catch (error) {
      console.error("AI streaming error:", error)
      throw new Error("Kunne ikke starte AI-samtale")
    }
  }

  static async analyzeSustainability(projectData: any) {
    try {
      const prompt = `Analyser bærekraften til dette byggprosjektet og gi en score fra 1-100:
      
      Prosjektdata: ${JSON.stringify(projectData)}
      
      Vurder følgende faktorer:
      - Energieffektivitet
      - Materialvalg
      - Avfallshåndtering
      - Lokale leverandører
      - Levetid og vedlikehold
      
      Gi en detaljert analyse på norsk med konkrete forbedringsforslag.`

      const { text } = await generateText({
        model,
        prompt,
      })

      // Extract score from response (simplified)
      const scoreMatch = text.match(/(\d+)\/100|(\d+) poeng|score[:\s]*(\d+)/i)
      const score = scoreMatch ? Number.parseInt(scoreMatch[1] || scoreMatch[2] || scoreMatch[3]) : 75

      return {
        score: Math.min(100, Math.max(1, score)),
        analysis: text,
        recommendations: this.extractRecommendations(text),
      }
    } catch (error) {
      console.error("Sustainability analysis error:", error)
      throw new Error("Kunne ikke analysere bærekraft")
    }
  }

  static async suggestFinancing(projectData: any) {
    try {
      const prompt = `Foreslå finansieringsmuligheter for dette norske byggprosjektet:
      
      Prosjektdata: ${JSON.stringify(projectData)}
      
      Inkluder:
      - Enova-støtte og tilskudd
      - Grønne lån fra norske banker
      - Kommunale ordninger
      - Skattefradrag og incentiver
      - Leasing og alternative finansieringsformer
      
      Gi konkrete forslag med estimerte beløp og krav.`

      const { text } = await generateText({
        model,
        prompt,
      })

      return {
        suggestions: this.parseFinancingSuggestions(text),
        analysis: text,
        totalPotentialSavings: this.estimateSavings(text),
      }
    } catch (error) {
      console.error("Financing suggestion error:", error)
      throw new Error("Kunne ikke foreslå finansiering")
    }
  }

  private static extractRecommendations(text: string): string[] {
    const lines = text.split("\n")
    return lines
      .filter((line) => line.includes("anbefal") || line.includes("forbedr") || line.includes("vurder"))
      .map((line) => line.trim())
      .filter((line) => line.length > 10)
      .slice(0, 5)
  }

  private static parseFinancingSuggestions(text: string): any[] {
    // Simplified parsing - in production, use more sophisticated NLP
    const suggestions = []

    if (text.includes("Enova")) {
      suggestions.push({
        type: "Enova-støtte",
        description: "Støtte til energieffektivisering",
        estimatedAmount: "50000-200000 NOK",
      })
    }

    if (text.includes("grønn") || text.includes("bærekraft")) {
      suggestions.push({
        type: "Grønt lån",
        description: "Redusert rente for miljøvennlige prosjekter",
        estimatedAmount: "0.5-1% lavere rente",
      })
    }

    return suggestions
  }

  private static estimateSavings(text: string): number {
    // Extract potential savings from text
    const amounts = text.match(/(\d+)\s*(?:000)?\s*(?:kr|NOK)/gi)
    if (amounts && amounts.length > 0) {
      const total = amounts.reduce((sum, amount) => {
        const num = Number.parseInt(amount.replace(/[^\d]/g, ""))
        return sum + (num > 1000 ? num : num * 1000)
      }, 0)
      return Math.min(total, 500000) // Cap at 500k NOK
    }
    return 75000 // Default estimate
  }
}
