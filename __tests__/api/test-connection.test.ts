import { testEnv } from '../setup/env'

describe('API Routes', () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  it('🔗 /api/test-connection should return success', async () => {
    const response = await fetch(`${BASE_URL}/api/test-connection`)
    const data = await response.json()
    expect(data.success).toBe(true)
  })
}) 