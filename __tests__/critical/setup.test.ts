describe('Test Setup', () => {
  test('environment is configured', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  test('can run basic test', () => {
    expect(true).toBe(true)
  })
}) 