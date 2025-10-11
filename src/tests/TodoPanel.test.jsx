// src/tests/App.test.jsx
import { render, screen } from "@testing-library/react"
import GlobalContext from "../GlobalContext"
import "@testing-library/jest-dom"
import { expect, vi } from "vitest"
import TodoPanel from "../TodoPanel"
import React from "react"

describe("TodoPanel", () => {
  it("shows the todo panel with 5 todos in the Workplace category", async () => {
    const todos = [
      { id: 1, text: "One", category: "Workplace", complete: false },
      { id: 2, text: "Two", category: "Workplace", complete: false },
      { id: 3, text: "Three", category: "Workplace", complete: false },
      { id: 4, text: "Four", category: "Workplace", complete: false },
      { id: 5, text: "Five", category: "Workplace", complete: false },
    ]

    render(
      <GlobalContext.Provider value={{ category: "Workplace", toggleGlobalState: vi.fn() }}>
        <TodoPanel todos={todos}/>
      </GlobalContext.Provider>
    )

    const buttons = await screen.findAllByRole("button")
    expect(buttons).toHaveLength(5)
  })

  it('only shows the todos that belong to the current category', async () => {
    const todos = [
      { id: 1, text: "Home todo", category: "Home", complete: false },
      { id: 2, text: "Work todo", category: "Workplace", complete: true },
      { id: 3, text: "Work todo", category: "Workplace", complete: false },
    ]

    render(
      <GlobalContext.Provider value={{ category: "Workplace", toggleGlobalState: vi.fn() }}>
        <TodoPanel todos={todos}/>
      </GlobalContext.Provider>
    )

    const buttons = await screen.findAllByRole("button")
    expect(buttons).toHaveLength(2)
    expect(screen.queryByText('Home todo')).not.toBeInTheDocument()
  })


})
