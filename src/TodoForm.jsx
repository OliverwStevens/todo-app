import React, { Component } from "react";
import "./App.css";
import CategoryBtn from "./CategoryBtn";
import { create, readFile, mkdir, BaseDirectory } from '@tauri-apps/plugin-fs';
import { appLocalDataDir } from "@tauri-apps/api/path";

export default class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {id: 1, text: '', category: ''}
    }
    this.filePath = 'data.json'
  }

  textChangeHandler(event) {
    this.setState({ formData: {id: 1, text: event.target.value, category: ''}})
  }

  async saveData() {
    let existingData = [];
    const appDataDir = await appLocalDataDir();
    await mkdir(appDataDir, { recursive: true });

  
    try {
      const content = await readFile('data.json', { baseDir: BaseDirectory.AppLocalData });
      const text = new TextDecoder().decode(content);
      existingData = JSON.parse(text);
    } catch {
      existingData = []; // file not found yet
    }
  
    console.log(existingData)
    existingData.push(this.state.formData);
  
    const file = await create('data.json', { baseDir: BaseDirectory.AppLocalData});
    await file.write(new TextEncoder().encode(JSON.stringify(existingData, null, 2)));
    await file.close();
  }
  
  render() {
    
    return (
      <form className="todo-form" data-testid="todo-form">
          <div className="todo">
            <input placeholder="Add todo..." autoFocus onChange={this.textChangeHandler.bind(this)}/>
            <CategoryBtn/>
            <button type="button" onClick={this.saveData.bind(this)}>Submit</button>
          </div>
        </form>
    )
  }
}