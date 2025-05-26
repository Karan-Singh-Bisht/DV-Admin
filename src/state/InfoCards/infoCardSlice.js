import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllInfoCards = createAsyncThunk(
  "infoCards/getAllInfoCards",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.get(
        "http://localhost:8080/api/admin/get-all-infoCards",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const getInfoCard = createAsyncThunk(
  "infocards/getInfoCard",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await axios.get(
        `http://localhost:8080/api/admin/get-info-card/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const infoCardSlice = createSlice({
  name: "InfoCards",
  initialState: {
    infoCards: [],
    infoCard: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllInfoCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInfoCards.fulfilled, (state, action) => {
        state.loading = false;
        state.infoCards = action.payload;
        state.error = null;
      })
      .addCase(getAllInfoCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInfoCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInfoCard.fulfilled, (state, action) => {
        state.loading = false;
        state.infoCard = action.payload;
        state.error = null;
      })
      .addCase(getInfoCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default infoCardSlice.reducer;
