import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/auth/check`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <Loader />; // or show <Spinner />

  return authenticated ? children : null;
};

export default PrivateRoute;
