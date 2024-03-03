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
    <nav className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        {username != "" ? (
          <div className="container mx-auto flex justify-between items-center">
            <div
              onClick={() => {
                navigate("/myfeed");
              }}
              className="text-white text-lg font-bold"
            >
              My Blog
            </div>

            <div className="space-x-4">
              <input
                type="text"
                placeholder=" search any keyword "
                className="px-3 py-1 rounded-md border-none focus:outline-none focus:ring focus:border-blue-300"
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
              />
              <Link to="/search-results">S</Link>
              <Link to="myfeed" className="text-white hover:text-gray-300">
                My Feed
              </Link>
              <Link to="write" className="text-white hover:text-gray-300">
                Write
              </Link>
              <Link to="/profile" className="text-white hover:text-gray-300">
                Profile
              </Link>
              <Link
                onClick={() => Logout()}
                to=""
                className="text-white hover:text-gray-300"
              >
                Logout
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
