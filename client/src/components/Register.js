import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/profileApi";
import { toast } from "react-toastify";

function Register({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      await registerUser(form);

      toast.success("Registration successful 🎉 Please login");

      /* ===============================
         CLEAR AUTH STATE
      ================================ */
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userRole");

      setUser(null);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);

      if (msg.toLowerCase().includes("already")) {
        toast.error("User already exists");
      } else {
        toast.error(msg);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button className="btn btn-success w-100">Register</button>

        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Link to="/login" className="fw-bold text-decoration-none">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
