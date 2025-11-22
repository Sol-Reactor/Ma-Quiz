import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

function LogIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/quiz");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        if (!formData.username) {
          setError("Username is required");
          setLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        result = await register(
          formData.username,
          formData.email,
          formData.password
        );
      }

      if (result.success) {
        toast.success(isLogin ? "Login successful!" : "Account created!", {
          duration: 2000,
        });
      } else {
        setError(result.error || "An error occurred");
        toast.error(result.error || "An error occurred", {
          className: "custom-toast error",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <Link
        to="/"
        className="absolute top-6 left-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </Link>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-600">
            {isLogin ? "Sign in to continue" : "Sign up to get started"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder=" "
                required={!isLogin}
                className="peer w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent z-0"
              />
              <label
                htmlFor="username"
                className="absolute left-9 -top-2 bg-white px-1 text-xs text-indigo-600 transition-all
                          peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-focus:-top-2 peer-focus:left-9 peer-focus:text-indigo-600 peer-focus:text-xs"
              >
                Username
              </label>
              <FaUser className="absolute left-3 top-3 text-gray-400 z-10" />
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent z-0"
            />
            <label
              htmlFor="email"
              className="absolute left-9 -top-2 bg-white px-1 text-xs text-indigo-600 transition-all
                        peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:-top-2 peer-focus:left-9 peer-focus:text-indigo-600 peer-focus:text-xs"
            >
              Email
            </label>
            <FaEnvelope className="absolute left-3 top-3 text-gray-400 z-10" />
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              required
              minLength={6}
              className="peer w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent z-0"
            />
            <label
              htmlFor="password"
              className="absolute left-9 -top-2 bg-white px-1 text-xs text-indigo-600 transition-all
                        peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:-top-2 peer-focus:left-9 peer-focus:text-indigo-600 peer-focus:text-xs"
            >
              Password
            </label>
            <FaLock className="absolute left-3 top-3 text-gray-400 z-10" />
          </div>

          {!isLogin && (
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder=" "
                required
                minLength={6}
                className="peer w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent z-0"
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-9 -top-2 bg-white px-1 text-xs text-indigo-600 transition-all
                          peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-focus:-top-2 peer-focus:left-9 peer-focus:text-indigo-600 peer-focus:text-xs"
              >
                Confirm Password
              </label>
              <FaLock className="absolute left-3 top-3 text-gray-400 z-10" />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              setIsLogin(true);
              setError("");
              setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg border-b-4 font-medium transition-colors duration-200 ${
              isLogin
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FaSignInAlt />
            Sign In
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError("");
              setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg border-b-4 font-medium transition-colors duration-200 ${
              !isLogin
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FaUserPlus />
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
