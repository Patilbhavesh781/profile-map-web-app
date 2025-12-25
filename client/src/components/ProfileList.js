import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";

function ProfileList({ profiles, setProfiles }) {
  const [search, setSearch] = useState("");

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = id => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">Profile Viewer</h1>

      <div className="mb-3 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Search profiles..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-primary" onClick={() => setSearch("")}>
          Clear
        </button>
      </div>

      <Link to="/add" className="btn btn-success mb-3">
        Add Profile
      </Link>

      <div className="row">
        {filteredProfiles.map(profile => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <p className="text-center text-danger">No profiles found</p>
      )}
    </div>
  );
}

export default ProfileList;
