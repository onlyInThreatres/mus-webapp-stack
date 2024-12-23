export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          is_verified?: boolean
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          is_verified?: boolean
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          status: 'active' | 'canceled' | 'past_due' | 'trialing'
          price_id: string | null
          quantity: number | null
          trial_ends_at: string | null
          ends_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          stripe_customer_id?: string
          stripe_subscription_id?: string
          status: 'active' | 'canceled' | 'past_due' | 'trialing'
          price_id?: string
          quantity?: number
          trial_ends_at?: string
          ends_at?: string
        }
        Update: {
          status?: 'active' | 'canceled' | 'past_due' | 'trialing'
          price_id?: string
          quantity?: number
          trial_ends_at?: string
          ends_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          event_type: string
          resource_type: string
          resource_id: string | null
          description: string | null
          metadata: Json
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          user_id?: string
          event_type: string
          resource_type: string
          resource_id?: string
          description?: string
          metadata?: Json
          ip_address?: string
          user_agent?: string
        }
        Update: never // Audit logs are immutable
      }
    }
  }
}

// Export convenience types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type AuditLog = Database['public']['Tables']['audit_logs']['Row']

// Export insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert']
export type AuditLogInsert = Database['public']['Tables']['audit_logs']['Insert'] 