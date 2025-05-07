import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/global/Navbar";
import Sidebar from "./pages/global/SidebarComponent";
import Dashboard from "./pages/dashboard/Dashboard";
import Ecommerce from "./pages/eCommerce/Ecommerce";
import Buddy from "./pages/buddies/Buddy";
import Pages from "./pages/pages/Pages";
import Verification from "./pages/verification/Verification";
import VerificationDetails from "./pages/verification/VerificationDetails";
import Report from "./pages/report/Report";
import BuddyPost from "./pages/buddyPost/BuddyPost";
import BuddyPostCardDetail from "./pages/buddyPost/BuddyPostCardDetail";
import PagePost from "./pages/pagePost/PagePost";
import Feed from "./pages/feed/Feed";
import FeedDetails from "./pages/feed/FeedDetails";
import FeedCreatePage from "./pages/feed/FeedCreatePage";
import Login from "./pages/auth/Login";
import BuddyDetails from "./pages/buddies/BuddyDetails";
import PagesDetails from "./pages/pages/PagesDetails";
import PagePostDetails from "./pages/pagePost/PagePostDetails";
import BusinessVerification from "./pages/businessVerification/BusinessVerification";
import BusinessVerificationDetails from "./pages/businessVerification/BusinessVerificationDetails";
import CreatorVerification from "./pages/creatorVerification/CreatorVerification";
import CreatorVerificationDetails from "./pages/creatorVerification/CreatorVerificationDetails";
import PrivateRoute from "./pages/PrivateRoute";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="overflow-y-auto thin-scrollbar bg-[#121128]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-gradient-to-tr from-[#3039AA] to-[#121128]">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              // <PrivateRoute>
              <Dashboard />
              // {/* </PrivateRoute> */}
            }
          />
          <Route
            path="/analytics"
            element={
              // <PrivateRoute>
              <Dashboard />
              // </PrivateRoute>
            }
          />
          <Route
            path="/eCommerce"
            element={
              // <PrivateRoute>
              <Ecommerce />
              // </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              // <PrivateRoute>
              <Buddy />
              // </PrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              // <PrivateRoute>
              <BuddyDetails />
              // </PrivateRoute>
            }
          />
          <Route
            path="/pages"
            element={
              // <PrivateRoute>
              <Pages />
              // </PrivateRoute>
            }
          />
          <Route
            path="/pages/:id"
            element={
              // <PrivateRoute>
              <PagesDetails />
              // </PrivateRoute>
            }
          />
          <Route
            path="/verification"
            element={
              // <PrivateRoute>
              <Verification />
              // </PrivateRoute>
            }
          />
          <Route
            path="/verification/:userId"
            element={
              // <PrivateRoute>
              <VerificationDetails />
              // </PrivateRoute>
            }
          />
          <Route
            path="/businessVerification"
            element={
              // <PrivateRoute>
              <BusinessVerification />
              // </PrivateRoute>
            }
          />
          <Route
            path="/businessVerificationDetails/:pageId"
            element={
              // <PrivateRoute>
              <BusinessVerificationDetails />
              // </PrivateRoute>
            }
          />
          <Route
            path="/creatorVerification"
            element={
              // <PrivateRoute>
              <CreatorVerification />
              // </PrivateRoute>
            }
          />
          <Route
            path="/creatorVerificationDetails/:pageId"
            element={
              // <PrivateRoute>
              <CreatorVerificationDetails />
              // </PrivateRoute>
            }
          />
          <Route
            path="/report"
            element={
              // <PrivateRoute>
              <Report />
              // </PrivateRoute>
            }
          />
          <Route
            path="/buddyPosts"
            element={
              // <PrivateRoute>
              <BuddyPost />
              // </PrivateRoute>
            }
          />
          <Route
            path="/buddyPost/:id"
            element={
              // <PrivateRoute>
              <BuddyPostCardDetail />
              // </PrivateRoute>
            }
          />
          <Route
            path="/pagePosts"
            element={
              // <PrivateRoute>
              <PagePost />
              // </PrivateRoute>
            }
          />
          <Route
            path="/pagePosts/:id"
            element={
              // <PrivateRoute>
              <PagePostDetails />
              // </PrivateRoute>
            }
          />
          <Route
            path="/feeds"
            element={
              // <PrivateRoute>
              <Feed />
              // </PrivateRoute>
            }
          />
          <Route
            path="/feeds/:id"
            element={
              // <PrivateRoute>
              <FeedDetails />
              // </PrivateRoute>
            }
          />
          <Route
            path="/feeds/create"
            element={
              // <PrivateRoute>
              <FeedCreatePage />
              // </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
