import React, { Component } from "react";
import api from "./utils/api";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    todos: [],
    email: ""
  };
  componentDidMount() {
    console.log("firstin events");
    // this.saveTodo();
  }
  saveTodo = e => {
    const { todos } = this.state;
    const todoValue = "this.inputElement.value";

    if (!todoValue) {
      alert("Please add Todo title");
      this.inputElement.focus();
      return false;
    }

    // reset input to empty
    //this.inputElement.value = "";

    const todoInfo = {
      title: todoValue,
      completed: false
    };
    // Optimistically add todo to UI
    const newTodoArray = [
      {
        data: todoInfo,
        ts: new Date().getTime() * 10000
      }
    ];

    const optimisticTodoState = newTodoArray.concat(todos);

    this.setState({
      todos: optimisticTodoState
    });
    // Make API request to create new todo
    api
      .create({ email: e })
      .then(response => {
        console.log(response);
        // remove temporaryValue from state and persist API response
        const persistedState = removeOptimisticTodo(todos).concat(response);
        // Set persisted value to state
        this.setState({
          todos: persistedState
        });
      })
      .catch(e => {
        console.log("An API error occurred", e);
        const revertedState = removeOptimisticTodo(todos);
        // Reset to original state
        this.setState({
          todos: revertedState
        });
      });
  };

  onChange = event => {
    this.setState({ email: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.saveTodo(this.state.email);
    this.setState({ email: "" });
  };
  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.email}
          />
          <button type="submit" value="submit">
            submit
          </button>
        </form>
      </div>
    );
  }
}

function removeOptimisticTodo(todos) {
  // return all 'real' todos
  return todos.filter(todo => {
    return todo.ref;
  });
}

export default App;
