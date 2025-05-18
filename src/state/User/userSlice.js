import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.get(
        "http://localhost:8080/api/admin/get-all-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return (
        rejectWithValue(err.response?.data?.message) || "Failed to fetch users"
      );
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.get(
        `http://localhost:8080/api/admin/get-user-details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return (
        rejectWithValue(err.response?.data?.message) || "Failed to fetch user"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.delete(
        `http://localhost:8080/api/admin/delete-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return (
        rejectWithValue(err.response?.data?.message) || "Failed to delete user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.users = state.users.filter(
          (user) => user._id !== action.meta.arg
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
