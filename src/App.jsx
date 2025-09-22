import React, { Component } from 'react';
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greetMsg: ''
    };
    // Bind methods to preserve 'this' context
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.greet = this.greet.bind(this);
  }

  // Handle input changes (like Rails form helpers)
  handleInputChange(event) {
    this.setState({ name: event.currentTarget.value });
  }

  // Handle form submission
  handleSubmit(event) {
    event.preventDefault();
    this.greet();
  }

  // Call Rust command (MVC: Controller action)
  async greet() {
    try {
      const message = await invoke("greet", { 
        name: this.state.name 
      });
      this.setState({ greetMsg: message });
    } catch (error) {
      console.error('Greeting failed:', error);
      this.setState({ greetMsg: 'Error: Could not greet' });
    }
  }

  render() {
    return (
      <main className="container">
        <h1>Welcome to Tauri + React</h1>

        <div className="row">
          <a href="https://vite.dev" target="_blank">
            <img src="/vite.svg" className="logo vite" alt="Vite logo" />
          </a>
          <a href="https://tauri.app" target="_blank">
            <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>

        <form
          className="row"
          onSubmit={this.handleSubmit}
        >
          <input
            id="greet-input"
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>
        
        {this.state.greetMsg && (
          <p>{this.state.greetMsg}</p>
        )}
      </main>
    );
  }
}