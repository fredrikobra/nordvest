import { xai } from "@ai-sdk/xai"
import { generateText, streamText } from "ai"
import { redisCache } from "./redis"

export interface ProjectContext {
  id: string
  name: string
  description?: string
  location?: string
  project_type?: string
  square_meters?: number
  budget_range?: string
  sustainability_score?: number
  estimated_cost?: number
  special_requirements?: string[]
  target_completion_date?: string
}

export interface SustainabilityAnalysis {
  overall_score: number
  recommendations: Array<{
    category: string
    title: string
    description: string
    impact_score: number
    cost_estimate: number
    savings_estimate: number
    implementation_time: string
    priority: number
    environmental_impact: string
    roi_months: number
    certification_eligible: boolean
  }>
  compliance_status: {
    tek17_compliant: boolean
    energy_class: string
    required_improvements: string[]
  }
  environmental_impact: {
    co2_reduction: number
    energy_savings: number
    water_savings: number
    waste_reduction: number
  }
}

export interface FinancingOptions {
  total_project_cost: number
  financing_options: Array<{
    type: string
    title: string
    description: string
    amount: number
    interest_rate: number
    term_months: number
    requirements: string[]
    benefits: string[]
    provider: string
    application_url: string
    eligibility_score: number
    processing_time_days: number
  }>
  government_incentives: Array<{
    name: string
    amount: number
    requirements: string[]
    application_deadline: string
  }>
}

export interface ProjectPlan {
  phases: Array<{
    name: string
    description: string
    duration_weeks: number
    cost_estimate: number
    dependencies: string[]
    deliverables: string[]
    sustainability_considerations: string[]
  }>
  timeline: {
    total_duration_weeks: number
    critical_path: string[]
    milestones: Array<{
      name: string
      week: number
      description: string
    }>
  }
  risk_assessment: Array<{
    risk: string
    probability: string
    impact: string
    mitigation: string
  }>
  compliance_checkpoints: Array<{
    phase: string
    requirements: string[]
    documentation_needed: string[]
  }>
}

class AIServiceClass {
  private model = xai("grok-beta")

  async generateResponse(prompt: string, context?: string): Promise<string> {
    try {
      // Check cache first
      const cacheKey = redisCache.generateKey("ai-response", prompt)
      const cached = await redisCache.get<string>(cacheKey)

      if (cached) {
        return cached
      }

      const systemPrompt = `Du er en ekspert norsk byggrådgiver som spesialiserer seg på bærekraftig bygging, renovering og interiørdesign. Du har dyp kunnskap om:

- Norske byggeforskrifter (TEK17, NS-standarder)
- Bærekraftige byggematerialer og teknikker
- Energieffektivitet og miljøpåvirkning
- Norske finansieringsalternativer og offentlige incentiver
- Lokale leverandører og entreprenører
- Klimahensyn for norsk bygging

Gi alltid praktiske, gjennomførbare råd tilpasset norske forhold og forskrifter.${context ? `\n\nKontekst: ${context}` : ""}`

      const { text } = await generateText({
        model: this.model,
        system: systemPrompt,
        prompt,
        maxTokens: 1000,
      })

      // Cache the response
      await redisCache.set(cacheKey, text, { ttl: 3600 })

      return text
    } catch (error) {
      console.error("AI generation error:", error)
      throw new Error("Kunne ikke generere svar fra AI-tjenesten")
    }
  }

  async streamResponse(prompt: string, context?: string) {
    try {
      const systemPrompt = `Du er en ekspert norsk byggrådgiver som spesialiserer seg på bærekraftig bygging, renovering og interiørdesign. Du har dyp kunnskap om:

- Norske byggeforskrifter (TEK17, NS-standarder)
- Bærekraftige byggematerialer og teknikker
- Energieffektivitet og miljøpåvirkning
- Norske finansieringsalternativer og offentlige incentiver
- Lokale leverandører og entreprenører
- Klimahensyn for norsk bygging

Gi alltid praktiske, gjennomførbare råd tilpasset norske forhold og forskrifter.${context ? `\n\nKontekst: ${context}` : ""}`

      return streamText({
        model: this.model,
        system: systemPrompt,
        prompt,
        maxTokens: 1000,
      })
    } catch (error) {
      console.error("AI streaming error:", error)
      throw new Error("Kunne ikke starte AI-samtale")
    }
  }

