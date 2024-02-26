import React, { useState } from "react";
import Manageblogs from "./Manageblogs";
import { Account } from "./Account";
import UserSettings from "./UserSettings";
import Profile from "./Profile";
export default function ProfileSection() {
  const [state, setstate] = useState("setting");
  return (
    <div className="flex h-screen bg-gray-200   ">
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-4">User Settings</h1>
        <div
          className={`cursor-pointer py-2 ${
            state === "profile" && "bg-gray-600"
          }`}
          onClick={() => setstate("profile")}
        >
          Profile
        </div>
        <div
          className={`cursor-pointer py-2 ${
            state === "setting" && "bg-gray-600"
          }`}
          onClick={() => setstate("setting")}
        >
          Setting
        </div>
        <div
          className={`cursor-pointer py-2 ${
            state === "manageblogs" && "bg-gray-600"
          }`}
          onClick={() => setstate("manageblogs")}
        >
          Manage Blogs
        </div>
        <div
          className={`cursor-pointer py-2 ${
            state === "account" && "bg-gray-600"
          }`}
          onClick={() => setstate("account")}
        >
          Account
        </div>
        <div className="cursor-pointer py-2">Logout</div>
      </div>

      <div className="w-3/4 p-6">
        {state === "profile" && <Profile />}
        {state === "setting" && <UserSettings />}
        {state === "account" && <Account />}
        {state === "manageblogs" && <Manageblogs />}
      </div>
    </div>
  );
}
