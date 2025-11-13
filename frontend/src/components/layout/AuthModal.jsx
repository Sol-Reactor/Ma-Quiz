import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Added confirmPassword
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        // Show success toast and navigate after a delay
        toast
          .promise(
            new Promise((resolve) => setTimeout(resolve, 1500)), // Wait 1.5 seconds
            {
              loading: "Logging in...",
              success: isLogin ? "Login successful!" : "Account created!",
              error: "An error occurred.",
            }
          )
          .then(() => {
            onAuthSuccess();
            onClose();
            navigate("/quiz");
          });
      } else {
        setError(result.error || "An error occurred");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const title = isLogin ? "Welcome Back to Aura" : "Join CodeQuest Today!";
  const switchText = isLogin
    ? "Need an account? Sign Up"
    : "Already a member? Log In";

  return (
    <div
      className="fixed inset-0 z-[60] bg-gray-900 bg-opacity-70 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md m-4 transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          >
            <XMarkIcon className="h-6 w-6 dark:text-gray-300 dark:hover:text-white" />
          </button>

          <h2 className="text-3xl font-extrabold text-indigo-600 text-center mb-6">
            {title}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg text-sm">
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
                  className="peer w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent z-0"
                />
                <label
                  htmlFor="username"
                  className="absolute left-9 -top-2 bg-white dark:bg-gray-800 px-1 text-xs text-indigo-600 transition-all
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
                className="peer w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent z-0"
              />
              <label
                htmlFor="email"
                className="absolute left-9 -top-2 bg-white dark:bg-gray-800 px-1 text-xs text-indigo-600 transition-all
                          peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-focus:-top-2 peer-focus:left-9 peer-focus:text-indigo-600 peer-focus:text-xs"
              >
                Email Address
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
                className="peer w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent z-0"
              />
              <label
                htmlFor="password"
                className="absolute left-9 -top-2 bg-white dark:bg-gray-800 px-1 text-xs text-indigo-600 transition-all
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
                  className="peer w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent z-0"
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-9 -top-2 bg-white dark:bg-gray-800 px-1 text-xs text-indigo-600 transition-all
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
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
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
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
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
              }`}
            >
              <FaUserPlus />
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
