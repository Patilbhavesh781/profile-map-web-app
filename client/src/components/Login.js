import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/profileApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);

      setUser({ _id: data.user.id, name: data.user.name });

      toast.success("Login successful 🎉");
      navigate("/");
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
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn btn-primary w-100">Login</button>
        <div className="text-center mt-3">
          <span>New user? </span>
          <Link to="/register" className="text-decoration-none fw-bold">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
