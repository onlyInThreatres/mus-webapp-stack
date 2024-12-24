const { createClient } = require('@supabase/supabase-js')
const { testEnv } = require('./env')

let testClient = null

const getTestClient = () => {
  if (!testClient) {
    try {
      console.log('🔧 Initializing Supabase client for remote testing...')
      testClient = createClient(
        testEnv.NEXT_PUBLIC_SUPABASE_URL,
        testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
          db: {
            schema: 'public'
          }
        }
      )
      console.log('🟢 Remote Supabase client initialized')
    } catch (error) {
      console.error('🔴 Failed to initialize Supabase client:', error)
      throw error
    }
  }
  return testClient
}

const cleanupTestClient = () => {
  if (testClient) {
    console.log('🧹 Cleaning up test client')
    testClient = null
  }
}

module.exports = {
  getTestClient,
  cleanupTestClient
} 