import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Projects API
export const projectsApi = {
  async getAll() {
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

    if (error) throw error
    return data
  },

  async create(project: {
    name: string
    description?: string
    user_email?: string
    user_name?: string
    company_name?: string
    phone?: string
    project_data?: any
    estimated_cost?: number
    location?: string
    project_type?: string
    square_meters?: number
    target_completion_date?: string
    budget_range?: string
    special_requirements?: string[]
  }) {
    const { data, error } = await supabase.from("projects").insert([project]).select().single()

    if (error) throw error
    return data
  },

  async update(
    id: string,
    updates: Partial<{
      name: string
      description: string
      status: string
      project_data: any
      estimated_cost: number
      sustainability_score: number
      location: string
      project_type: string
      square_meters: number
      target_completion_date: string
      budget_range: string
      special_requirements: string[]
    }>,
  ) {
    const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) throw error
  },

  async getByStatus(status: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },
}

// Conversations API
export const conversationsApi = {
  async getByProjectId(projectId: string) {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async create(conversation: {
    project_id: string
    title?: string
    conversation_type?: string
  }) {
    const { data, error } = await supabase.from("conversations").insert([conversation]).select().single()

    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase.from("conversations").select("*").eq("id", id).single()

    if (error) throw error
    return data
  },

  async update(
    id: string,
    updates: {
      title?: string
      status?: string
    },
  ) {
    const { data, error } = await supabase.from("conversations").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },
}

// Messages API
export const messagesApi = {
  async getByConversationId(conversationId: string) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })

    if (error) throw error
    return data
  },

  async create(message: {
    conversation_id: string
    role: "user" | "assistant" | "system"
    content: string
    metadata?: any
    tokens_used?: number
    model_used?: string
    processing_time_ms?: number
  }) {
    const { data, error } = await supabase.from("messages").insert([message]).select().single()

    if (error) throw error
    return data
  },

  async getRecent(limit = 50) {
    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        conversations (
          title,
          project_id,
          projects (
            name
          )
        )
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },
}

