import React, { useState, useEffect, useRef } from "react";
import { FaDog } from "react-icons/fa";
import { useUser } from "./contexts/UserContext";
import Cart from "./Cart";
import "./Header.css";

function Header() {
  const { user, isAuthenticated, logout } = useUser();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const getDisplayName = () =>
    user?.name || user?.username || user?.email?.split("@")[0] || "User";

  return (
    <nav className="navbar-custom">
      <div className="navbar-brand">
        Purrrfect <FaDog className="dog-logo" />
      </div>

      <div className="navbar-right">
        {isAuthenticated ? (
          <div className="profile-wrapper" ref={dropdownRef}>
            <img
              src={user?.picture || "/default-avatar.png"}
              alt="avatar"
              className="profile-avatar"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <img
                    src={user?.picture || "/default-avatar.png"}
                    alt="avatar"
                  />
                  <div>
                    <strong>{getDisplayName()}</strong>
                    <small>{user?.email}</small>
                  </div>
                </div>

                <div className="dropdown-divider" />

                <button onClick={() => window.location.href = "/profile"}>
                  Profile
                </button>
                <button onClick={() => window.location.href = "/orders"}>
                  Orders
                </button>

                <div className="dropdown-divider" />

                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/auth" className="custom-signup-login-button">
            Sign Up / Login
          </a>
        )}

        <Cart />

        <div className="theme-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </nav>
  );
}

export default Header;
