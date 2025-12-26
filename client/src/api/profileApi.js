import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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

/* ===============================
   PROFILES
================================ */
export const getProfiles = () => API.get("/profiles");
export const getProfileById = (id) => API.get(`/profiles/${id}`);
export const createProfile = (data) => API.post("/profiles", data);
export const updateProfile = (id, data) => API.put(`/profiles/${id}`, data);
export const deleteProfile = (id) => API.delete(`/profiles/${id}`);
