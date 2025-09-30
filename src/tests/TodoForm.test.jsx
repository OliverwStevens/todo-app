import { render, screen, fireEvent } from "@testing-library/react"
import TodoForm from "../TodoForm"
import GlobalContext from "../GlobalContext"
import "@testing-library/jest-dom"
import { vi } from "vitest"
import FileService from "../utils/fileService"

vi.mock("../utils/fileService", () => ({
  default: {
    saveData: vi.fn().mockResolvedValue(undefined),
  },
}))

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

    // Grab the argument FileService.saveData was called with
    const callArg = FileService.saveData.mock.calls[0][0]

    // Assert all fields except id
    expect(callArg.text).toBe("Finish testing")
    expect(callArg.complete).toBe(false)
    expect(callArg.category).toBe("")
    expect(callArg.id).toBeTruthy() // UUID exists
  })
})
