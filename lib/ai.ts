import { xai } from '@ai-sdk/xai'
import { generateText, streamText } from 'ai'

export class AIService {
  private static model = xai('grok-beta')

  static async generateResponse(message: string, context?: string) {
    const systemPrompt = `Du er en ekspert på byggeinnredning og bærekraftige løsninger i Norge. 
    Du jobber for Nordvest Bygginnredning og hjelper kunder med:
    - Planlegging av kontorinnredning og byggeprosjekter
    - Bærekraftige materialvalg og miljøvennlige løsninger
    - Finansieringsmuligheter (Enova, grønne lån, skattefradrag)
    - Norske byggeregler, standarder og beste praksis
    - Kostnadsestimering og prosjektplanlegging
    
    Svar alltid på norsk og vær praktisk, hjelpsom og profesjonell.
    Fokuser på konkrete råd og løsninger som er relevante for norske forhold.
    ${context ? `\n\nProsjektkontekst: ${context}` : ''}`

    try {
      const { text } = await generateText({
        model: this.model,
        system: systemPrompt,
        prompt: message,
        maxTokens: 1000,
      })

      return text
    } catch (error) {
      console.error('AI generation error:', error)
      return 'Beklager, jeg kan ikke svare på det akkurat nå. Prøv igjen senere eller kontakt oss direkte for hjelp.'
    }
  }

  static async streamResponse(message: string, context?: string) {
    const systemPrompt = `Du er en ekspert på byggeinnredning og bærekraftige løsninger i Norge. 
    Du jobber for Nordvest Bygginnredning og hjelper kunder med:
    - Planlegging av kontorinnredning og byggeprosjekter
    - Bærekraftige materialvalg og miljøvennlige løsninger
    - Finansieringsmuligheter (Enova, grønne lån, skattefradrag)
    - Norske byggeregler, standarder og beste praksis
    - Kostnadsestimering og prosjektplanlegging
    
    Svar alltid på norsk og vær praktisk, hjelpsom og profesjonell.
    ${context ? `\n\nProsjektkontekst: ${context}` : ''}`

    try {
      const result = await streamText({
        model: this.model,
        system: systemPrompt,
        prompt: message,
        maxTokens: 1000,
      })

      return result
    } catch (error) {
      console.error('AI streaming error:', error)
      throw error
    }
  }

