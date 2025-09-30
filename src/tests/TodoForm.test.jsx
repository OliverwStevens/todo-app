// src/tests/App.test.jsx
import { render, screen, fireEvent } from "@testing-library/react"
import TodoForm from "../TodoForm"
import GlobalContext from "../GlobalContext"
import "@testing-library/jest-dom"
import { vi } from "vitest"
import FileService from "../utils/FileService"
vi.mock("../utils/fileService", () => {
  return {
    default: {
      saveData: vi.fn().mockResolvedValue(undefined),
    },
  }
})

describe("TodoForm", () => {
  it("shows the todo form", () => {
    render(
      <GlobalContext.Provider value={{ category: "Workplace", toggleGlobalState: vi.fn() }}>
        <TodoForm />
      </GlobalContext.Provider>
    )

    expect(screen.getByTestId("todo-form")).toBeInTheDocument()
  })

  it("submits a todo and calls FileService.saveData", async () => {
    render(
      <GlobalContext.Provider value={{ category: "Workplace", toggleGlobalState: vi.fn() }}>
        <TodoForm />
      </GlobalContext.Provider>
    )

    // Type into input
    const input = screen.getByPlaceholderText("Add todo...")
    fireEvent.change(input, { target: { value: "Finish testing" } })

    // Click submit
    const button = screen.getByText("Submit")
    fireEvent.click(button)

    // Assert saveData was called with correct data
    expect(FileService.saveData).toHaveBeenCalledWith({
      id: 1,
      text: "Finish testing",
      complete: false,
      category: "", // matches your component state
    })
  })
})
