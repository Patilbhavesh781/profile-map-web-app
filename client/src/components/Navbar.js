import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <img width={30} src={"https://res.cloudinary.com/drf2rliqg/image/upload/v1766898854/ywfslv71c85hvbulumt0.png"} alt="img"/> ProfileMap
        </Link>

        <div className="ms-auto">
          {user ? (
            <>
              <span className="me-3 text-success fw-semibold">
                👋 Hi, {user.name || "User"}
              </span>
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
