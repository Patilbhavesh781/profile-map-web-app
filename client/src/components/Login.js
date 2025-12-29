import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/profileApi";
import { toast } from "react-toastify";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      const { data } = await loginUser(form);

      /* ===============================
         SAVE AUTH DATA
      ================================ */
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userRole", data.user.role || "user");

      /* ===============================
         SET USER STATE
      ================================ */
      setUser({
        _id: data.user.id,
        name: data.user.name,
        role: data.user.role || "user",
      });

      toast.success("Login successful 🎉");

      /* ===============================
         REDIRECT
      ================================ */
      navigate(data.user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
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
          className="form-control mb-2"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {/* 🔐 FORGOT PASSWORD */}
        <div className="text-end mb-3">
          <Link
            to="/forgot-password"
            className="text-decoration-none small"
          >
            Forgot password?
          </Link>
        </div>

        <button className="btn btn-primary w-100">Login</button>

        <div className="text-center mt-3">
          <span>New user? </span>
          <Link to="/register" className="fw-bold text-decoration-none">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
