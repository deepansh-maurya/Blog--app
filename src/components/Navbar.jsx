import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-pink-500 to-purple-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">My Blog</div>

        <div className="space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-1 rounded-md border-none focus:outline-none focus:ring focus:border-blue-300"
          />
          <Link to="myfeed" className="text-white hover:text-gray-300">
            My Feed
          </Link>
          <Link to="write" className="text-white hover:text-gray-300">
            Write
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-300">
            Profile
          </Link>
          <Link to="" className="text-white hover:text-gray-300">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
