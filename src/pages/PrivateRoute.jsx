import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("token"); // Use the same cookie name as in your backend

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
