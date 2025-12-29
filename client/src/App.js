import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./components/AdminDashboard";
import ProfileList from "./components/ProfileList";
import ProfileDetails from "./components/ProfileDetails";
import AddEditProfile from "./components/AddEditProfile";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";

/* 🔐 NEW COMPONENTS */
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./components/VerifyEmail";


import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} from "./api/profileApi";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({
        _id: localStorage.getItem("userId"),
        name: localStorage.getItem("userName"),
        role: localStorage.getItem("userRole"),
      });
    }
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const res = await getProfiles();
      setProfiles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    await createProfile(data);
    fetchProfiles();
  };

  const handleUpdate = async (id, data) => {
    await updateProfile(id, data);
    fetchProfiles();
  };

  const handleDelete = async (id) => {
    await deleteProfile(id);
    fetchProfiles();
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<ProfileList user={user} onDelete={handleDelete} />} />
        <Route path="/profile/:id" element={<ProfileDetails profiles={profiles} />} />

        {/* AUTH */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        {/* verify email */}
        <Route path="/verify-email" element={<VerifyEmail />} />


        {/* 🔐 FORGOT PASSWORD */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* USER */}
        <Route
          path="/add"
          element={user ? <AddEditProfile onSubmit={handleAdd} /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={user ? <AddEditProfile profiles={profiles} onSubmit={handleUpdate} /> : <Navigate to="/login" />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
