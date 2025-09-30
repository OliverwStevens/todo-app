import React, { Component } from "react"
import "./App.css"
import CategoryBtn from "./CategoryBtn"
import FileService from "./utils/fileService"

export default class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: { id: 1, text: '', complete: false, category: '' }
    }
  }

  textChangeHandler(event) {
    this.setState({
      formData: { id: 1, text: event.target.value, category: '' }
    })
  }

  async saveData() {
    await FileService.saveData(this.state.formData)
  }
  
  render() {
    return (
      <form className="todo-form" data-testid="todo-form">
        <div className="todo">
          <input
            placeholder="Add todo..."
            autoFocus
            onChange={this.textChangeHandler.bind(this)}
          />
          <CategoryBtn />
          <button type="button" onClick={this.saveData.bind(this)}>Submit</button>
        </div>
      </form>
    )
  }
}
