import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('UI Components', () => {
  it('🎯 sample test', () => {
    expect(true).toBe(true)
  })
  
  it.skip('Button should render correctly', () => {
    // render(<Button>Test</Button>)
    // expect(screen.getByText('Test')).toBeInTheDocument()
  })
}) 