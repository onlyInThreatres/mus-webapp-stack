describe('Test Setup', () => {
  it('environment is configured', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  it('can run basic test', () => {
    expect(true).toBe(true)
  })
}) 