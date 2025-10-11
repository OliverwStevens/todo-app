import React, { Component } from "react"
import Todo from "./Todo"
import PropTypes from "prop-types"
import GlobalContext from "./GlobalContext"

export default class TodoPanel extends Component {
  static contextType = GlobalContext

  render() {
    const { todos, onUpdateTodoHandler } = this.props

    const { category } = this.context

    return (
      <div className="todo-panel">
        <div className="todo-panel__content">
          {todos.filter(todo => todo.category === category).map(todo => (
              <Todo key={todo.id} {...todo} onUpdateTodoHandler={onUpdateTodoHandler} />
            ))}
        </div>
      </div>
    )
    
  }
}

TodoPanel.propTypes = {
  todos: PropTypes.object.isRequired,
  onUpdateTodoHandler: PropTypes.func.isRequired
}
