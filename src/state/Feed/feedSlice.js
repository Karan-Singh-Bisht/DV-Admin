import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export const fetchFeeds = createAsyncThunk(
  "/feed/fetchFeeds",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/feeds`, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch feeds"
      );
    }
  }
);

export const fetchFeedDetails = createAsyncThunk(
  "/feed/fetchFeedDetails",
  async (id, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/feed/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch feed details"
      );
    }
  }
);

export const createFeed = createAsyncThunk(
  "/feed/createFeed",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/feed`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create feed"
      );
    }
  }
);

export const deleteFeed = createAsyncThunk(
  "/feed/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/admin/visiofeed/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete");
    }
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feeds: [],
    feed: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeedDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
        state.error = null;
      })
      .addCase(fetchFeedDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Optionally push new feed to state.feeds
        // state.feeds.push(action.payload);
      })
      .addCase(createFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFeed.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteFeed.rejected, (state, action) => {
        state.error = action.error?.message || "Failed to delete";
        state.loading = false;
      });
  },
});

export default feedSlice.reducer;
