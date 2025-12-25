import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProfileList from "./components/ProfileList";
import ProfileDetails from "./components/ProfileDetails";
import AddEditProfile from "./components/AddEditProfile";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(false); // Profiles are fetched inside ProfileList now
  }, []);

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;
  if (error) return <h3 className="text-center text-danger">{error}</h3>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileList />} />

        <Route path="/profile/:id" element={<ProfileDetails />} />

        <Route path="/add" element={<AddEditProfile />} />

        <Route path="/edit/:id" element={<AddEditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
