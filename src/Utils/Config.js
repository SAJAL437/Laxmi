import axios from "axios";
import { getToken } from "./Auth";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:2512"
    : "https://laxmi-server-production-7c6e.up.railway.app";
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// 🔐 Request interceptor - attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found for request");
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ❌ Response interceptor - handle 401/403 and auto logout
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.warn("Token invalid or expired. Logging out...");
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // optional
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
