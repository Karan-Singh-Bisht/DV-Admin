import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../config/api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token") || null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetAuth: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!Cookies.get("token");
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
