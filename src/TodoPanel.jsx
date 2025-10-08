import React, { Component } from "react";
import Todo from "./Todo";

export default class TodoPanel extends Component {
  render() {
    const { todos } = this.props;

    return (
      <div className="todo-panel">
        <div className="todo-panel__content">
          {todos.map(todo => (
              <Todo key={todo.id} {...todo} />
            ))}
        </div>
      </div>
    );
    
  }
}
