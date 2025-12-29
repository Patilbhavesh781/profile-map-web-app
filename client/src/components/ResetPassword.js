import React, { useState } from "react";
import { resetPassword } from "../api/profileApi";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    code: "",
    newPassword: "", // ✅ matches backend
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validate newPassword instead of password
    if (!form.email || !form.code || !form.newPassword) {
      toast.warning("All fields are required");
      return;
    }

    if (form.newPassword.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const { data } = await resetPassword(form);
      toast.success(data.message || "Password reset successful 🎉");

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🔁 Reset Password</h2>

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
          type="text"
          className="form-control mb-2"
          placeholder="Enter reset code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="New password"
          value={form.newPassword}
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
          required
        />

        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
