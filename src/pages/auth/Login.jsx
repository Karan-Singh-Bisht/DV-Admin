import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, clearError } from "../../state/Auth/authSlice"; // Add clearError action
import { toast } from "sonner";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { error, loading } = useSelector((state) => state.auth);

  // Clear error when component mounts or when user starts typing
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    // Clear error when user starts typing
    if (error) {
      dispatch(clearError());
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any existing errors before submitting
    dispatch(clearError());

    const request = await dispatch(loginUser(formData));

    if (request.meta?.requestStatus === "fulfilled") {
      navigate("/");
      toast(`Welcome Back!`, {
        style: { background: "green", color: "white" },
      });
    } else if (request.meta?.requestStatus === "rejected") {
      // Error will be handled by the error display below
      toast(request.payload?.message || "Login failed", {
        style: {
          background: "#dc2626",
          color: "white",
          fontSize: "1rem",
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F2B] px-4">
      <div className="bg-[#11183C] w-full max-w-md rounded-xl p-8 shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username/Email */}
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium block mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-[#1B2147] text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium block mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-[#1B2147] text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-gray-400 hover:text-white"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
