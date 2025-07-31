import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client (singleton pattern)
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// Server-side Supabase client
export const createServerClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export default getSupabaseClient()

export type Database = {
  public: {
    Tables: {
      chat_sessions: {
        Row: {
          id: string
          session_id: string
          user_id: string | null
          title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_id?: string | null
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          user_id?: string | null
          title?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          role: "user" | "assistant" | "system"
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: "user" | "assistant" | "system"
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          role?: "user" | "assistant" | "system"
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
