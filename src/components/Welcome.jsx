import React from "react";

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-green-500">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Myloogs</h1>
        <p className="text-lg mb-8">
          Discover, Create, and Share Your Thoughts with the World!
        </p>
        <a
          href="#"
          className="bg-yellow-500 text-gray-800 py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
