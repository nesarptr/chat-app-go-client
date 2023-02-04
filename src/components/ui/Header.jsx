import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { AuthContext } from "../../context/AuthProvider";

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      <header className="flex items-center justify-between bg-gray-900 py-3 px-6 text-white">
        {isAuthenticated ? (
          <Link to="/" className="text-lg font-medium">
            Home
          </Link>
        ) : (
          <nav className="flex">
            <Link to="/login" className="mx-3 text-lg font-medium">
              Login
            </Link>
            <Link to="/register" className="mx-3 text-lg font-medium">
              Register
            </Link>
          </nav>
        )}
        {isAuthenticated && (
          <button onClick={handleLogout} className="text-lg font-medium">
            Logout
          </button>
        )}
      </header>
      <Outlet />
    </>
  );
}

export default Header;
