import React, { Component } from "react"
import "./App.css"

import Header from "./Header.jsx"
import TodoForm from "./TodoForm.jsx"
import GlobalContext from "./GlobalContext"
import TodoPanel from "./TodoPanel.jsx"
import FileService from "./utils/fileService"
import { register, unregisterAll } from '@tauri-apps/plugin-global-shortcut'
import { getCurrentWindow } from '@tauri-apps/api/window'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: "Workplace",
      todos: []
    }
  }

  async componentDidMount() {
    const data = await FileService.readData()
    this.setState({ todos: data })

    try {
      await unregisterAll()

      const win = getCurrentWindow()
  
      await register('Control+Alt+N', async () => {
        await win.unminimize()

        await win.setFocus()
      })
  
      await register('Command+Option+N', async () => {
        await win.unminimize()

        await win.setFocus()
      })
    } catch (error) {
      console.error('Failed to register shortcut:', error)
    }
  }

  componentWillUnmount() {
    // Clean up when component unmounts
    unregisterAll()
  }


  toggleGlobalState = () => {
    this.setState(prev => ({
      category: prev.category === "Workplace" ? "Home" : "Workplace"
    }))
  }

  handleAddTodo = async (todo) => {
    await FileService.addTodo(todo)   // Save once
    const updated = await FileService.readData() // Reload todos
    this.setState({ todos: updated })
  }

  handledUpdateTodo = async (todo) => {
    await FileService.updateData(todo)
    const updated = await FileService.readData()
    this.setState({ todos: updated })
  }

  handleClearTodos = async () => {
    await FileService.clearCompletedTodos(this.state.category)
    const updated = await FileService.readData()
    this.setState({ todos: updated })
  }

  

  render() {
    return (
      <GlobalContext.Provider
        value={{
          category: this.state.category,
          toggleGlobalState: this.toggleGlobalState
        }}
      >
        <main className="app">
          <Header handleClearTodos={this.handleClearTodos.bind(this)}/>
          {/* Pass todos + category */}
          <TodoPanel todos={this.state.todos} onUpdateTodoHandler={this.handledUpdateTodo.bind(this)} />
          {/* Give form a callback */}
          <TodoForm category={this.state.category} onAddTodo={this.handleAddTodo.bind(this)} />
        </main>
      </GlobalContext.Provider>
    )
  }
}
