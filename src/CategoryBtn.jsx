import React, { Component } from "react";
import GlobalContext from "./GlobalContext";

export default class CategoryBtn extends Component {
  static contextType = GlobalContext;

  handleClick = () => {
    this.context.toggleGlobalState();
  }

  render() {
    const { category } = this.context;

    const btnClass = category === "Workplace" ? "btn btn--primary btn--icon" : "btn btn--destructive btn--icon";
    const iconName = category === "Workplace" ? "domain" : "family_home";

    return (
      <button type="button" className={btnClass} onClick={this.handleClick} data-testid="category-btn">
        <span className="material-symbols-outlined icon--high-emphasis icon icon--x-large">{iconName}</span>
      </button>
    )
  }
}
