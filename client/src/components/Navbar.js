import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* BRAND */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <img
            width={30}
            src="https://res.cloudinary.com/drf2rliqg/image/upload/v1766898854/ywfslv71c85hvbulumt0.png"
            alt="logo"
            className="me-2"
          />
          ProfileMap
        </Link>

        {/* RIGHT SIDE */}
        <div className="ms-auto d-flex align-items-center gap-2">
          {user ? (
            <>
              {/* ADMIN LINK */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="btn btn-sm btn-outline-dark me-2"
                >
                  🛠 Admin
                </Link>
              )}

              {/* USER NAME */}
              <span className="text-success fw-semibold me-2">
                👋 Hi, {user.name || "User"}
              </span>

              {/* LOGOUT */}
              <button
                className="btn btn-sm btn-danger"
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-primary me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-success">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
