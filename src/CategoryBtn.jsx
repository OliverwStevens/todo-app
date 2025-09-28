import React, { Component } from "react";
import "./App.css";
import GlobalContext from "./GlobalContext";
export default class CategoryBtn extends Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  changeCategory() {
    const { category, toggleGlobalState } = this.context;
    console.log('hello')
    toggleGlobalState()
  }

  render() {
    
    return (
      <button type="button" className="btn btn--primary btn--icon" onClick={this.changeCategory.bind(this)} data-testid="category-btn">
        <span className="material-symbols-outlined icon--high-emphasis icon icon--x-large">domain</span>
      </button>
    )
  }
}