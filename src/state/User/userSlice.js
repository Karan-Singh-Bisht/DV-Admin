import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/get-all-users`, {
        withCredentials: true,
      });
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
      const response = await axios.get(
        `${API_BASE_URL}/admin/get-user-details/${id}`,
        {
          withCredentials: true,
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
      const response = await axios.delete(
        `${API_BASE_URL}/admin/delete-user/${id}`,
        {
          withCredentials: true,
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

export const createUserAvatar = createAsyncThunk(
  "users/createUserAvatar",
  async (payload, { rejectWithValue, getState }) => {
    const { category, file } = payload;

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("category", category);

      const response = await axios.post(
        `${API_BASE_URL}/admin/avatar/upload-avataruser`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (err) {
      console.error("Error uploading avatar:", err);
      return rejectWithValue(err.response?.data || err.message);
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
