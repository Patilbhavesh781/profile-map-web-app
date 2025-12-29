import axios from "axios";

const API = axios.create({
  baseURL: "https://profile-map.onrender.com/api",
});

/* ===============================
   ATTACH TOKEN TO EVERY REQUEST
================================ */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ===============================
   AUTH
================================ */
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

/* 🔐 FORGOT PASSWORD FLOW */
export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });

export const resetPassword = (data) =>
  API.post("/auth/reset-password", data);

/* 🔐 EMAIL VERIFICATION */
export const verifyEmail = (data) =>
  API.post("/auth/verify-email", data);


/* ===============================
   PROFILES (PAGINATION + FILTERS)
================================ */
export const getProfiles = (params) =>
  API.get("/profiles", { params });

export const getProfileById = (id) => API.get(`/profiles/${id}`);
export const createProfile = (data) => API.post("/profiles", data);
export const updateProfile = (id, data) => API.put(`/profiles/${id}`, data);
export const deleteProfile = (id) => API.delete(`/profiles/${id}`);
