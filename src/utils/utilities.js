export const ALL = "all";
export const DONE = "done";
export const TODO = "todo";

export const updateLocalStorage = (todos) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};
