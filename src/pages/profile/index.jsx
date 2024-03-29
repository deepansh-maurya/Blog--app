import React, { useState } from "react";
import Manageblogs from "./Manageblogs";
import { Account } from "./Account";
import UserSettings from "./UserSettings";
import Profile from "./Profile";
import { useAuth } from "../../appwriteBackend/authentication/auth";
import Draft from "./Draft";
export default function ProfileSection() {
  const [state, setstate] = useState("profile");
  const { logOut } = useAuth();
  async function Logout() {
    console.log("Aa agaya ");
    const promise = await logOut();
    console.log(promise);
  }
  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <div className="w-1/4 bg-gray-900 p-6">
        <h1 className="text-2xl font-bold mb-4">User Settings</h1>
        <div
          className={`cursor-pointer py-2 ${
            state === "profile" && "bg-gray-700"
          }`}
          onClick={() => setstate("profile")}
        >
          Profile
        </div>
        <div
          className={`cursor-pointer py-2 ${
            state === "setting" && "bg-gray-700"
          }`}
          onClick={() => setstate("setting")}
        >
          Setting
        </div>
        <div
          className={`cursor-pointer py-2 ${
            state === "manageblogs" && "bg-gray-700"
          }`}
          onClick={() => setstate("manageblogs")}
        >
          Manage Blogs
        </div>
        <div
          className={`cursor-pointer py-2 ${
            state === "account" && "bg-gray-700"
          }`}
          onClick={() => setstate("account")}
        >
          Account
        </div>
        <div
          className={`cursor-pointer py-2 ${
            state === "draft" && "bg-gray-700"
          }`}
          onClick={() => setstate("draft")}
        >
          Draft
        </div>
        <div className="cursor-pointer py-2" onClick={() => Logout()}>
          Logout
        </div>
      </div>

      <div className="w-3/4 p-6 bg-gray-800">
        {state === "profile" && <Profile />}
        {state === "setting" && <UserSettings />}
        {state === "account" && <Account />}
        {state === "manageblogs" && <Manageblogs />}
        {state === "draft" && <Draft />}
      </div>
    </div>
  );
}
