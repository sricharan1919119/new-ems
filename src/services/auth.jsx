import axios from "axios";

// Base axios config (Vite proxy -> /api)
const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===================== AUTH ===================== */

// Register
export const registerUser = (payload) => {
  return API.post("/auth/register", payload);
};

// Login
export const loginUser = (email, password) => {
  return API.post("/auth/signin", {
    email,
    password,
  });
};

// Verify OTP
export const verifyOtp = (email, otp) => {
  return API.post("/auth/verify-otp", {
    email,
    otp,
  });
};

// Logout
export const logoutUser = () => {
  return API.post("/auth/signout");
};

/* ===================== COMPANY ===================== */

// Create company
export const createCompany = (payload) => {
  return API.post("/company", payload);
};

// Get company
export const getCompany = () => {
  return API.get("/company");
};
