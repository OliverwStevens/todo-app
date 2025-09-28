import React, { Component } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import "./CheckBox.css";

import Header from "./Header.jsx";

import { create, readFile, mkdir, BaseDirectory } from '@tauri-apps/plugin-fs';
import { appLocalDataDir } from "@tauri-apps/api/path";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      greetMsg: "",
      fileMsg: "",
      appDataDir: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleManageFile = this.handleManageFile.bind(this);
  }

  async componentDidMount() {
    try {
      const dir = await appLocalDataDir();
      this.setState({ appDataDir: dir });
      console.log("App data directory:", dir);
    } catch (err) {
      console.error("Failed to get app data directory:", err);
    }
  }

  handleInputChange(event) {
    this.setState({ name: event.currentTarget.value });
  }

  async greet() {
    try {
      const message = await invoke("greet", { name: this.state.name });
      this.setState({ greetMsg: message });
    } catch (err) {
      console.error("Greet error:", err);
      this.setState({ greetMsg: "Error greeting" });
    }
  }

  async writeFile() {
    try {

      const file = await create('bar.txt', { baseDir: BaseDirectory.AppData });
      await file.write(new TextEncoder().encode('Hello world'));
      await file.close();
      console.log('It worked')
      this.setState({ fileMsg: "File written successfully" });
    } catch (err) {
      console.error("Write error:", err);
      this.setState({ fileMsg: `Write failed: ${err}` });
    }
  }

  async readFile() {
    try {
      const content = await readFile('bar.txt', {
        baseDir: BaseDirectory.AppData,
      });
      const text = new TextDecoder('utf-8').decode(content);
      console.log(text, 'hi');
      this.setState({ fileMsg: `File content: ${text}` });
    } catch (err) {
      console.error("Read error:", err);
      this.setState({ fileMsg: `Read failed: ${err}` });
    }
  }

  async manageFile() {
    try {
      const appDataDir = await appLocalDataDir();
      await mkdir(appDataDir, { recursive: true });
      await this.writeFile();
      await this.readFile();
    } catch (err) {
      console.error("Manage file error:", err);
      this.setState({ fileMsg: `File management failed: ${err}` });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.greet();
  }

  async handleManageFile(event) {
    event.preventDefault();
    await this.manageFile();
  }

  render() {
    return (
      // <main className="container">
      //   <h1>Welcome to Tauri + React</h1>
      //   <form onSubmit={this.handleSubmit}>
      //     <input
      //       type="text"
      //       value={this.state.name}
      //       onChange={this.handleInputChange}
      //       placeholder="Enter a name..."
      //     />
      //     <button type="submit">Greet</button>
      //   </form>
      //   {this.state.greetMsg && <p>{this.state.greetMsg}</p>}
      //   <button onClick={this.handleManageFile}>Manage Test File</button>
      //   {this.state.appDataDir && <p>App Data Directory: {this.state.appDataDir}</p>}
      //   {this.state.fileMsg && <p>{this.state.fileMsg}</p>}
      // </main>

      <main className="app">
       <Header title="Workplace"/>
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

        <div className="todo-form">
          <div className="todo">
            <input placeholder="Add todo..." autoFocus/>
            <button className="btn btn--primary btn--icon">
              <span className="material-symbols-outlined icon--high-emphasis icon icon--x-large">domain</span>
            </button>
          </div>
        </div>


      </main>
    );
  }
}