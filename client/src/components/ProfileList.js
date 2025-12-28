import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import { toast } from "react-toastify";
import { getProfiles } from "../api/profileApi";

function ProfileList({ user, onDelete }) {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 🔍 FILTER STATE */
  const [filters, setFilters] = useState({
    minAge: "",
    maxAge: "",
    minSalary: "",
    maxSalary: "",
    job: "",
    location: "",
    sort: "latest",
  });

  const [showFilters, setShowFilters] = useState(false);

  /* ===============================
     FETCH PROFILES
  ================================ */
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data } = await getProfiles({
        page,
        limit: 6,
        search,
        ...filters,
      });

      setProfiles(data?.profiles || []);
      setPagination(data?.pagination || null);
    } catch (error) {
      toast.error("Failed to load profiles ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [page, search, filters]);

  /* ===============================
     DELETE HANDLER
  ================================ */
  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      toast.success("Profile deleted 🗑️");
      fetchProfiles();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  /* ===============================
     RESET FILTERS
  ================================ */
  const resetFilters = () => {
    setFilters({
      minAge: "",
      maxAge: "",
      minSalary: "",
      maxSalary: "",
      job: "",
      location: "",
      sort: "latest",
    });
    setPage(1);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">Profile Viewer</h1>

      {/* 🔍 SEARCH + FILTER */}
      <div className="mb-3 d-flex justify-content-center align-items-center gap-2">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by name or job..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <button
          className="btn btn-outline-primary"
          onClick={() => {
            setSearch("");
            setPage(1);
          }}
        >
          Clear
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => setShowFilters(!showFilters)}
        >
          ⚙️
        </button>
      </div>

      {/* 🎛 FILTER PANEL */}
      {showFilters && (
        <div className="card p-3 mb-3">
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="number"
                placeholder="Min Age"
                className="form-control"
                value={filters.minAge}
                onChange={(e) =>
                  setFilters({ ...filters, minAge: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                placeholder="Max Age"
                className="form-control"
                value={filters.maxAge}
                onChange={(e) =>
                  setFilters({ ...filters, maxAge: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <input
                type="number"
                placeholder="Min Salary"
                className="form-control"
                value={filters.minSalary}
                onChange={(e) =>
                  setFilters({ ...filters, minSalary: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                placeholder="Max Salary"
                className="form-control"
                value={filters.maxSalary}
                onChange={(e) =>
                  setFilters({ ...filters, maxSalary: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <input
                type="text"
                placeholder="Job"
                className="form-control"
                value={filters.job}
                onChange={(e) =>
                  setFilters({ ...filters, job: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <input
                type="text"
                placeholder="Location"
                className="form-control"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={filters.sort}
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value })
                }
              >
                <option value="latest">Latest</option>
                <option value="ageAsc">Age ↑</option>
                <option value="ageDesc">Age ↓</option>
                <option value="salaryAsc">Salary ↑</option>
                <option value="salaryDesc">Salary ↓</option>
              </select>
            </div>
          </div>

          <div className="mt-3 d-flex justify-content-end gap-2">
            <button className="btn btn-secondary" onClick={resetFilters}>
              Reset
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setPage(1);
                setShowFilters(false);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {user && (
        <Link to="/add" className="btn btn-success mb-3">
          Add Profile
        </Link>
      )}

      {loading && <p className="text-center">Loading...</p>}

      <div className="row">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile._id}
            profile={profile}
            onDelete={handleDelete}
            currentUser={user}
          />
        ))}
      </div>

      {!loading && profiles.length === 0 && (
        <p className="text-center text-danger">No profiles found</p>
      )}

      {pagination && (
        <div className="d-flex justify-content-center mt-4 gap-2">
          <button
            className="btn btn-outline-secondary"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span className="align-self-center">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            className="btn btn-outline-secondary"
            disabled={page === pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileList;
