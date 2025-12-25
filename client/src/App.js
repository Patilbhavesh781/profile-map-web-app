import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProfileList from "./components/ProfileList";
import ProfileDetails from "./components/ProfileDetails";
import AddEditProfile from "./components/AddEditProfile";
import initialProfiles from "./data/profiles";

function App() {
  const [profiles, setProfiles] = useState(initialProfiles);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileList profiles={profiles} setProfiles={setProfiles} />} />
        <Route path="/profile/:id" element={<ProfileDetails profiles={profiles} />} />
        <Route path="/add" element={<AddEditProfile profiles={profiles} setProfiles={setProfiles} />} />
        <Route path="/edit/:id" element={<AddEditProfile profiles={profiles} setProfiles={setProfiles} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
