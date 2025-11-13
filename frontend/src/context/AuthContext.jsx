import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/api.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // Initialize token as null

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      // Only proceed if a token is actually stored
      if (storedToken) {
        try {
          const response = await authAPI.getProfile();
          // If profile fetch is successful, then set token and user
          setUser(response.user);
          setToken(storedToken);
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
          setUser(null); // Ensure user is null if auth fails
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);
  // isAuthenticated is derived from token, which is set only after successful profile fetch or login/register
  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem("token", response.token);
      setToken(response.token);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await authAPI.register(username, email, password);
      localStorage.setItem("token", response.token);
      setToken(response.token);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const updateUser = async (userData) => {
    try {
      // This assumes you have an `updateProfile` method in your authAPI service
      const response = await authAPI.updateProfile(userData);
      setUser(response.user); // Update user state with new data from backend
      return { success: true };
    } catch (error) {
      console.error("Update user failed:", error);
      return {
        success: false,
        error: error.message || "Could not update profile.",
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser, // Expose the new function
    isAuthenticated: !!token,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
