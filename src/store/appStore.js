import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "../slices/todoSlice";

const appStore = configureStore({
  reducer: {
    todo: todoSliceReducer,
  },
});

export default appStore;
