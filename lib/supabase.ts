import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Project {
  id: string
  name: string
  description?: string
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
  user_email?: string
  user_name?: string
  company_name?: string
  phone?: string
  project_data: Record<string, any>
  estimated_cost?: number
  sustainability_score?: number
}

export interface Conversation {
  id: string
  project_id?: string
  title?: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  metadata: Record<string, any>
  created_at: string
}

export interface FinancingOption {
  id: string
  project_id: string
  type: 'green_loan' | 'energy_efficiency' | 'sustainability_grant' | 'tax_incentive'
  title: string
  description?: string
  amount?: number
  interest_rate?: number
  term_months?: number
  requirements?: string[]
  benefits?: string[]
  provider?: string
  application_url?: string
  created_at: string
}

export interface SustainabilityRecommendation {
  id: string
  project_id: string
  category: string
  title: string
  description?: string
  impact_score?: number
  cost_estimate?: number
  savings_estimate?: number
  implementation_time?: string
  priority: number
  created_at: string
}

// Project operations
export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getProject(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function updateProject(id: string, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// Conversation operations
export async function createConversation(conversation: Omit<Conversation, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('conversations')
    .insert([conversation])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getConversations(projectId?: string) {
  let query = supabase
    .from('conversations')
    .select('*')
    .order('created_at', { ascending: false })

  if (projectId) {
    query = query.eq('project_id', projectId)
  } else {
    query = query.limit(50)
  }

  const { data, error } = await query

  if (error) throw error
  return data || []
}

// Message operations
export async function createMessage(message: Omit<Message, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('messages')
    .insert([message])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data || []
}

// Financing options operations
export async function createFinancingOption(option: Omit<FinancingOption, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('financing_options')
    .insert([option])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getFinancingOptions(projectId: string) {
  const { data, error } = await supabase
    .from('financing_options')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Sustainability recommendations operations
export async function createSustainabilityRecommendation(
  recommendation: Omit<SustainabilityRecommendation, 'id' | 'created_at'>
) {
  const { data, error } = await supabase
    .from('sustainability_recommendations')
    .insert([recommendation])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getSustainabilityRecommendations(projectId: string) {
  const { data, error } = await supabase
    .from('sustainability_recommendations')
    .select('*')
    .eq('project_id', projectId)
    .order('priority', { ascending: true })

  if (error) throw error
  return data || []
}

// Statistics
export async function getProjectStats() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('status, sustainability_score, estimated_cost')

  if (error) throw error

  const stats = {
    total: projects?.length || 0,
    active: projects?.filter(p => p.status === 'active').length || 0,
    completed: projects?.filter(p => p.status === 'completed').length || 0,
    draft: projects?.filter(p => p.status === 'draft').length || 0,
    cancelled: projects?.filter(p => p.status === 'cancelled').length || 0,
    totalValue: projects?.reduce((sum, p) => sum + (p.estimated_cost || 0), 0) || 0,
    avgSustainabilityScore: projects?.length 
      ? Math.round(projects.reduce((sum, p) => sum + (p.sustainability_score || 0), 0) / projects.length)
      : 0
  }

  return stats
}
