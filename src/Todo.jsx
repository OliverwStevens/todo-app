import React, { Component } from "react"
import "./App.css"
import CategoryBtn from "./CategoryBtn"
import GlobalContext from "./GlobalContext";

export default class Todo extends Component {

  static contextType = GlobalContext;

  changeHandler(event) {
    const { category } = this.context
    this.props.onUpdateTodoHandler({ id: this.props.id, text: this.props.text, complete: event.target.checked, category: { category} })
  }
  render() {
    return (
      <div className="todo">
        <div className="checkbox-wrapper">
          <input
            className="inp-cbx"
            id={`cbx-${this.props.id}`}
            type="checkbox"
            defaultChecked={this.props.complete}
            style={{ display: "none" }}
            onChange={this.changeHandler.bind(this)}
          />
          <label className="cbx" htmlFor={`cbx-${this.props.id}`} data-testid={`cbx-${this.props.id}`}>
            <span>
              <svg width="12px" height="9px" viewBox="0 0 12 9">
                <polyline points="1 5 4 8 11 1" />
              </svg>
            </span>
            <span>{this.props.text}</span>
          </label>
        </div>
        <CategoryBtn />
      </div>
    )
  }
}
