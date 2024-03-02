import React, { useEffect, useState } from "react";
import conf from "../../conf/conf";
import { useDatabse } from "../../appwriteBackend/database/databse";
import { useBlog } from "../../global/blogcontext";
export default function Profile() {
  const { username } = useBlog();
  const { getTheProfileDocument } = useDatabse();
  const [profileData, setprofiledata] = useState({
    profilePic: "",
    username: "",
    tagline: "",
    followers: null,
    following: null,
    topFiveBlogs: [
      { id: 1, title: "Blog 1" },
      { id: 2, title: "Blog 2" },
      { id: 3, title: "Blog 3" },
      { id: 4, title: "Blog 4" },
      { id: 5, title: "Blog 5" },
    ],
  });
  async function getTheCred() {
    console.log(username, "usernamw");
    const cred = await getTheProfileDocument(username, conf.profile_id);
    const cred2 = await getTheProfileDocument(username, conf.linkedWithProfile);
    setprofiledata((prev) => ({
      ...prev,
      profilePic: cred.image,
      username: cred.username,
      tagline: cred.tagline,
      followers: cred2.followers,
      following: cred2.following,
    }));

    console.log(cred, cred2);
  }

  useEffect(() => {
    getTheCred();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <img
        src={profileData.profilePic}
        alt="Profile Pic"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{profileData.username}</h1>
      <p className="text-gray-600 mb-4">{profileData.tagline}</p>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold">{profileData.followers}</p>
          <p className="text-gray-600 text-sm">Followers</p>
        </div>
        <div>
          <p className="font-semibold">{profileData.following}</p>
          <p className="text-gray-600 text-sm">Following</p>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-2">Your Top Writes</h2>
      <ul className="list-disc pl-6">
        {profileData.topFiveBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}
