import React, { useEffect, useState } from "react";
import { useDatabse } from "../appwriteBackend/database/databse";
import { useBlog } from "../global/blogcontext";
import conf from "../conf/conf";
import BlogPost from "./BlogPost";
import { useNavigate } from "react-router-dom";
export default function BlogCard({ props }) {
  const { getReviews } = useDatabse();
  const navigate = useNavigate();
  const { username } = useBlog();
  const { getTheProfileDocument } = useDatabse();
  const [usercred, setusercred] = useState();
  const [comments, setcomments] = useState();
  const [likes, setlikes] = useState();
  async function getCommentsLikes() {
    const promise = await getReviews(props.slug);
    console.log(promise);
    setcomments(promise.comments);
    setlikes(promise.likes);
  }
  useEffect(() => {
    getCommentsLikes();
  }, []);
  async function getProfileDetail() {
    const response = await getTheProfileDocument(username, conf.profile_id);
    setusercred(response);
    // console.log(response);
  }
  const handleclick = () => {
    navigate("/blogpost", { state: { props } });
  };
  useEffect(() => {
    getProfileDetail();
  }, []);
  // console.log(props);
  return (
    <div
      className="max-w-lg mx-auto bg-white rounded-md overflow-hidden shadow-md my-4"
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
            src="https://placekitten.com/40/40" // Replace with user's profile picture
            alt="User Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            <p className="text-sm font-semibold">{usercred?.username}</p>
            <p className="text-xs text-gray-600">{usercred?.fullname}</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-2">{props.date}</p>

        <h2 className="text-lg font-bold mb-2">{props.title}</h2>

        <p className="text-sm text-gray-700 mb-4">{props.content}</p>

        <img
          src="https://placekitten.com/150/100" // Replace with your actual image source
          alt="Related Image"
          className="w-full h-24 object-cover mb-3"
        />

        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center">
            <span className="mr-2">Likes: {likes}</span>
            <span>Comments: {comments && comments.length + 1}</span>
          </div>
          <span>{props.category}</span>
        </div>

        <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
          Bookmark
        </button>
      </div>
    </div>
  );
}
