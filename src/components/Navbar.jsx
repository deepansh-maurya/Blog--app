import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../appwriteBackend/authentication/auth";
import { useBlog } from "../global/blogcontext";
export default function Navbar() {
  const { search, setsearch } = useBlog();
  const { username, setusername } = useBlog();
  const navigate = useNavigate();
  const { logOut } = useAuth();
  async function Logout() {
    await logOut();
    setusername("");
  }
  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
      <div className="container mx-auto flex items-center justify-evenly ">
        {username !== "" && (
          <div className="flex items-center justify-between space-x-4">
            <div
              onClick={() => navigate("/myfeed")}
              className="text-white text-lg mx-5  font-bold cursor-pointer"
            >
              My Blog
            </div>
            <input
              type="text"
              placeholder="Search any keyword"
              className="px-3 mx-5  py-1 rounded-md border-none focus:outline-none focus:ring focus:border-blue-300"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
            <Link
              to="/search-results"
              className="text-white mx-5  hover:text-gray-300"
            >
              S
            </Link>
            <Link to="/myfeed" className="text-white mx-5  hover:text-gray-300">
              My Feed
            </Link>
            <Link to="/write" className="text-white mx-5  hover:text-gray-300">
              Write
            </Link>
            <Link
              to="/profile"
              className="text-white mx-5  hover:text-gray-300"
            >
              Profile
            </Link>
            <Link
              onClick={() => Logout()}
              to=""
              className="text-white mx-5 hover:text-gray-300"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
