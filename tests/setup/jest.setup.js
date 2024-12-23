// 🔧 Load environment variables for testing
require('dotenv').config({ path: '.env.local' })

// 📝 Add any additional test setup here
console.log('🔍 Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  hasTestUrl: Boolean(process.env.TEST_SUPABASE_URL),
  hasTestKey: Boolean(process.env.TEST_SUPABASE_ANON_KEY)
}) 