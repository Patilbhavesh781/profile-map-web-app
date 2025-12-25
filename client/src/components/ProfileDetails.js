import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProfileById } from "../api/profileApi";

function ProfileDetails() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await getProfileById(id);
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) {
    return <h2 className="text-center text-danger">Profile not found</h2>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 p-4">
        <h2 className="text-center text-primary">{profile.name}</h2>

        <img
          src={profile.photo}
          alt={profile.name}
          className="img-fluid mx-auto d-block rounded-circle"
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />

        <div className="text-center mt-3">
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Job:</strong> {profile.job}</p>
          <p><strong>Salary:</strong> {profile.salary}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          <p><strong>Hobbies:</strong> {profile.hobbies}</p>
          <p><strong>Description:</strong> {profile.description}</p>
        </div>

        <h3 className="text-center mt-4">Location</h3>

        <iframe
          title="Profile Location Map"
          width="100%"
          height="400"
          src={`https://maps.google.com/maps?q=${profile.lat},${profile.lng}&hl=en&z=14&output=embed`}
          loading="lazy"
          allowFullScreen
        />

        <div className="text-center mt-3">
          <Link to="/" className="btn btn-secondary">
            Back to Profiles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
