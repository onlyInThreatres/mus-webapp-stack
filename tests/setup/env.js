// 🔧 Test environment configuration
const testEnv = {
  // Use production Supabase credentials for testing
  NEXT_PUBLIC_SUPABASE_URL: 'https://pqcgagpijzghdedxwemi.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxY2dhZ3BpanpnaGRlZHh3ZW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MTY5NDYsImV4cCI6MjA1MDQ5Mjk0Nn0.qeEdgrHqdMiDgv5OIj043G5tck0MSvHDLYi6BHyuEmE'
}

// 🚦 Environment mode check
const isProduction = process.env.NODE_ENV === 'production'

// 📝 Debug environment variables (no sensitive data)
console.log('🔧 Test environment loaded:', {
  hasUrl: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_URL),
  hasKey: Boolean(testEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  env: process.env.NODE_ENV
})

// 📤 Export using CommonJS for Jest compatibility
module.exports = {
  testEnv,
  isProduction,
} 