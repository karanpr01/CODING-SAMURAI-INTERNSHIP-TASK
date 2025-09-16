import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">Blogify</Link>

        <div className="flex items-center space-x-4">
          <Link to="/blogs" className="text-sm">Explore</Link>
          {user ? (
            <>
              <Link to="/create" className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">Write</Link>
              <button onClick={logout} className="text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="text-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
