const { createClient } = require('@supabase/supabase-js')
const { testEnv } = require('./env')

/**
 * Creates and returns a Supabase client for testing
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
const getSupabaseClient = () => {
  return createClient(
    testEnv.NEXT_PUBLIC_SUPABASE_URL,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

module.exports = { getSupabaseClient } 