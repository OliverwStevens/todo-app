import { render, screen } from "@testing-library/react"
import GlobalContext from "../GlobalContext"
import "@testing-library/jest-dom"
import { expect, vi } from "vitest"
import userEvent from '@testing-library/user-event'
import Todo from "../Todo"


describe("Todo", async () => {
  it("calls the callback when the checkbox gets changed", async () => {
    const todo = { id: 1, text: "One", category: "Workplace", complete: false }
    const onUpdateTodoHandler = vi.fn()
    render(
      <GlobalContext.Provider value={{ category: "Workplace", toggleGlobalState: vi.fn() }}>
       <Todo key={todo.id} {...todo} onUpdateTodoHandler={onUpdateTodoHandler} />

      </GlobalContext.Provider>
    )

    const checkbox = screen.getByTestId(`cbx-${todo.id}`)
    await userEvent.click(checkbox)
    expect(onUpdateTodoHandler).toHaveBeenCalled()
  })
})
