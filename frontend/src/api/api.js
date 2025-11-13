import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
    }
    // Use the error response from the backend if available
    return Promise.reject(error.response?.data || error);
  }
);

export const authAPI = {
  register: (username, email, password) =>
    api.post("/auth/register", { username, email, password }).then((res) => res.data),

  login: (email, password) =>
    api.post("/auth/login", { email, password }).then((res) => res.data),

  getProfile: () => api.get("/auth/profile").then((res) => res.data),

  updateProfile: (userData) =>
    api.patch("/auth/profile", userData).then((res) => res.data),
};

export default api;
