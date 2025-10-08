import React, { Component } from "react";
import "./App.css";
import "./CheckBox.css";
import CategoryBtn from "./CategoryBtn";
import GlobalContext from "./GlobalContext";

export default class Header extends Component {
  static contextType = GlobalContext;

  render() {
    const { category } = this.context;
    return (
      <header className="content-header">
        <div className="content-header__details">
          <h1 className="content-header__title">{category}</h1>
        </div>
        <div className="content-header__aside">
          <CategoryBtn/>
          <button className="btn">Clear Complete</button>
        </div>
      </header>
    );
  }
}
