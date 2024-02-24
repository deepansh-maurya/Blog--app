import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../appwriteBackend/authentication/auth";
export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
  });
  const { signUpUser } = useAuth();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const val = await signUpUser(
      formData.email,
      formData.password,
      formData.fullname
    );
    console.log(val);
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
          Sign Up for Your Blog
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="fullname"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-gray-700">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
