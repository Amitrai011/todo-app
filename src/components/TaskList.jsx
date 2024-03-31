"use client";
import styles from "@/styles/taskList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredTodos, filterTodo } from "@/slices/todoSlice";
import { ALL, DONE, TODO } from "@/utils/utilities";
import Task from "./Task";

const TaskList = ({ onEdit }) => {
  const todos = useSelector(selectFilteredTodos);
  const filter = useSelector((state) => state.todo.filter);
  const dispatch = useDispatch();

  const handleFilter = (filter) => {
    dispatch(filterTodo(filter));
  };

  return (
    <div className={styles.taskContainer}>
      <h1 style={{ marginLeft: "40px" }}>To do tasks</h1>
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
        {todos.map((todo) => (
          <Task key={todo.id} onEdit={onEdit} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
