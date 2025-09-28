import React, { Component } from "react";
import "./App.css";

export default class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <form className="todo-form" data-testId="todo-form">
          <div className="todo">
            <input placeholder="Add todo..." autoFocus/>
            <button className="btn btn--primary btn--icon">
              <span className="material-symbols-outlined icon--high-emphasis icon icon--x-large">domain</span>
            </button>
          </div>
        </form>
    )
  }
}