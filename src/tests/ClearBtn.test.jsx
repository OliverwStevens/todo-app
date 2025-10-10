// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react'
import ClearBtn from '../ClearBtn'
import '@testing-library/jest-dom'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import React from 'react'

describe('ClearBtn', () => {
  it('calls the handleClick function', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <ClearBtn handleClick={handleClick}/>

    )
    
    const btn = screen.getByTestId('clear-btn')
    await user.click(btn)
    expect(handleClick).toHaveBeenCalled()
  })
})
