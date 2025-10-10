// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react'
import CategoryBtn from '../CategoryBtn'
import GlobalContext from '../GlobalContext'
import '@testing-library/jest-dom'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import React from 'react'

describe('CategoryBtn', () => {
  it('calls the toggleGlobalState function', async () => {
    const user = userEvent.setup()
    const mockFunction = vi.fn()

    render(
      <GlobalContext.Provider value={{ category: "Workplace", toggleGlobalState: mockFunction }}>
        <CategoryBtn />
      </GlobalContext.Provider>
    )
    
    const btn = screen.getByTestId('category-btn')
    await user.click(btn)
    expect(mockFunction).toHaveBeenCalled()
  })
})
