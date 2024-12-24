import { createClient } from '@supabase/supabase-js'
import { logger } from '@/lib/utils/logger'

// Environment validation
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables')
}

// Create client with development-specific options
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    debug: process.env.NODE_ENV === 'development'
  }
})

// Development logging
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
