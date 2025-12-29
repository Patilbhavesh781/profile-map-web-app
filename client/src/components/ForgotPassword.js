import React, { useState } from "react";
import { forgotPassword } from "../api/profileApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const { data } = await forgotPassword(email);
      toast.success(data.message || "Reset code sent to email 📧");

      // Go to reset password page
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🔐 Forgot Password</h2>

      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Code"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
