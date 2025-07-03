import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/Auth/authSlice";
import userReducer from "../state/User/userSlice";
import pageReducer from "../state/Page/pageSlice";
import feedReducer from "../state/Feed/feedSlice";
import pagePostReducer from "../state/PagePost/pagePostSlice";
import infoCardReducer from "./InfoCards/infoCardSlice";
import userVerificationReducer from "./UserVerification/userVerificationSlice";
import reportReducer from "./Report/ReportSlice";
import businessVerificationReducer from "./BusinessVerification/businessVerificationSlice";
import pageReportReducer from "./Report/PageReportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    page: pageReducer,
    feed: feedReducer,
    pagePost: pagePostReducer,
    infoCard: infoCardReducer,
    userVerification: userVerificationReducer,
    userReport: reportReducer,
    businessVerification: businessVerificationReducer,
    pageReport: pageReportReducer,
  },
});
