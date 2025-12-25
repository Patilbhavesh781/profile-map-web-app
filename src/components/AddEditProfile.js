import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddEditProfile({ profiles, setProfiles }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const profileToEdit = isEdit
    ? profiles.find(p => p.id === parseInt(id))
    : {};

  const [form, setForm] = useState({
    name: profileToEdit?.name || "",
    age: profileToEdit?.age || "",
    job: profileToEdit?.job || "",
    salary: profileToEdit?.salary || "",
    hobbies: profileToEdit?.hobbies || "",
    location: profileToEdit?.location || "",
    photo: profileToEdit?.photo || "",
    description: profileToEdit?.description || "",
    lat: profileToEdit?.lat || "",
    lng: profileToEdit?.lng || ""
  });

  const handleSubmit = e => {
    e.preventDefault();

    const updatedForm = {
      ...form,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng)
    };

    if (isEdit) {
      setProfiles(
        profiles.map(profile =>
          profile.id === parseInt(id)
            ? { ...profile, ...updatedForm }
            : profile
        )
      );
    } else {
      setProfiles([
        ...profiles,
        { id: profiles.length + 1, ...updatedForm }
      ]);
    }

    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-success">
        {isEdit ? "Edit Profile" : "Add Profile"}
      </h2>

      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Age"
          value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Job"
          value={form.job}
          onChange={e => setForm({ ...form, job: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Salary"
          value={form.salary}
          onChange={e => setForm({ ...form, salary: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Hobbies"
          value={form.hobbies}
          onChange={e => setForm({ ...form, hobbies: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Photo URL"
          value={form.photo}
          onChange={e => setForm({ ...form, photo: e.target.value })}
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />

        {/* NEW: Latitude */}
        <input
          type="number"
          step="any"
          className="form-control mb-2"
          placeholder="Latitude (e.g. 18.5204)"
          value={form.lat}
          onChange={e => setForm({ ...form, lat: e.target.value })}
          
        />

        {/* NEW: Longitude */}
        <input
          type="number"
          step="any"
          className="form-control mb-3"
          placeholder="Longitude (e.g. 73.8567)"
          value={form.lng}
          onChange={e => setForm({ ...form, lng: e.target.value })}
          
        />

        <button type="submit" className="btn btn-success w-100">
          {isEdit ? "Save Changes" : "Add Profile"}
        </button>
      </form>
    </div>
  );
}

export default AddEditProfile;
