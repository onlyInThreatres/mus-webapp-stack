import { createClient } from '@supabase/supabase-js'
import { logger } from '@/lib/utils/logger'

// 🔒 Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('⚠️ Missing NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('⚠️ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

/**
 * 🔒 Supabase Client Configuration
 * Creates and exports a Supabase client instance
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// 🔍 Development logging
if (process.env.NODE_ENV === 'development') {
  logger.info('🚀 Supabase client initialized')
}

/**
 * 🧪 Test Supabase Connection
 */
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (error) throw error
    
    logger.info('🟢 Connection test successful', data)
    return true
  } catch (err) {
    logger.error('🔴 Connection test failed:', err)
    return false
  }
}
