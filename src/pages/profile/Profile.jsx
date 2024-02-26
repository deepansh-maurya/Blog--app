import React from "react";

export default function Profile() {
  const profileData = {
    profilePic: "https://example.com/profile-pic.jpg",
    username: "john_doe",
    tagline: "Web Developer | Blogger",
    followers: 1000,
    following: 500,
    topFiveBlogs: [
      { id: 1, title: "Blog 1" },
      { id: 2, title: "Blog 2" },
      { id: 3, title: "Blog 3" },
      { id: 4, title: "Blog 4" },
      { id: 5, title: "Blog 5" },
    ],
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      {/* Profile Pic */}
      <img
        src={profileData.profilePic}
        alt="Profile Pic"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />

      {/* Username */}
      <h1 className="text-2xl font-bold mb-2">{profileData.username}</h1>

      {/* Tagline */}
      <p className="text-gray-600 mb-4">{profileData.tagline}</p>

      {/* Followers and Following */}
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

      {/* Top Five Blogs */}
      <h2 className="text-lg font-semibold mb-2">Top Five Blogs</h2>
      <ul className="list-disc pl-6">
        {profileData.topFiveBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}
