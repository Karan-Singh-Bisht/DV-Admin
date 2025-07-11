import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export const fetchAllBusinessVerification = createAsyncThunk(
  "businessVerification/fetchAllBusinessVerification",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/get-all-business-verification-requests`,
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
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/business-verification-request/${id}`,
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
