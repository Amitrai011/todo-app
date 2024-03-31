"use client";
import AddTask from "@/components/AddTask";
import Task from "@/components/TaskList";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [id, setId] = useState();

  const handleEdit = (id) => {
    setId(id);
  };

  const handleAddNew = () => {
    setId(null);
  };

  return (
    <div className={styles.home}>
      <AddTask id={id} onAddNew={handleAddNew} />
      <Task onEdit={handleEdit} />
    </div>
  );
}
