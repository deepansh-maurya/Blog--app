import React from "react";
import { useAuth } from "../../appwriteBackend/authentication/auth";
import { useState } from "react";
import { useBlog } from "../../global/blogcontext";
export function Account() {
  const [confirmation, setconfirmation] = useState("");
  const { username } = useBlog();
  const [flag, setflag] = useState(false);
  async function handleDeleteAccount() {
    if (username === confirmation) {
      setflag(true);
      setconfirmation("Your Account will be deleted in 24 Hour");
    } else {
      alert("wrong credentials");
    }
  }
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-500">
        Request Delete
      </h2>
      <p className="mb-4 text-center">
        To delete your account, please type{" "}
        <strong className="text-red-500">Username</strong> below:
      </p>
      {flag ? (
        <input
          type="text"
          value={confirmation}
          readOnly
          placeholder="Type username to Authenticate"
          className="w-full border rounded py-2 px-3 mb-4 bg-gray-700 text-white focus:outline-none focus:border-blue-500"
        />
      ) : (
        <input
          type="text"
          value={confirmation}
          onChange={(e) => setconfirmation(e.target.value)}
          placeholder="Type username to Authenticate"
          className="w-full border rounded py-2 px-3 mb-4 bg-gray-700 text-white focus:outline-none focus:border-blue-500"
        />
      )}
      <button
        onClick={handleDeleteAccount}
        className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
      >
        Request Delete
      </button>
    </div>
  );
}
