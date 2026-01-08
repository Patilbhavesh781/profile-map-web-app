import axios from "axios";

const API = axios.create({
  baseURL: "https://profile-map-web-app.vercel.app/api/admin",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getAdminStats = () => API.get("/stats");
export const getAllUsers = () => API.get("/users");
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const getAllProfiles = () => API.get("/profiles");
export const deleteAnyProfile = (id) => API.delete(`/profiles/${id}`);
