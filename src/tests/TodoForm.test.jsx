import { render, screen, fireEvent } from "@testing-library/react"
import TodoForm from "../TodoForm"
import GlobalContext from "../GlobalContext"
import "@testing-library/jest-dom"
import { expect, vi } from "vitest"

describe("TodoForm", () => {
  
  it("shows the todo form", () => {
    render(
      <GlobalContext.Provider value={{ category: "Workplace", toggleGlobalState: vi.fn() }}>
        <TodoForm/>
      </GlobalContext.Provider>
    )

    expect(screen.getByTestId("todo-form")).toBeInTheDocument()
  })

  it("submits a todo and calls FileService.addTodo", async () => {
    const spy = vi.fn()
    render(
      <GlobalContext.Provider value={{ category: "Workplace", toggleGlobalState: vi.fn() }}>
        <TodoForm onAddTodo={spy}/>
      </GlobalContext.Provider>
    )

    // Type into input
    const input = screen.getByPlaceholderText("Add todo...")
    fireEvent.change(input, { target: { value: "Finish testing" } })

    // Click submit
    const button = screen.getByText("Submit")
    fireEvent.click(button)

    expect(spy).toHaveBeenCalled()
  })
})
