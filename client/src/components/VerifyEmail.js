import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/profileApi";
import { toast } from "react-toastify";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email || !code) {
      toast.warning("Email & code required");
      return;
    }

    try {
      await verifyEmail({ email, code });
      toast.success("Email verified successfully ✅");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Verification failed";
      toast.error(msg);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Verify Email</h2>

      <form onSubmit={handleVerify} className="p-4 shadow rounded bg-light">
        <input
          type="email"
          className="form-control mb-2"
          value={email}
          disabled
        />

        <input
          className="form-control mb-3"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button className="btn btn-primary w-100">
          Verify Email
        </button>
      </form>
    </div>
  );
}

export default VerifyEmail;
