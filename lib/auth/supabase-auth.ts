// We'll start with Supabase auth for email/password
// This gives us a solid foundation and built-in features

import { type AuthCredentials } from './types'
import { supabase } from '@/lib/supabase'

export const emailAuth = {
  signUp: async ({ email, password }: AuthCredentials) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },
  
  signIn: async ({ email, password }: AuthCredentials) => {
    // Implementation with proper error handling
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      console.error('🔴 Sign in error:', error)
      throw error
    }
    
    return data
  }
} 