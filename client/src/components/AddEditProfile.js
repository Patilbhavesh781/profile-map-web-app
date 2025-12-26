import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProfile, getProfileById, updateProfile } from "../api/profileApi";

function AddEditProfile({ profiles, onSubmit }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    age: "",
    job: "",
    salary: "",
    hobbies: "",
    location: "",
    photo: "",
    description: "",
    lat: "",
    lng: "",
  });

  /* ===============================
     FETCH PROFILE FOR EDIT
  ================================ */
  useEffect(() => {
    if (isEdit) {
      fetchProfile();
    }
  }, [isEdit, id]);

  const fetchProfile = async () => {
    try {
      const { data } = await getProfileById(id);

      // Only allow editing if the profile belongs to logged-in user
      const userId = localStorage.getItem("userId");
      if (data.user !== userId) {
        alert("You can only edit your own profiles.");
        navigate("/");
        return;
      }

      setForm({
        name: data.name || "",
        age: data.age || "",
        job: data.job || "",
        salary: data.salary || "",
        hobbies: data.hobbies || "",
        location: data.location || "",
        photo: data.photo || "",
        description: data.description || "",
        lat: data.lat || "",
        lng: data.lng || "",
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  /* ===============================
     SUBMIT HANDLER
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      age: Number(form.age),
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
    };

    try {
      if (isEdit) {
        await updateProfile(id, payload);
      } else {
        await createProfile(payload);
      }

      // Call parent's onSubmit if passed (optional)
      // if (onSubmit) onSubmit(payload);

      navigate("/");
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
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
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Job"
          value={form.job}
          onChange={(e) => setForm({ ...form, job: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Hobbies"
          value={form.hobbies}
          onChange={(e) => setForm({ ...form, hobbies: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Photo URL"
          value={form.photo}
          onChange={(e) => setForm({ ...form, photo: e.target.value })}
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="number"
          step="any"
          className="form-control mb-2"
          placeholder="Latitude (e.g. 18.5204)"
          value={form.lat}
          onChange={(e) => setForm({ ...form, lat: e.target.value })}
        />

        <input
          type="number"
          step="any"
          className="form-control mb-3"
          placeholder="Longitude (e.g. 73.8567)"
          value={form.lng}
          onChange={(e) => setForm({ ...form, lng: e.target.value })}
        />

        <button type="submit" className="btn btn-success w-100">
          {isEdit ? "Save Changes" : "Add Profile"}
        </button>
      </form>
    </div>
  );
}

export default AddEditProfile;
