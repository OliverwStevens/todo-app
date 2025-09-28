import React, { Component } from "react";
import "./App.css";
import GlobalContext from "./GlobalContext";
export default class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  changeCategory() {
    const { category, toggleGlobalState } = this.context;

    toggleGlobalState()
  }
  static contextType = GlobalContext;

  render() {
    
    const { category, toggleGlobalState } = this.context;

    
    return (
      <form className="todo-form" data-testid="todo-form">
          <div className="todo">
            <input placeholder="Add todo..." autoFocus/>
            <button type="button" className="btn btn--primary btn--icon" onClick={this.changeCategory.bind(this)} data-testid="category-btn">
              <span className="material-symbols-outlined icon--high-emphasis icon icon--x-large">domain</span>
            </button>
          </div>
        </form>
    )
  }
}