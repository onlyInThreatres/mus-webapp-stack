/**
 * Supabase Client Configuration
 * 
 * This file sets up and exports the Supabase client for use throughout the application.
 * @IPLINK:SUPABASE_DOCS - https://supabase.com/docs/reference/javascript/installing
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'
import { logger } from '../utils/logger'

// 🔍 Debug logging for environment variables
if (process.env.NODE_ENV === 'development') {
  console.log('🔍 Checking Supabase configuration...')
  console.log('URL configured:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('Anon key configured:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('⚠️ Missing NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('⚠️ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Separate debug configuration into its own module
const setupDebugListeners = (client: SupabaseClient) => {
  if (process.env.NODE_ENV === 'development') {
    client.channel('custom-debug-channel')
      .on(
        'broadcast',
        { event: 'debug' },
        (event) => {
          logger.debug('Supabase Event:', event)
        }
      )
      .subscribe((status) => {
        logger.debug('Supabase Debug Channel:', status)
      })
  }
}

// 🚀 Initialize typed Supabase client
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    db: {
      schema: 'public'
    }
  }
)

// Initialize debug listeners
setupDebugListeners(supabase)

/**
 * 🔍 Test Supabase Connection
 * Improved error handling and logging
 */
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (error) {
      throw error
    }
    
    console.log('🟢 Connection test result:', data)
    return true
  } catch (err) {
    console.error('🔴 Connection test failed:', err)
    return false
  }
} 