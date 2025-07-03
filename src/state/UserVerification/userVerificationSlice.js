import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export const getAllUserVerifications = createAsyncThunk(
  "userVerification/getAllUserVerifications",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/get-all-user-verification-requests`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return (
        rejectWithValue(err.response?.data?.message) ||
        "Failed to fetch user verifications"
      );
    }
  }
);

export const getSpecificUserVerification = createAsyncThunk(
  "userVerification/getSpecificUserVerification",
  async (id, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/user-verification-request/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return (
        rejectWithValue(err.response?.data?.message) ||
        "Failed to fetch user verification"
      );
    }
  }
);

export const approveUserVerificationRequest = createAsyncThunk(
  "userVerification/approveUserVerificationRequest",
  async ({ userId, userRequestId }, { rejectWithValue, getState }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/admin/approve-user-verification-request/${userRequestId}`,
        { userId },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return (
        rejectWithValue(err.response?.data?.message) ||
        "Failed to approve user verification request"
      );
    }
  }
);

export const rejectUserVerificationRequest = createAsyncThunk(
  "userVerification/rejectUserVerificationRequest",
  async ({ id, reason }, { rejectWithValue, getState }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/admin/reject-user-verification-request/${id}`,
        { reason },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return (
        rejectWithValue(err.response?.data?.message) ||
        "Failed to reject user verification request"
      );
    }
  }
);

const userVerificationSlice = createSlice({
  name: "userVerification",
  initialState: {
    userVerifications: [],
    userVerification: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserVerifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserVerifications.fulfilled, (state, action) => {
        state.loading = false;
        state.userVerifications = action.payload;
        state.error = null;
      })
      .addCase(getAllUserVerifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user verifications";
      })
      .addCase(getSpecificUserVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecificUserVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.userVerification = action.payload;
        state.error = null;
      })
      .addCase(getSpecificUserVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveUserVerificationRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveUserVerificationRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.userVerifications = state.userVerifications.filter(
          (req) => req._id !== action.payload._id
        );
        state.error = null;
      })
      .addCase(approveUserVerificationRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(rejectUserVerificationRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectUserVerificationRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.userVerifications = state.userVerifications.filter(
          (req) => req._id !== action.payload._id
        );
        state.error = null;
      })
      .addCase(rejectUserVerificationRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userVerificationSlice.reducer;
