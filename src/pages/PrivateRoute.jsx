import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token]);

  return token ? children : navigate("/login", { replace: true });
};

export default PrivateRoute;
