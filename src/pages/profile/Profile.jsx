import React, { useEffect, useState } from "react";
import conf from "../../conf/conf";
import { useDatabse } from "../../appwriteBackend/database/databse";
import { useBlog } from "../../global/blogcontext";
import { useStorage } from "../../appwriteBackend/storage/storage";
export default function Profile() {
  const { username } = useBlog();
  const { imagePreview } = useStorage();

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
    const image = await imagePreview(cred.image);
    const cred2 = await getTheProfileDocument(username, conf.linkedWithProfile);
    setprofiledata((prev) => ({
      ...prev,
      profilePic: image.href,
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
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-md shadow-md">
      <img
        src={profileData.profilePic}
        alt="Profile Pic"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold mb-2 text-white">
        {profileData.username}
      </h1>
      <p className="text-gray-400 mb-4">{profileData.tagline}</p>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-white">{profileData.followers}</p>
          <p className="text-gray-400 text-sm">Followers</p>
        </div>
        <div>
          <p className="font-semibold text-white">{profileData.following}</p>
          <p className="text-gray-400 text-sm">Following</p>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-2 text-white">Your Top Writes</h2>
      <ul className="list-disc pl-6">
        {profileData.topFiveBlogs.map((blog) => (
          <li key={blog.id} className="text-gray-400">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
