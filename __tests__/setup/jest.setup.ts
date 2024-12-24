const dotenv = require('dotenv')
const { TextEncoder, TextDecoder } = require('util')

// Setup dotenv for tests
dotenv.config({ path: '.env.test' })

// Add TextEncoder/Decoder to global for tests
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Add any other test setup here
beforeAll(() => {
  // Setup before all tests
})

afterAll(() => {
  // Cleanup after all tests
}) 