  async analyzeSustainability(projectContext: ProjectContext): Promise<SustainabilityAnalysis> {
    const cacheKey = redisCache.generateKey("sustainability", projectContext.id)

    // Check cache first
    const cached = await redisCache.get(cacheKey)
    if (cached) {
      return JSON.parse(cached)
    }

    const prompt = `Analyser bærekraftsaspektene ved dette norske byggeprosjektet og gi en omfattende vurdering.

Prosjektdetaljer:
- Navn: ${projectContext.name}
- Beskrivelse: ${projectContext.description || "Ikke oppgitt"}
- Lokasjon: ${projectContext.location || "Norge"}
- Type: ${projectContext.project_type || "Generell bygging"}
- Størrelse: ${projectContext.square_meters ? `${projectContext.square_meters}m²` : "Ikke spesifisert"}
- Budsjett: ${projectContext.budget_range || "Ikke spesifisert"}
- Spesielle krav: ${projectContext.special_requirements?.join(", ") || "Ingen"}
- Målferdigstillelse: ${projectContext.target_completion_date || "Ikke spesifisert"}

Gi en detaljert bærekraftsanalyse i følgende JSON-format:

{
  "overall_score": <tall 1-100>,
  "recommendations": [
    {
      "category": "<energi|materialer|vann|avfall|inneklima>",
      "title": "<anbefalingstittel>",
      "description": "<detaljert beskrivelse>",
      "impact_score": <tall 1-10>,
      "cost_estimate": <tall i NOK>,
      "savings_estimate": <årlige besparelser i NOK>,
      "implementation_time": "<tidsramme>",
      "priority": <tall 1-5>,
      "environmental_impact": "<beskrivelse>",
      "roi_months": <tall>,
      "certification_eligible": <boolean>
    }
  ],
  "compliance_status": {
    "tek17_compliant": <boolean>,
    "energy_class": "<A-G>",
    "required_improvements": ["<forbedring>"]
  },
  "environmental_impact": {
    "co2_reduction": <kg CO2/år>,
    "energy_savings": <kWh/år>,
    "water_savings": <liter/år>,
    "waste_reduction": <kg/år>
  }
}

Fokuser på norske byggstandarder, klimaforhold og tilgjengelige bærekraftige teknologier.`

    try {
      const result = await generateText({
        model: this.model,
        system: this.getSystemPrompt("sustainability", projectContext),
        prompt,
        maxTokens: 1000,
      })

      const analysis = JSON.parse(result.text)

      // Cache for 1 hour
      await redisCache.set(cacheKey, JSON.stringify(analysis), { ttl: 3600 })

      return analysis
    } catch (error) {
      console.error("Failed to generate sustainability analysis:", error)
      throw new Error("Failed to generate sustainability analysis")
    }
  }

