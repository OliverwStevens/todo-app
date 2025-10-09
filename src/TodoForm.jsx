import React, { Component } from "react";
import "./App.css";
import CategoryBtn from "./CategoryBtn";
import { v4 as uuidv4 } from "uuid";

export default class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { id: "", text: "", complete: false, category: "" }
    };
  }

  textChangeHandler = (event) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        text: event.target.value
      }
    }));
  };

  categoryChangeHandler = (category) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        category
      }
    }))
  }

  addTodo = async () => {
    const newTodo = {
      ...this.state.formData,
      id: uuidv4(),
      complete: false,
      category: this.props.category || this.state.formData.category
    }

    if (this.props.onAddTodo) {
      await this.props.onAddTodo(newTodo);
    }

    // Reset the form
    this.setState({
      formData: { id: "", text: "", complete: false, category: "" }
    })
  }

  render() {
    return (
      <form
        className="todo-form"
        data-testid="todo-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="todo">
          <input
            placeholder="Add todo..."
            autoFocus
            value={this.state.formData.text}
            onChange={this.textChangeHandler}
          />
          <CategoryBtn onSelect={this.categoryChangeHandler} />
          <button type="button" onClick={this.addTodo}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}
