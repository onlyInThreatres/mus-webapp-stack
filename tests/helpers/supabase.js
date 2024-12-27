const { createClient } = require('@supabase/supabase-js')
const { testEnv } = require('../../__tests__/setup/env')

// 🔗 Create test client
const getTestClient = () => {
  return createClient(
    testEnv.NEXT_PUBLIC_SUPABASE_URL,
    testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// 🧹 Clean test data
const cleanTestData = async () => {
  const supabase = getTestClient()
  // Add cleanup logic here based on your needs
  console.log('🧹 Cleaning test data...')
}

module.exports = {
  getTestClient,
  cleanTestData
} 