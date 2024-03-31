import Image from "next/image";
import styles from "@/styles/task.module.css";
import { useDispatch } from "react-redux";
import { completeTodo, deleteTodo } from "@/slices/todoSlice";
import { useState } from "react";

const Task = ({ onEdit, todo }) => {
  const dispatch = useDispatch();
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className={styles.todo} onClick={() => setShowDesc(!showDesc)}>
      <div className={styles.inputContainer}>
        <label className={styles.container}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => dispatch(completeTodo(todo.id))}
          />
          <span className={styles.checkmark}></span>
        </label>
        <div>
          <p
            className={`${styles.title} ${
              todo.isCompleted && styles.isComplete
            }`}
          >
            {todo.title.length > 120
              ? todo.title.substring(0, 80) + "..."
              : todo.title}
          </p>
          {showDesc && todo.desc.length > 0 && (
            <p
              className={`${styles.desc} ${
                todo.isCompleted && styles.isComplete
              }`}
            >
              {todo.desc.length > 170
                ? todo.desc.substring(0, 170) + "..."
                : todo.desc}
            </p>
          )}
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          style={{ cursor: "pointer" }}
          src="/assets/edit-icon.png"
          alt="Edit Todo"
          width={20}
          height={20}
          onClick={(event) => {
            event.stopPropagation();
            onEdit(todo.id);
          }}
        />
        <Image
          style={{ cursor: "pointer" }}
          src="/assets/delete-icon.png"
          alt="Delete Todo"
          width={20}
          height={20}
          onClick={() => dispatch(deleteTodo(todo.id))}
        />
      </div>
    </div>
  );
};

export default Task;
