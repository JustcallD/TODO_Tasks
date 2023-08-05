import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTask = createAsyncThunk("create task", async (data) => {
  const { title, description } = data;
  const response = await axios.post("http://localhost:4000/api/tasks", {
    title,
    description,
  });

  try {
    const result = await response;
    console.log(result.data);
    return result.data;
  } catch (error) {
    throw error;
  }
});

export const taskList = createAsyncThunk("task list", async () => {
  const response = await axios.get("http://localhost:4000/api/tasks");
  try {
    const result = await response;
    console.log(result.data);
    return result.data;
  } catch (error) {
    throw error;
  }
});

export const deleteTask = createAsyncThunk("delete", async (_id) => {
  const response = await axios.delete(`http://localhost:4000/api/tasks/${_id}`);
  try {
    const result = await response;
    console.log(result.data);
    return result.data;
  } catch (error) {
    throw error;
  }
});
export const updateTask = createAsyncThunk("update task", async (data) => {
  const response = await axios.put(
    `http://localhost:4000/api/tasks/${data._id}`,
    data
  );

  try {
    const result = await response;
    console.log(result.data);
    return result.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  task: [],
  isLoading: false,
  error: false,
};

const taskDetails = createSlice({
  name: "task",
  initialState,
  extraReducers: {
    [createTask.pending]: (state) => {
      state.isLoading = true;
    },
    [createTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.task.push(action.payload);
    },
    [createTask.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [taskList.pending]: (state) => {
      state.isLoading = true;
    },
    [taskList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.task = action.payload;
    },
    [taskList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [deleteTask.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { id } = action.payload;
      if (id) {
        state.task = state.task.filter((data) => data.id !== id);
      }
    },
    [deleteTask.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [updateTask.pending]: (state) => {
      state.isLoading = true;
    },

    [updateTask.fulfilled]: (state, action) => {
      state.isLoading = false;

      const updatedIndex = state.task.findIndex(
        (data) => data._id === action.payload._id
      );
      if (updatedIndex !== -1) {
        state.task[updatedIndex] = action.payload;
      }
    },

    [updateTask.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export default taskDetails.reducer;
