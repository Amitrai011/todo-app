"use client";
import React from "react";
import styles from "@/styles/addTask.module.css";
import { connect } from "react-redux";
import { addTodo, completeTodo, updateTodo } from "@/slices/todoSlice";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: {
        title: "",
        desc: "",
        isCompleted: false,
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      const oldTodo = this.props.todoState.find(
        (todo) => todo.id === this.props.id
      );
      if (oldTodo) {
        this.setState({ todo: oldTodo });
      }
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      todo: {
        ...prevState.todo,
        [name]: value,
      },
    }));
  };

  saveTodo = () => {
    const id = this.props.id;
    const { title } = this.state.todo;
    if (title.trim().length === 0) {
      alert("Oops! Please make sure to enter a title for your task.");
      return;
    }

    if (id) {
      this.props.updateTodo({
        id,
        todo: this.state.todo,
      });
      this.props.onAddNew();
    } else {
      this.props.addTodo({
        ...this.state.todo,
        id: Date.now(),
      });
    }
    this.setState({
      todo: {
        title: "",
        desc: "",
        isCompleted: false,
      },
    });
  };

  render() {
    const { title, desc } = this.state.todo;
    const buttonText = this.props.id ? "Update Todo" : "Add Task";
    return (
      <div className={styles.addTaskContainer}>
        <h1 style={{ marginLeft: "3rem", marginTop: "104px" }}>Add task</h1>
        <div className={styles.inputContainer}>
          <p className={styles.subtitle}>Task Title</p>
          <input
            className={`${styles.addTitle} ${styles.inputArea}`}
            type="text"
            name="title"
            value={title}
            placeholder="Enter task title"
            onChange={this.handleChange}
          />
          <p className={styles.subtitle}>Task Description</p>
          <textarea
            className={`${styles.addDescription} ${styles.inputArea}`}
            type="text"
            name="desc"
            value={desc}
            placeholder="Enter task description"
            onChange={this.handleChange}
          />
          <button onClick={this.saveTodo} className={styles.addTaskBtn}>
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todoState: state.todo.todos,
  };
}

export default connect(mapStateToProps, { addTodo, completeTodo, updateTodo })(
  AddTask
);
