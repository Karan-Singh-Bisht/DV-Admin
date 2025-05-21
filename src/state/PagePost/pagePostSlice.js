import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPagePosts = createAsyncThunk(
  "pagePost/getAllPagePosts",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.get(
        `http://localhost:8080/api/admin/get-all-page-posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.get(
        `http://localhost:8080/api/admin/get-page-post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
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
      });
  },
});

export default pagePostSlice.reducer;
