import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import { getProfiles, deleteProfile } from "../api/profileApi";

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all profiles from API
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data } = await getProfiles();
      setProfiles(data);
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteProfile(id);
      fetchProfiles();
    } catch (error) {
      console.error("Failed to delete profile:", error);
    }
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(search.toLowerCase())
  );

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
        <button
          className="btn btn-outline-primary"
          onClick={() => setSearch("")}
        >
          Clear
        </button>
      </div>

      <Link to="/add" className="btn btn-success mb-3">
        Add Profile
      </Link>

      <div className="row">
        {filteredProfiles.map(profile => (
          <ProfileCard
            key={profile._id}
            profile={profile}
            onDelete={handleDelete} // Pass the local handler
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