  async suggestFinancing(projectContext: ProjectContext): Promise<FinancingOptions> {
    const cacheKey = redisCache.generateKey("financing", `${projectContext.id}-${projectContext.estimated_cost || 0}`)

    // Check cache first
    const cached = await redisCache.get(cacheKey)
    if (cached) {
      return JSON.parse(cached)
    }

    const prompt = `Foreslå omfattende finansieringsalternativer for dette norske byggeprosjektet.

Prosjektdetaljer:
- Navn: ${projectContext.name}
- Estimert kostnad: ${projectContext.estimated_cost ? `${projectContext.estimated_cost} NOK` : "Ikke spesifisert"}
- Lokasjon: ${projectContext.location || "Norge"}
- Type: ${projectContext.project_type || "Generell bygging"}
- Størrelse: ${projectContext.square_meters ? `${projectContext.square_meters}m²` : "Ikke spesifisert"}
- Bærekraftsscore: ${projectContext.sustainability_score || "Ikke vurdert"}

Gi finansieringsanbefalinger i følgende JSON-format:

{
  "total_project_cost": <estimert kostnad i NOK>,
  "financing_options": [
    {
      "type": "<grønt_lån|energieffektivitet|bærekraftstilskudd|skatteincitament|bedriftslån>",
      "title": "<alternativtittel>",
      "description": "<detaljert beskrivelse>",
      "amount": <beløp i NOK>,
      "interest_rate": <prosent>,
      "term_months": <tall>,
      "requirements": ["<krav>"],
      "benefits": ["<fordel>"],
      "provider": "<bank/institusjonsnavn>",
      "application_url": "<URL>",
      "eligibility_score": <tall 1-100>,
      "processing_time_days": <tall>
    }
  ],
  "government_incentives": [
    {
      "name": "<incentivnavn>",
      "amount": <beløp i NOK>,
      "requirements": ["<krav>"],
      "application_deadline": "<dato>"
    }
  ]
}

Fokuser på gjeldende norske finansieringsalternativer, inkludert Enova-tilskudd, Husbanken-lån og store norske banker.`

    try {
      const result = await generateText({
        model: this.model,
        system: this.getSystemPrompt("financing", projectContext),
        prompt,
        maxTokens: 1000,
      })

      const financing = JSON.parse(result.text)

      // Cache for 24 hours
      await redisCache.set(cacheKey, JSON.stringify(financing), { ttl: 86400 })

      return financing
    } catch (error) {
      console.error("Failed to generate financing options:", error)
      throw new Error("Failed to generate financing options")
    }
  }

  async generateProjectPlan(projectContext: ProjectContext): Promise<ProjectPlan> {
    const cacheKey = redisCache.generateKey("plan", projectContext.id)

    // Check cache first
    const cached = await redisCache.get(cacheKey)
    if (cached) {
      return JSON.parse(cached)
    }

    const prompt = `Lag en detaljert prosjektplan for dette norske byggeprosjektet.

Prosjektdetaljer:
- Navn: ${projectContext.name}
- Beskrivelse: ${projectContext.description || "Ikke oppgitt"}
- Lokasjon: ${projectContext.location || "Norge"}
- Type: ${projectContext.project_type || "Generell bygging"}
- Størrelse: ${projectContext.square_meters ? `${projectContext.square_meters}m²` : "Ikke spesifisert"}
- Budsjett: ${projectContext.budget_range || "Ikke spesifisert"}
- Målferdigstillelse: ${projectContext.target_completion_date || "Ikke spesifisert"}

Gi en omfattende prosjektplan i følgende JSON-format:

{
  "phases": [
    {
      "name": "<fasenavn>",
      "description": "<detaljert beskrivelse>",
      "duration_weeks": <tall>,
      "cost_estimate": <kostnad i NOK>,
      "dependencies": ["<avhengighet>"],
      "deliverables": ["<leveranse>"],
      "sustainability_considerations": ["<hensyn>"]
    }
  ],
  "timeline": {
    "total_duration_weeks": <tall>,
    "critical_path": ["<fase>"],
    "milestones": [
      {
        "name": "<milepælnavn>",
        "week": <ukenummer>,
        "description": "<beskrivelse>"
      }
    ]
  },
  "risk_assessment": [
    {
      "risk": "<risikobeskrivelse>",
      "probability": "<lav|middels|høy>",
      "impact": "<lav|middels|høy>",
      "mitigation": "<risikoreduksjonsstrategi>"
    }
  ],
  "compliance_checkpoints": [
    {
      "phase": "<fasenavn>",
      "requirements": ["<krav>"],
      "documentation_needed": ["<dokument>"]
    }
  ]
}

Ta hensyn til norske byggesesonger, tillatelsesprosesser og lokale markedsforhold.`

    try {
      const result = await generateText({
        model: this.model,
        system: this.getSystemPrompt("planning", projectContext),
        prompt,
        maxTokens: 1000,
      })

      const plan = JSON.parse(result.text)

      // Cache for 2 hours
      await redisCache.set(cacheKey, JSON.stringify(plan), { ttl: 7200 })

      return plan
    } catch (error) {
      console.error("Failed to generate project plan:", error)
      throw new Error("Failed to generate project plan")
    }
  }

