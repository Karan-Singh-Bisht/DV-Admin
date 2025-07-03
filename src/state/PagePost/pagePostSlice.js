import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export const getAllPagePosts = createAsyncThunk(
  "pagePost/getAllPagePosts",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/get-all-page-posts`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPagePost = createAsyncThunk(
  "/pagePost/getPagePost",
  async (id, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/get-page-post/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "pagePost/deletePost",
  async (id, { rejectWithValue, getState }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/delete-page-post/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const pagePostSlice = createSlice({
  name: "pagePost",
  initialState: {
    pagePosts: [],
    pagePost: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPagePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPagePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.pagePosts = action.payload;
        state.error = null;
      })
      .addCase(getAllPagePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPagePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPagePost.fulfilled, (state, action) => {
        state.loading = false;
        state.pagePost = action.payload;
        state.error = null;
      })
      .addCase(getPagePost.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.pagePosts = action.payload;
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pagePostSlice.reducer;
