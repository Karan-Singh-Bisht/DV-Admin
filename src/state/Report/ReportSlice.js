import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export const getAllReports = createAsyncThunk(
  "report/getAllReports",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/get-all-reported-users`,
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

export const getReport = createAsyncThunk(
  "report/getReport",
  async (id, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/get-reported-user/${id}`,
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

export const resolveReport = createAsyncThunk(
  "report/resolveReport",
  async (
    { reportId, actionTaken, resolverComments },
    { rejectWithValue, getState }
  ) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/admin/resolve-reported-user/${reportId}`,
        {
          actionTaken,
          resolverComments,
        },
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

export const rejectReport = createAsyncThunk(
  "report/rejectReport",
  async (
    { reportId, actionTaken, resolverComments },
    { rejectWithValue, getState }
  ) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/admin/reject-reported-user/${reportId}`,
        {
          actionTaken,
          resolverComments,
        },
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

export const deleteReport = createAsyncThunk(
  "report/deleteReport",
  async (reportId, { rejectWithValue, getState }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/admin/delete-user-report/${reportId}`,
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

const reportSlice = createSlice({
  name: "report",
  initialState: {
    reports: [],
    report: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
        state.error = null;
      })
      .addCase(getAllReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
        state.error = null;
      })
      .addCase(getReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resolveReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resolveReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.report;
        state.error = null;
      })
      .addCase(resolveReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(rejectReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.newReport;
        state.error = null;
      })
      .addCase(rejectReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default reportSlice.reducer;
