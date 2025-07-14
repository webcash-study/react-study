import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const initialState = {
  list: [],
  id: 0,
  filterType: "ALL",
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await api.get("/todos");
  return res.data;
});

export const createTodo = createAsyncThunk("todos/createTodo", async (text) => {
  const res = await api.post("/todos", {
    id: String(Date.now()),
    text,
    completed: false,
  });
  return res.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, text }) => {
    const res = await api.patch(`/todos/${id}`, { text });
    return res.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await api.delete(`/todos/${id}`);
  return id;
});

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, completed }) => {
    const res = await api.patch(`/todos/${id}`, {
      completed,
    });
    return res.data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleTodoAll: (state, action) => {
      state.list = state.list.map((item) => ({
        ...item,
        completed: action.payload,
      }));
    },
    deleteTodoCompleted: (state) => {
      state.list = state.list.filter((item) => !item.completed);
    },
    setFilter: (state, action) => {
      state.filterType = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.list = state.list.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.list = state.list.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      });
  },
});

export const { toggleTodoAll, deleteTodoCompleted, setFilter } =
  todoSlice.actions;

export default todoSlice.reducer;
