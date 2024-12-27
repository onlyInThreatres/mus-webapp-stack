/**
 * 🧪 Test Environment Configuration
 * Sets up test environment and mocks for Supabase
 */

import { createClient } from '@supabase/supabase-js'
import { Database, Profile } from '../../lib/types/supabase'

// 🔒 Test environment variables
export const TEST_CONFIG = {
  supabase: {
    url: process.env.TEST_SUPABASE_URL || 'http://localhost:54321',
    anonKey: process.env.TEST_SUPABASE_ANON_KEY || 'test-anon-key',
    // We'll use a separate test database
    dbUrl: process.env.TEST_DATABASE_URL || 'postgresql://postgres:postgres@localhost:54321/postgres'
  }
}

// 🧪 Create test client
export const testClient = createClient<Database>(
  TEST_CONFIG.supabase.url,
  TEST_CONFIG.supabase.anonKey
)

// 🧰 Test utilities
export const resetTestData = async () => {
  // Clear test data between tests
  await testClient.from('profiles').delete().neq('id', 'system')
  await testClient.from('subscriptions').delete().neq('id', 'system')
  await testClient.from('audit_logs').delete().neq('id', 'system')
}

// 📝 Test data generators
export const generateTestProfile = (override: Partial<Profile> = {}): Profile => ({
  id: 'test-user-id',
  email: 'test@example.com',
  full_name: 'Test User',
  avatar_url: null,
  is_verified: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...override
}) 