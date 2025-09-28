import React, { Component } from "react";
import "./App.css";
import GlobalContext from "./GlobalContext";
import CategoryBtn from "./CategoryBtn";
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
            <CategoryBtn/>
          </div>
        </form>
    )
  }
}