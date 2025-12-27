import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createProfile, getProfileById, updateProfile } from "../api/profileApi";
import { toast } from "react-toastify";

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
    if (!isEdit) return;

    const fetchProfile = async () => {
      try {
        const { data } = await getProfileById(id);

        const userId = localStorage.getItem("userId");
        if (data.user !== userId) {
          toast.error("You can only edit your own profiles");
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
      } catch {
        toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [id, isEdit, navigate]);

  /* ===============================
     SUBMIT HANDLER
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(form.age) || isNaN(form.lat) || isNaN(form.lng)) {
      toast.warning("Enter only numeric values for Age / Latitude / Longitude");
      return;
    }

    if (
      !isNaN(form.name) ||
      !isNaN(form.job) ||
      !isNaN(form.hobbies) ||
      !isNaN(form.location)
    ) {
      toast.warning("Enter only text data for Name, Job, Hobbies & Location");
      return;
    }

    const payload = {
      ...form,
      age: Number(form.age),
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
    };

    try {
      if (isEdit) {
        await updateProfile(id, payload);
        toast.success("Profile updated successfully ✅");
      } else {
        await createProfile(payload);
        toast.success("Profile added successfully 🎉");
      }

      navigate("/");
    } catch {
      toast.error(isEdit ? "Failed to update profile ❌" : "Failed to add profile ❌");
    }
  };

  return (
    <div className="container mt-4">
      <span className="mt-3">
        <Link to="/" className="btn btn-secondary">Back</Link>
      </span>

      <h2 className="text-center text-success">
        {isEdit ? "Edit Profile" : "Add Profile"}
      </h2>

      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <input className="form-control mb-2" placeholder="Name"
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />

        <input type="number" className="form-control mb-2" placeholder="Age"
          value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} required />

        <input className="form-control mb-2" placeholder="Job"
          value={form.job} onChange={e => setForm({ ...form, job: e.target.value })} required />

        <input type="number" className="form-control mb-2" placeholder="Salary"
          value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} required />

        <input className="form-control mb-2" placeholder="Hobbies"
          value={form.hobbies} onChange={e => setForm({ ...form, hobbies: e.target.value })} required />

        <input className="form-control mb-2" placeholder="Location"
          value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />

        <input className="form-control mb-2" placeholder="Photo URL"
          value={form.photo} onChange={e => setForm({ ...form, photo: e.target.value })} required />

        <textarea className="form-control mb-2" placeholder="Description"
          value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />

        <input type="number" step="any" className="form-control mb-2" placeholder="Latitude"
          value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} />

        <input type="number" step="any" className="form-control mb-3" placeholder="Longitude"
          value={form.lng} onChange={e => setForm({ ...form, lng: e.target.value })} />

        <button type="submit" className="btn btn-success w-100">
          {isEdit ? "Save Changes" : "Add Profile"}
        </button>
      </form>
    </div>
  );
}

export default AddEditProfile;
