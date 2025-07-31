import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface Project {
  id: string
  name: string
  description: string | null
  status: "planning" | "in_progress" | "completed" | "on_hold"
  budget: number | null
  start_date: Date | null
  end_date: Date | null
  sustainability_score: number | null
  financing_options: any | null
  created_at: Date
  updated_at: Date
}

export interface Conversation {
  id: string
  project_id: string | null
  user_message: string
  ai_response: string
  context_data: any | null
  created_at: Date
}

export class DatabaseService {
  // Projects
  static async createProject(data: Omit<Project, "id" | "created_at" | "updated_at">) {
    const result = await sql`
      INSERT INTO projects (name, description, status, budget, start_date, end_date, sustainability_score, financing_options)
      VALUES (${data.name}, ${data.description}, ${data.status}, ${data.budget}, ${data.start_date}, ${data.end_date}, ${data.sustainability_score}, ${data.financing_options})
      RETURNING *
    `
    return result[0] as Project
  }

  static async getProjects() {
    const result = await sql`
      SELECT * FROM projects 
      ORDER BY created_at DESC
    `
    return result as Project[]
  }

  static async getProject(id: string) {
    const result = await sql`
      SELECT * FROM projects 
      WHERE id = ${id}
    `
    return result[0] as Project | undefined
  }

  static async updateProject(id: string, data: Partial<Omit<Project, "id" | "created_at" | "updated_at">>) {
    const fields = Object.keys(data)
      .map((key) => `${key} = $${key}`)
      .join(", ")
    const values = Object.values(data)

    const result = await sql`
      UPDATE projects 
      SET ${sql(data)}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0] as Project
  }

  static async deleteProject(id: string) {
    await sql`DELETE FROM projects WHERE id = ${id}`
  }

  // Conversations
  static async createConversation(data: Omit<Conversation, "id" | "created_at">) {
    const result = await sql`
      INSERT INTO conversations (project_id, user_message, ai_response, context_data)
      VALUES (${data.project_id}, ${data.user_message}, ${data.ai_response}, ${data.context_data})
      RETURNING *
    `
    return result[0] as Conversation
  }

  static async getConversations(projectId?: string) {
    if (projectId) {
      const result = await sql`
        SELECT * FROM conversations 
        WHERE project_id = ${projectId}
        ORDER BY created_at DESC
      `
      return result as Conversation[]
    }

    const result = await sql`
      SELECT * FROM conversations 
      ORDER BY created_at DESC
      LIMIT 50
    `
    return result as Conversation[]
  }

  static async getProjectStats() {
    const result = await sql`
      SELECT 
        COUNT(*) as total_projects,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_projects,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as active_projects,
        AVG(sustainability_score) as avg_sustainability_score
      FROM projects
    `
    return result[0]
  }
}
