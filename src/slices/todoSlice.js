import { createSlice } from "@reduxjs/toolkit";
import { ALL, DONE, TODO } from "@/utils/utilities";

const todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

const todoSlice = createSlice({
  name: "todo",
  initialState: { todos, filter: ALL },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (state, action) => {
      const { id, todo } = action.payload;
      const index = state.todos.findIndex((myTodo) => myTodo.id === id);
      state.todos[index] = todo;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      const index = state.todos.findIndex((myTodo) => myTodo.id === id);
      state.todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    completeTodo: (state, action) => {
      const id = action.payload;
      const index = state.todos.findIndex((myTodo) => myTodo.id === id);
      state.todos[index].isCompleted = !state.todos[index].isCompleted;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    filterTodo: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, completeTodo, updateTodo, deleteTodo, filterTodo } =
  todoSlice.actions;

export const selectFilteredTodos = (state) => {
  const { todos, filter } = state.todo;
  switch (filter) {
    case DONE:
      return todos.filter((todo) => todo.isCompleted);
    case TODO:
      return todos.filter((todo) => !todo.isCompleted);
    case ALL:
    default:
      return todos;
  }
};

export default todoSlice.reducer;
