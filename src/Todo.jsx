import React, { Component } from "react"
import "./App.css"
import CategoryBtn from "./CategoryBtn"

export default class Todo extends Component {
  render() {
    return (
      <div className="todo">
        <div className="checkbox-wrapper">
          <input
            className="inp-cbx"
            id={`cbx-${this.props.id}`} // make it unique
            type="checkbox"
            checked={this.props.complete}
            readOnly
            style={{ display: "none" }}
          />
          <label className="cbx" htmlFor={`cbx-${this.props.id}`}>
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
