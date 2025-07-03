import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllBusinessVerification = createAsyncThunk(
  "businessVerification/fetchAllBusinessVerification",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/get-all-business-verification-requests",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSpecificBusinessVerification = createAsyncThunk(
  "businessVerification/fetchSpecificBusinessVerification",
  async (id, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/business-verification-request/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const businessVerificationSlice = createSlice({
  name: "businessVerification",
  initialState: {
    businessVerifications: [],
    businessVerification: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBusinessVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBusinessVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.businessVerifications = action.payload;
        state.error = null;
      })
      .addCase(fetchAllBusinessVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSpecificBusinessVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecificBusinessVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.businessVerification = action.payload;
        state.error = null;
      })
      .addCase(fetchSpecificBusinessVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default businessVerificationSlice.reducer;
