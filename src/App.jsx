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
import TodoPanel from "./TodoPanel.jsx";



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
        <TodoPanel/>

        <TodoForm category={this.state.category}/>


      </main>
      </GlobalContext.Provider>
    );
  }
}