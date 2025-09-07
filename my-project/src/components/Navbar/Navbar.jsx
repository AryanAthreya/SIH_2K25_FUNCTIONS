import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("mockUser");

  function handleLogout() {
    localStorage.removeItem("mockUser");
    navigate("/login");
  }

  return (
    <nav className="bg-white/60 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div
              className="text-indigo-600 font-bold text-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate("/")}
            >
              KMRL
            </div>

            <div className="hidden md:flex items-center gap-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition transform hover:-translate-y-0.5 ${
                    isActive ? "text-indigo-700" : "text-gray-700 hover:text-indigo-600"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition transform hover:-translate-y-0.5 ${
                    isActive ? "text-indigo-700" : "text-gray-700 hover:text-indigo-600"
                  }`
                }
              >
                Upload
              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition transform hover:-translate-y-0.5 ${
                    isActive ? "text-indigo-700" : "text-gray-700 hover:text-indigo-600"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/compliance"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition transform hover:-translate-y-0.5 ${
                    isActive ? "text-indigo-700" : "text-gray-700 hover:text-indigo-600"
                  }`
                }
              >
                Compliance
              </NavLink>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden sm:inline text-sm text-gray-700">Signed in as <strong>{user}</strong></span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
