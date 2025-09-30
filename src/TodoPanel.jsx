import React, { Component } from "react"
import "./App.css"
import FileService from "./utils/fileService"
import Todo from "./Todo"

export default class TodoPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }

  async componentDidMount() {
    const data = await FileService.readData()
    this.setState({ todos: data })
  }

  render() {
    const { todos } = this.state

    return (
      <div className="todo-panel">
        <div className="todo-panel__content">
          {todos
            .filter(todo => !this.props.category || todo.category === this.props.category)
            .map(todo => (
              <Todo
                key={todo.id}
                {...todo}
              />
            ))}
        </div>
      </div>
    )
  }
}
