import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface Project {
  id: number
  name: string
  description: string | null
  status: "planning" | "in_progress" | "completed" | "on_hold"
  budget: number | null
  start_date: Date | null
  end_date: Date | null
  client_name: string | null
  client_email: string | null
  client_phone: string | null
  sustainability_score: number | null
  created_at: Date
  updated_at: Date
}

export interface Conversation {
  id: number
  project_id: number | null
  user_message: string
  ai_response: string
  created_at: Date
}

export interface SustainabilityAnalysis {
  id: number
  project_id: number
  analysis_data: any
  score: number
  recommendations: string[]
  created_at: Date
}

export interface FinancingOption {
  id: number
  project_id: number
  option_type: "loan" | "grant" | "subsidy" | "tax_credit"
  provider: string
  amount: number
  interest_rate: number | null
  terms: string | null
  eligibility_criteria: string[]
  created_at: Date
}

// Project operations
export async function createProject(project: Omit<Project, "id" | "created_at" | "updated_at">) {
  const result = await sql`
    INSERT INTO projects (name, description, status, budget, start_date, end_date, client_name, client_email, client_phone, sustainability_score)
    VALUES (${project.name}, ${project.description}, ${project.status}, ${project.budget}, ${project.start_date}, ${project.end_date}, ${project.client_name}, ${project.client_email}, ${project.client_phone}, ${project.sustainability_score})
    RETURNING *
  `
  return result[0] as Project
}

export async function getProjects(): Promise<Project[]> {
  const result = await sql`SELECT * FROM projects ORDER BY created_at DESC`
  return result as Project[]
}

export async function getProject(id: number): Promise<Project | null> {
  const result = await sql`SELECT * FROM projects WHERE id = ${id}`
  return (result[0] as Project) || null
}

export async function updateProject(id: number, updates: Partial<Project>) {
  const setClause = Object.keys(updates)
    .filter((key) => key !== "id" && key !== "created_at" && key !== "updated_at")
    .map((key) => `${key} = $${key}`)
    .join(", ")

  if (!setClause) return null

  const result = await sql`
    UPDATE projects 
    SET ${sql.unsafe(setClause)}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return (result[0] as Project) || null
}

export async function deleteProject(id: number): Promise<boolean> {
  const result = await sql`DELETE FROM projects WHERE id = ${id}`
  return result.count > 0
}

// Conversation operations
export async function createConversation(conversation: Omit<Conversation, "id" | "created_at">) {
  const result = await sql`
    INSERT INTO conversations (project_id, user_message, ai_response)
    VALUES (${conversation.project_id}, ${conversation.user_message}, ${conversation.ai_response})
    RETURNING *
  `
  return result[0] as Conversation
}

export async function getConversations(projectId?: number): Promise<Conversation[]> {
  if (projectId) {
    const result = await sql`SELECT * FROM conversations WHERE project_id = ${projectId} ORDER BY created_at DESC`
    return result as Conversation[]
  }
  const result = await sql`SELECT * FROM conversations ORDER BY created_at DESC LIMIT 50`
  return result as Conversation[]
}

// Sustainability analysis operations
export async function createSustainabilityAnalysis(analysis: Omit<SustainabilityAnalysis, "id" | "created_at">) {
  const result = await sql`
    INSERT INTO sustainability_analyses (project_id, analysis_data, score, recommendations)
    VALUES (${analysis.project_id}, ${JSON.stringify(analysis.analysis_data)}, ${analysis.score}, ${JSON.stringify(analysis.recommendations)})
    RETURNING *
  `
  return result[0] as SustainabilityAnalysis
}

export async function getSustainabilityAnalysis(projectId: number): Promise<SustainabilityAnalysis | null> {
  const result =
    await sql`SELECT * FROM sustainability_analyses WHERE project_id = ${projectId} ORDER BY created_at DESC LIMIT 1`
  return (result[0] as SustainabilityAnalysis) || null
}

// Financing options operations
export async function createFinancingOption(option: Omit<FinancingOption, "id" | "created_at">) {
  const result = await sql`
    INSERT INTO financing_options (project_id, option_type, provider, amount, interest_rate, terms, eligibility_criteria)
    VALUES (${option.project_id}, ${option.option_type}, ${option.provider}, ${option.amount}, ${option.interest_rate}, ${option.terms}, ${JSON.stringify(option.eligibility_criteria)})
    RETURNING *
  `
  return result[0] as FinancingOption
}

export async function getFinancingOptions(projectId: number): Promise<FinancingOption[]> {
  const result = await sql`SELECT * FROM financing_options WHERE project_id = ${projectId} ORDER BY created_at DESC`
  return result as FinancingOption[]
}

// Statistics
export async function getProjectStats() {
  const totalProjects = await sql`SELECT COUNT(*) as count FROM projects`
  const activeProjects = await sql`SELECT COUNT(*) as count FROM projects WHERE status IN ('planning', 'in_progress')`
  const completedProjects = await sql`SELECT COUNT(*) as count FROM projects WHERE status = 'completed'`
  const avgSustainabilityScore =
    await sql`SELECT AVG(sustainability_score) as avg FROM projects WHERE sustainability_score IS NOT NULL`

  return {
    total: Number(totalProjects[0].count),
    active: Number(activeProjects[0].count),
    completed: Number(completedProjects[0].count),
    avgSustainabilityScore: Number(avgSustainabilityScore[0].avg) || 0,
  }
}
