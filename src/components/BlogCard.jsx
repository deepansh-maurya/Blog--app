import React, { useEffect, useState } from "react";
import { useDatabse } from "../appwriteBackend/database/databse";
import { useBlog } from "../global/blogcontext";
import conf from "../conf/conf";
import { useNavigate } from "react-router-dom";
import { useStorage } from "../appwriteBackend/storage/storage";
export default function BlogCard({ props }) {
  console.log(props);
  const { createPostImage, imagePreview } = useStorage();

  const { getReviews } = useDatabse();
  const navigate = useNavigate();
  const { username } = useBlog();
  const { getTheProfileDocument } = useDatabse();
  const [file, setfile] = useState();
  const [usercred, setusercred] = useState();
  const [comments, setcomments] = useState();
  const [likes, setlikes] = useState();
  async function getCommentsLikes() {
    const promise = await getReviews(props.slug);
    setcomments(promise.comments);
    setlikes(promise.likes);
  }
  useEffect(() => {
    getCommentsLikes();
  }, []);
  const [profile, setprofile] = useState();
  async function getProfileDetail() {
    const response = await getTheProfileDocument(username, conf.profile_id);
    const promise1 = await imagePreview(response.image);
    setprofile(promise1.href);
    console.log(response, "hghggtgccccccccccccc");
    const promise = await imagePreview(props.image);
    setfile(promise.href);
    setusercred(response);
  }
  const handleclick = () => {
    navigate("/blogpost", { state: { props } });
  };
  useEffect(() => {
    getProfileDetail();
  }, []);
  return (
    <div
      className="max-w-lg mx-auto bg-slate-400 text-white rounded-md overflow-hidden shadow-md my-4 cursor-pointer"
      onClick={handleclick}
    >
      {/* Blog Image */}
      {/* <img
    src="https://placekitten.com/600/400" // Replace with your actual image source
    alt="Blog Image"
    className="w-full h-40 object-cover"
  /> */}

      <div className="p-4">
        <div className="flex items-center mb-3">
          <img
            src={profile} // Replace with user's profile picture
            alt="User Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            <p className="text-sm font-semibold">{usercred?.username}</p>
            <p className="text-xs text-gray-600">{usercred?.fullname}</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-2">{props?.date}</p>

        <h2 className="text-lg font-bold mb-2">{props?.title}</h2>

        <p className="text-sm text-gray-300 mb-4">{props?.content}</p>

        <img
          src={file} // Replace with your actual image source
          alt="Related Image"
          className="w-full h-24 object-cover mb-3"
        />

        <div className="flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center">
            <span className="mr-2">Likes: {likes}</span>
            <span>Comments: {comments && comments.length + 1}</span>
          </div>
          <span>{props?.category}</span>
        </div>
      </div>

      <button
        onClick={() => {
          navigate("/editblog", { state: { props } });
        }}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Edit
      </button>
    </div>
  );
}
