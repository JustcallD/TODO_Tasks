import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from "./Slices/TaskSlice";

const Store = configureStore({
  reducer: {
    task: TaskSlice,
  },
});

export default Store;
