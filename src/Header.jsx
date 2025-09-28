import React, { Component } from "react";
import "./App.css";
import "./CheckBox.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <header className="content-header">
          <div className="content-header__details">

            <h1 className="content-header__title">Workplace</h1>

          </div>
          <div className="content-header__aside">
            <button className="btn btn--primary btn--icon">
              <span className="material-symbols-outlined icon--high-emphasis icon icon--x-large">domain</span>
            </button>
            <button className="btn">Action 2</button>
          </div>
        </header>
    )
  }
}