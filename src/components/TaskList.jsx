"use client";
import styles from "@/styles/taskList.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredTodos,
  filterTodo,
  updateInitialState,
} from "@/slices/todoSlice";
import { ALL, DONE, TODO } from "@/utils/utilities";
import Task from "./Task";
import { useEffect } from "react";

const TaskList = ({ onEdit }) => {
  const todos = useSelector(selectFilteredTodos);
  const filter = useSelector((state) => state.todo.filter);
  const dispatch = useDispatch();

  const handleFilter = (filter) => {
    dispatch(filterTodo(filter));
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      dispatch(updateInitialState(todos));
    }
  }, []);

  return (
    <div className={styles.taskContainer}>
      <h1 className={styles.heading}>To do tasks</h1>
      <div className={styles.filterBtnContainer}>
        <button
          onClick={() => handleFilter(ALL)}
          className={`${styles.filterBtn} ${
            filter === ALL && styles.filterSelected
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilter(DONE)}
          className={`${styles.filterBtn} ${
            filter === DONE && styles.filterSelected
          }`}
        >
          Done
        </button>
        <button
          onClick={() => handleFilter(TODO)}
          className={`${styles.filterBtn} ${
            filter === TODO && styles.filterSelected
          }`}
        >
          To Do
        </button>
      </div>
      <div className={styles.todoContainer}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Task key={todo.id} onEdit={onEdit} todo={todo} />
          ))
        ) : (
          <h1 className={styles.placeholderTitle}>
            Click the {"'Add Task'"} button to add a task
          </h1>
        )}
      </div>
    </div>
  );
};

export default TaskList;