  private getSystemPrompt(
    type: "chat" | "sustainability" | "financing" | "planning",
    projectContext?: ProjectContext,
  ): string {
    const baseContext = `Du er en ekspert norsk byggrådgiver som spesialiserer seg på bærekraftig bygging, renovering og interiørdesign. Du har dyp kunnskap om:

- Norske byggeforskrifter (TEK17, NS-standarder)
- Bærekraftige byggematerialer og teknikker
- Energieffektivitet og miljøpåvirkning
- Norske finansieringsalternativer og offentlige incentiver
- Lokale leverandører og entreprenører
- Klimahensyn for norsk bygging

Gi alltid praktiske, gjennomførbare råd tilpasset norske forhold og forskrifter.`

    const projectInfo = projectContext
      ? `

Gjeldende prosjektkontekst:
- Prosjekt: ${projectContext.name}
- Lokasjon: ${projectContext.location || "Norge"}
- Type: ${projectContext.project_type || "Generell bygging"}
- Størrelse: ${projectContext.square_meters ? `${projectContext.square_meters}m²` : "Ikke spesifisert"}
- Budsjett: ${projectContext.budget_range || "Ikke spesifisert"}
- Bærekraftsscore: ${projectContext.sustainability_score || "Ikke vurdert"}
- Spesielle krav: ${projectContext.special_requirements?.join(", ") || "Ingen spesifisert"}
- Målferdigstillelse: ${projectContext.target_completion_date || "Ikke spesifisert"}`
      : ""

    switch (type) {
      case "sustainability":
        return `${baseContext}${projectInfo}

Du utfører nå en omfattende bærekraftsanalyse. Fokuser på:
1. TEK17-samsvar og energieffektivitet
2. Bærekraftige materialer og byggemetoder
3. Reduksjon av miljøpåvirkning
4. Kostnadseffektive bærekraftsforbedringer
5. Norske sertifiseringsmuligheter (BREEAM-NOR, Passivhus, etc.)

Gi spesifikke, målbare anbefalinger med kostnadsestimater i NOK.`

      case "financing":
        return `${baseContext}${projectInfo}

Du gir nå finansieringsanbefalinger. Fokuser på:
1. Norske banker og låneinstitusjoner
2. Offentlige tilskudd og incentiver (Enova, Husbanken, etc.)
3. Grønne lån og bærekraftsfinansiering
4. Skatteincitamenter og fradrag
5. Regionale og kommunale støtteordninger

Gi spesifikke långivere, gjeldende renter og søknadsprosesser.`

      case "planning":
        return `${baseContext}${projectInfo}

Du lager nå en detaljert prosjektplan. Fokuser på:
1. Norske byggesesonger og værhensyn
2. Tillatelseskrav og godkjenningsprosesser
3. Lokale leverandørers leveringstider og tilgjengelighet
4. Tilgjengelighet av fagarbeidere i Norge
5. Samsvarskontrollpunkter og inspeksjoner

Lag en realistisk tidsplan med norske markedsforhold i tankene.`

      default:
        return `${baseContext}${projectInfo}

Vær inspirerende og kreativ i dine forslag, og fokuser på å hjelpe brukeren med å visualisere og planlegge sitt drømmeprosjekt. Svar alltid på norsk og vær vennlig og profesjonell.`
    }
  }
}

export const aiService = new AIServiceClass()
export const AIService = aiService // Named export for compatibility
