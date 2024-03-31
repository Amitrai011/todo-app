import { createSlice } from "@reduxjs/toolkit";
import { ALL, DONE, TODO, updateLocalStorage } from "@/utils/utilities";

const todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

const todoSlice = createSlice({
  name: "todo",
  initialState: { todos, filter: ALL },
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
      updateLocalStorage(state.todos);
    },
    updateTodo: (state, action) => {
      const { id, todo } = action.payload;
      const index = state.todos.findIndex((myTodo) => myTodo.id === id);
      if (index !== -1) {
        const newTodos = [...state.todos];
        newTodos[index] = todo;
        state.todos = newTodos;
        updateLocalStorage(newTodos);
      }
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      state.todos = updatedTodos;
      updateLocalStorage(updatedTodos);
    },
    completeTodo: (state, action) => {
      const id = action.payload;
      const index = state.todos.findIndex((myTodo) => myTodo.id === id);
      if (index !== -1) {
        const newTodos = [...state.todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        state.todos = newTodos;
        updateLocalStorage(newTodos);
      }
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
