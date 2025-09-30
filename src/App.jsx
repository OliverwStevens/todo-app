import React, { Component } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import "./CheckBox.css";

import Header from "./Header.jsx";

import { create, readFile, mkdir, BaseDirectory } from '@tauri-apps/plugin-fs';
import { appLocalDataDir } from "@tauri-apps/api/path";
import TodoForm from "./TodoForm.jsx";
import GlobalContext from "./GlobalContext";



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      greetMsg: "",
      fileMsg: "",
      appDataDir: "",
      category: 'Workplace'
    };
  }

  toggleGlobalState = () => {
    this.setState(prev => ({
      category: prev.category === 'Workplace' ? 'Home' : 'Workplace'
    }));
  };
  

  async greet() {
    try {
      const message = await invoke("greet", { name: this.state.name });
      this.setState({ greetMsg: message });
    } catch (err) {
      console.error("Greet error:", err);
      this.setState({ greetMsg: "Error greeting" });
    }
  }

  changeCategory() {
    
  }

  render() {
    return (


      <GlobalContext.Provider value={{
        category: this.state.category,
        toggleGlobalState: this.toggleGlobalState
      }}>
        <main className="app">
       <Header category={this.state.category}/>
        <div className="todo-panel">
          <div className="todo-panel__content">

            <div className="todo">
              <div className="checkbox-wrapper">
                <input className="inp-cbx" id="cbx" type="checkbox" style={{ display: 'none' }} />
                <label className="cbx" htmlFor="cbx">
                  <span>
                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                      <polyline points="1 5 4 8 11 1" />
                    </svg>
                  </span>
                  <span>To-do aoiwj w waiofj ewj waeifj owfjew iowae jfio</span>
                </label>
              </div>
              <button className="btn btn--primary btn--icon">
                <span className="material-symbols-outlined icon--high-emphasis icon icon--x-large">domain</span>
              </button>
            </div>
          </div>


        </div>

        <TodoForm category={this.state.category}/>


      </main>
      </GlobalContext.Provider>
    );
  }
}