import React from "react";
import { Link } from "react-router-dom";

function ProfileCard({ profile, onDelete }) {
  return (
    <div className="col-md-4">
      <div className="card shadow-lg border-0 mb-4">
        <img
          src={profile.photo}
          className="card-img-top rounded-top"
          alt={profile.name}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="fw-bold">{profile.name}</h5>
          <h5 className="fw-bold">{profile.location}</h5>
          <p className="text-muted">{profile.job}</p>

          <Link to={`/profile/${profile.id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
          <Link to={`/edit/${profile.id}`} className="btn btn-warning btn-sm ms-2">
            Edit
          </Link>
          <button
            className="btn btn-danger btn-sm ms-2"
            onClick={() => onDelete(profile.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
