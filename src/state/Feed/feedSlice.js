import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFeeds = createAsyncThunk(
  "/feed/fetchFeeds",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.get(
        "http://localhost:8080/api/admin/feeds",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.get(
        `http://localhost:8080/api/admin/feed/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  async (feedData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.post(
        "http://localhost:8080/api/admin/feed",
        feedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      });
  },
});

export default feedSlice.reducer;