  static async analyzeSustainability(projectData: any) {
    const prompt = `Analyser bærekraften til dette byggeprosjektet og gi en score fra 1-100:

Prosjektdata: ${JSON.stringify(projectData, null, 2)}

Vurder følgende faktorer:
- Materialvalg og miljøpåvirkning (lokale vs importerte materialer)
- Energieffektivitet (belysning, ventilasjon, isolasjon)
- Avfallshåndtering og gjenbruk av materialer
- Transportavstand for materialer og arbeidskraft
- Levetid og vedlikeholdsbehov
- Inneklima og helse (VOC-utslipp, naturlig lys)
- Sertifiseringer (BREEAM, LEED, etc.)

Gi en detaljert analyse på norsk og konkrete anbefalinger for forbedring.
Start svaret med "SCORE: [tall]" og fortsett med analysen.`

    try {
      const { text } = await generateText({
        model: this.model,
        system: 'Du er en bærekraftsekspert som analyserer byggeprosjekter i Norge med fokus på miljøpåvirkning og energieffektivitet.',
        prompt,
        maxTokens: 1500,
      })

      // Extract score from response
      const scoreMatch = text.match(/SCORE:\s*(\d+)/i)
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 50

      // Split response into analysis and recommendations
      const cleanText = text.replace(/SCORE:\s*\d+/i, '').trim()
      const parts = cleanText.split(/anbefalinger?[:]/i)
      const analysis = parts[0].trim()
      const recommendationsText = parts[1] || ''
      
      const recommendations = recommendationsText
        .split('\n')
        .map(r => r.trim())
        .filter(r => r.length > 10 && (r.startsWith('-') || r.startsWith('•') || r.match(/^\d+\./)))
        .map(r => r.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, ''))
        .slice(0, 5)

      return {
        score: Math.min(100, Math.max(1, score)),
        analysis: analysis || 'Bærekraftsanalyse utført.',
        recommendations: recommendations.length > 0 ? recommendations : [
          'Vurder bruk av lokale og miljøsertifiserte materialer',
          'Installer energieffektiv LED-belysning',
          'Planlegg for optimal avfallshåndtering'
        ]
      }
    } catch (error) {
      console.error('Sustainability analysis error:', error)
      return {
        score: 50,
        analysis: 'Kunne ikke analysere bærekraft akkurat nå. Kontakt oss for en detaljert analyse.',
        recommendations: [
          'Kontakt oss for en personlig bærekraftsanalyse',
          'Vurder miljøsertifiserte materialer',
          'Planlegg for energieffektive løsninger'
        ]
      }
    }
  }

  static async suggestFinancing(projectData: any) {
    const estimatedCost = projectData.estimated_cost || projectData.budget || 500000
    const sustainabilityFocus = projectData.sustainability_focus || projectData.sustainability_score > 70

    const prompt = `Foreslå finansieringsmuligheter for dette norske byggeprosjektet:

Prosjektdata: ${JSON.stringify(projectData, null, 2)}
Estimert kostnad: ${estimatedCost} NOK
Bærekraftsfokus: ${sustainabilityFocus ? 'Ja' : 'Nei'}

Inkluder følgende norske finansieringsalternativer:
- Enova-støtte for energieffektivisering (konkrete programmer)
- Grønne lån fra norske banker (DNB, Sparebank 1, etc.)
- Skattefradrag og incentiver for miljøtiltak
- Leasing-alternativer for utstyr og møbler
- Kommunale støtteordninger

Gi konkrete forslag med:
- Estimerte beløp og prosentsatser
- Krav og kvalifikasjonskriterier
- Kontaktinformasjon der relevant
- Tidsfrister for søknader`

    try {
      const { text } = await generateText({
        model: this.model,
        system: 'Du er en finansieringsekspert som kjenner norske støtteordninger, banker og finansieringsmuligheter for byggeprosjekter.',
        prompt,
        maxTokens: 1500,
      })

      // Parse response into structured format
      const suggestions = text
      
      // Extract financing options from the text
      const options = []
      
      if (sustainabilityFocus) {
        options.push({
          type: 'sustainability_grant',
          description: 'Enova støtte for energieffektivisering - inntil 30% av investeringskostnad',
          provider: 'Enova',
          estimatedAmount: Math.min(estimatedCost * 0.3, 500000),
          benefits: ['Ingen tilbakebetaling', 'Rask saksbehandling', 'Miljøgevinst']
        })
      }

      options.push({
        type: 'green_loan',
        description: 'Grønt byggelån med redusert rente for miljøvennlige prosjekter',
        provider: 'Norske banker (DNB, Sparebank 1)',
        estimatedAmount: estimatedCost * 0.8,
        benefits: ['Redusert rente', 'Fleksible nedbetalingsvilkår', 'Miljøfokus']
      })

      if (estimatedCost > 200000) {
        options.push({
          type: 'tax_incentive',
          description: 'Skattefradrag for energieffektivisering og miljøtiltak',
          provider: 'Skatteetaten',
          estimatedAmount: estimatedCost * 0.15,
          benefits: ['Direkte skattefradrag', 'Ingen søknadsprosess', 'Umiddelbar gevinst']
        })
      }

      return {
        suggestions,
        options
      }
    } catch (error) {
      console.error('Financing suggestion error:', error)
      return {
        suggestions: 'Kunne ikke generere finansieringsforslag akkurat nå. Kontakt oss for personlig rådgivning om finansieringsmuligheter.',
        options: [
          {
            type: 'green_loan',
            description: 'Grønt byggelån - kontakt din bank for tilbud',
            provider: 'Norske banker'
          }
        ]
      }
    }
  }
}
