export const ALL = "all";
export const DONE = "done";
export const TODO = "todo";

export const updateLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
