/**
 * 🧪 Jest Setup Configuration
 */

import '@testing-library/jest-dom'
import { TEST_CONFIG, resetTestData, generateTestProfile } from './test-config'
import { Profile } from '../../lib/types/supabase'

// 🔧 Global test setup
beforeAll(() => {
  // Validate test environment
  if (!process.env.TEST_SUPABASE_URL) {
    console.warn('⚠️ TEST_SUPABASE_URL not set, using default')
  }
})

// 🧹 Clean up after each test
afterEach(async () => {
  // Reset test data
  await resetTestData()
})

// 📝 Global test utilities
declare global {
  var generateTestProfile: (override?: Partial<Profile>) => Profile
}

globalThis.generateTestProfile = generateTestProfile