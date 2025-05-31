import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export const getAllPages = createAsyncThunk(
  "pages/getAllPages",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.get(`${API_BASE_URL}/admin/get-all-pages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return (
        rejectWithValue(err.response?.data?.message) || "Failed to fetch pages"
      );
    }
  }
);

export const getPage = createAsyncThunk(
  "pages/getPage",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.get(
        `${API_BASE_URL}/admin/get-page-details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return (
        rejectWithValue(err.response?.data?.message) || "Failed to fetch page"
      );
    }
  }
);

export const deletePage = createAsyncThunk(
  "pages/deletePage",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.delete(
        `${API_BASE_URL}/admin/delete-page/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return (
        rejectWithValue(err.response?.data?.message) || "Failed to delete page"
      );
    }
  }
);

const pageSlice = createSlice({
  name: "page",
  initialState: {
    page: null,
    pages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPages.fulfilled, (state, action) => {
        state.error = null;
        state.pages = action.payload;
        state.loading = false;
      })
      .addCase(getAllPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPage.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload;
        state.error = null;
      })
      .addCase(getPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = state.pages.filter(
          (page) => page._id !== action.meta.arg
        );
        state.error = null;
      })
      .addCase(deletePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pageSlice.reducer;
