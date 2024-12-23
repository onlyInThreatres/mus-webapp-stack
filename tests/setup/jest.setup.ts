/**
 * 🧪 Jest Setup Configuration
 */

import '@testing-library/jest-dom'
import dotenv from 'dotenv'

// 🔧 Load test environment variables
dotenv.config({ path: '.env.test' })

// 🧹 Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks()
})

// ⏱️ Set default timeout
jest.setTimeout(30000)