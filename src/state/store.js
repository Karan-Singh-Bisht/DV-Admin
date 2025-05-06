import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/Auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
