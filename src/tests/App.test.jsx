// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import '@testing-library/jest-dom'
import { expect } from 'vitest'
import FileService from '../utils/fileService'
import React from 'react'
describe('App', () => {
  it('show the welcome text', () => {
    render(<App />)
    expect(screen.getByText('Workplace')).toBeInTheDocument()
  })

  it('changes the category', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByText('Workplace')).toBeInTheDocument()

    const btn = screen.getAllByTestId('category-btn')[0]
    await user.click(btn)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('creates a new todo and shows it on the screen', async () => {
    const user = userEvent.setup()

    // Override default mocks for this test
    FileService.readData
      .mockResolvedValueOnce([]) // initial
      .mockResolvedValueOnce([{ text: 'Finish testing' }]) // after save

    render(<App />)

    const input = screen.getByPlaceholderText('Add todo...')
    await user.type(input, 'Finish testing')
    await user.click(screen.getByText('Submit'))

    expect(FileService.addTodo).toHaveBeenCalledTimes(1)
    expect(FileService.addTodo.mock.calls[0][0].text).toBe('Finish testing')
    expect(await screen.findByText('Finish testing')).toBeInTheDocument()
  })

  it('lets me update a previous todo', async () => {
    const user = userEvent.setup()
  
    const todo = { id: 1, text: "One", category: "Workplace", complete: false }
  
    FileService.readData.mockResolvedValueOnce([todo])
    render(<App />)
  
    expect(await screen.findByText('One')).toBeInTheDocument()
  
    const checkboxLabel = screen.getByTestId(`cbx-${todo.id}`)
    await user.click(checkboxLabel)
  
    expect(FileService.updateData).toHaveBeenCalledTimes(1)
  
    const updatedTodo = FileService.updateData.mock.calls[0][0]
    expect(updatedTodo.complete).toBe(true)
  })

  it('lets me clear the completed todos of a category', async () => {
    const user = userEvent.setup()
  
    const todos = [
      { id: 1, text: "Complete", category: "Workplace", complete: true },
      { id: 2, text: "Incomplete", category: "Workplace", complete: false }
    ]
  
    FileService.readData.mockResolvedValueOnce(todos)
    render(<App />)
  
    expect(await screen.findByText('Complete')).toBeInTheDocument()
    expect(await screen.findByText('Incomplete')).toBeInTheDocument()

    const clearBtn = screen.getByTestId('clear-btn')
    await user.click(clearBtn)
  
    expect(FileService.clearCompletedTodos).toHaveBeenCalledTimes(1)
    expect(FileService.clearCompletedTodos).toHaveBeenCalledWith("Workplace")

    // expect(await screen.findByText('Incomplete')).toBeInTheDocument()
    // expect(await screen.findByText('Complete')).not.toBeInTheDocument()

  })
  
  
})
