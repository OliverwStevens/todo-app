import React, { Component } from "react";
import "./App.css";
import "./CheckBox.css";
import CategoryBtn from "./CategoryBtn";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <header className="content-header">
          <div className="content-header__details">

            <h1 className="content-header__title">{this.props.category}</h1>

          </div>
          <div className="content-header__aside">
            <CategoryBtn/>
            <button className="btn">Clear Complete</button>
          </div>
        </header>
    )
  }
}