// Sustainability Recommendations API
export const sustainabilityApi = {
  async getByProjectId(projectId: string) {
    const { data, error } = await supabase
      .from("sustainability_recommendations")
      .select("*")
      .eq("project_id", projectId)
      .order("priority", { ascending: true })

    if (error) throw error
    return data
  },

  async create(recommendation: {
    project_id: string
    category: string
    title: string
    description?: string
    impact_score?: number
    cost_estimate?: number
    savings_estimate?: number
    implementation_time?: string
    priority?: number
    status?: string
    environmental_impact?: string
    roi_months?: number
    certification_eligible?: boolean
  }) {
    const { data, error } = await supabase
      .from("sustainability_recommendations")
      .insert([recommendation])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(
    id: string,
    updates: {
      status?: string
      priority?: number
      cost_estimate?: number
      savings_estimate?: number
    },
  ) {
    const { data, error } = await supabase
      .from("sustainability_recommendations")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase.from("sustainability_recommendations").delete().eq("id", id)

    if (error) throw error
  },

  async getByCategory(projectId: string, category: string) {
    const { data, error } = await supabase
      .from("sustainability_recommendations")
      .select("*")
      .eq("project_id", projectId)
      .eq("category", category)
      .order("priority", { ascending: true })

    if (error) throw error
    return data
  },
}

// Financing Options API
export const financingApi = {
  async getByProjectId(projectId: string) {
    const { data, error } = await supabase
      .from("financing_options")
      .select("*")
      .eq("project_id", projectId)
      .order("eligibility_score", { ascending: false })

    if (error) throw error
    return data
  },

  async create(option: {
    project_id: string
    type: "green_loan" | "energy_efficiency" | "sustainability_grant" | "tax_incentive" | "business_loan"
    title: string
    description?: string
    amount?: number
    interest_rate?: number
    term_months?: number
    requirements?: string[]
    benefits?: string[]
    provider?: string
    application_url?: string
    status?: string
    eligibility_score?: number
    processing_time_days?: number
    contact_info?: any
  }) {
    const { data, error } = await supabase.from("financing_options").insert([option]).select().single()

    if (error) throw error
    return data
  },

  async update(
    id: string,
    updates: {
      status?: string
      eligibility_score?: number
      amount?: number
      interest_rate?: number
    },
  ) {
    const { data, error } = await supabase.from("financing_options").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  async getByType(projectId: string, type: string) {
    const { data, error } = await supabase
      .from("financing_options")
      .select("*")
      .eq("project_id", projectId)
      .eq("type", type)
      .order("eligibility_score", { ascending: false })

    if (error) throw error
    return data
  },
}

// Analytics API
export const analyticsApi = {
  async logEvent(projectId: string, eventType: string, eventData: any) {
    const { data, error } = await supabase
      .from("project_analytics")
      .insert([
        {
          project_id: projectId,
          event_type: eventType,
          event_data: eventData,
          user_session: eventData.user_session || null,
          ip_address: eventData.ip || null,
          user_agent: eventData.user_agent || null,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getEventsByProject(projectId: string, limit = 100) {
    const { data, error } = await supabase
      .from("project_analytics")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  async getEventsByType(eventType: string, limit = 100) {
    const { data, error } = await supabase
      .from("project_analytics")
      .select("*")
      .eq("event_type", eventType)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  async getProjectStats() {
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("id, status, created_at, sustainability_score, estimated_cost")

    if (projectsError) throw projectsError

    const { data: events, error: eventsError } = await supabase
      .from("project_analytics")
      .select("event_type, created_at")
      .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

    if (eventsError) throw eventsError

    const stats = {
      total_projects: projects.length,
      active_projects: projects.filter((p) => p.status === "active").length,
      completed_projects: projects.filter((p) => p.status === "completed").length,
      average_sustainability_score:
        projects.filter((p) => p.sustainability_score).reduce((sum, p) => sum + (p.sustainability_score || 0), 0) /
          projects.filter((p) => p.sustainability_score).length || 0,
      total_estimated_value: projects.reduce((sum, p) => sum + (p.estimated_cost || 0), 0),
      events_last_30_days: events.length,
      most_common_events: events.reduce((acc: any, event) => {
        acc[event.event_type] = (acc[event.event_type] || 0) + 1
        return acc
      }, {}),
    }

    return stats
  },

  async getEventCounts(projectId?: string, days = 30) {
    let query = supabase
      .from("project_analytics")
      .select("event_type, created_at")
      .gte("created_at", new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())

    if (projectId) {
      query = query.eq("project_id", projectId)
    }

    const { data, error } = await query

    if (error) throw error

    const counts = data.reduce((acc: any, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1
      return acc
    }, {})

    return counts
  },
}

// AI Analysis Cache API
export const aiCacheApi = {
  async get(cacheKey: string) {
    const { data, error } = await supabase
      .from("ai_analysis_cache")
      .select("*")
      .eq("cache_key", cacheKey)
      .gt("expires_at", new Date().toISOString())
      .single()

    if (error && error.code !== "PGRST116") throw error
    return data
  },

  async set(cacheKey: string, analysisType: string, inputData: any, outputData: any, ttlSeconds = 3600) {
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString()

    const { data, error } = await supabase
      .from("ai_analysis_cache")
      .upsert([
        {
          cache_key: cacheKey,
          analysis_type: analysisType,
          input_data: inputData,
          output_data: outputData,
          expires_at: expiresAt,
          model_version: "grok-beta",
          confidence_score: 0.85,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async invalidate(pattern: string) {
    const { error } = await supabase.from("ai_analysis_cache").delete().like("cache_key", `${pattern}%`)

    if (error) throw error
  },

  async cleanup() {
    const { error } = await supabase.from("ai_analysis_cache").delete().lt("expires_at", new Date().toISOString())

    if (error) throw error
  },
}

// Health check function
export const healthCheck = async () => {
  try {
    const { data, error } = await supabase.from("projects").select("count").limit(1)

    if (error) throw error

    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
    }
  } catch (error) {
    return {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
