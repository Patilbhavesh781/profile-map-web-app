import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProfileList from "./components/ProfileList";
import ProfileDetails from "./components/ProfileDetails";
import AddEditProfile from "./components/AddEditProfile";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";

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
      // You could fetch user data from API here if needed
      setUser({ _id: localStorage.getItem("userId") });
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
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
  };

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            <ProfileList
              profiles={profiles}
              user={user}
              onDelete={handleDelete}
            />
          }
        />
        <Route
          path="/profile/:id"
          element={<ProfileDetails profiles={profiles} />}
        />
        <Route
          path="/add"
          element={user ? <AddEditProfile onSubmit={handleAdd} /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={user ? <AddEditProfile profiles={profiles} onSubmit={handleUpdate} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
