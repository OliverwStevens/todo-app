// src/tests/App.test.jsx
import { render, screen } from "@testing-library/react"
import GlobalContext from "../GlobalContext"
import "@testing-library/jest-dom"
import { vi } from "vitest"
import TodoPanel from "../TodoPanel"

vi.mock("../utils/fileService", () => {
  return {
    default: {
      saveData: vi.fn().mockResolvedValue(undefined),
      readData: vi.fn(), // we’ll control it per test
    },
  }
})

import FileService from "../utils/fileService"

describe("TodoPanel", () => {
  it("shows the todo panel with 5 todos in the Workplace category", async () => {
    // 👇 Make readData return 5 todos, all in Workplace category
    FileService.readData.mockResolvedValueOnce([
      { id: 1, text: "One", category: "Workplace", complete: false },
      { id: 2, text: "Two", category: "Workplace", complete: false },
      { id: 3, text: "Three", category: "Workplace", complete: false },
      { id: 4, text: "Four", category: "Workplace", complete: false },
      { id: 5, text: "Five", category: "Workplace", complete: false },
    ])

    render(
      <GlobalContext.Provider value={{ category: "Workplace", toggleGlobalState: vi.fn() }}>
        <TodoPanel />
      </GlobalContext.Provider>
    )

    // Wait for todos to render (if TodoPanel is async)
    const buttons = await screen.findAllByRole("button")
    expect(buttons).toHaveLength(5)
  })
})
