import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export const getAllReportedPages = createAsyncThunk(
  "report/reportPages",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/get-all-report-page`,
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

export const getReportedPage = createAsyncThunk(
  "report/reportPage",
  async (pageId, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/get-reported-page/${pageId}`,
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

export const deleteReportedPage = createAsyncThunk(
  "report/deleteReportedPage",
  async (reportId, { rejectWithValue, getState }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/admin/delete-page-report/${reportId}`,
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

const pageReportSlice = createSlice({
  name: "pageReport",
  initialState: {
    pageReports: [],
    pageReport: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReportedPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReportedPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pageReports = action.payload;
        state.error = null;
      })
      .addCase(getAllReportedPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getReportedPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportedPage.fulfilled, (state, action) => {
        state.loading = false;
        state.pageReport = action.payload;
        state.error = null;
      })
      .addCase(getReportedPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteReportedPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReportedPage.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteReportedPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pageReportSlice.reducer;
