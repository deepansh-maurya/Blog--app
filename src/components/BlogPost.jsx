import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDatabse } from "../appwriteBackend/database/databse";
import { useBlog } from "../global/blogcontext";
import conf from "../conf/conf";
import BlogCard from "./BlogCard";
export default function BlogPost() {
  const { username } = useBlog();
  const [allblogs, setallblogs] = useState();
  console.log(allblogs, "allblogs");
  const post = useLocation();
  const { getTheProfileDocument, toGetAllBlogs, getReviews } = useDatabse();
  const data = post.state.props;
  const [cred, setcred] = useState();
  console.log(data);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(["Comment 1", "Comment 2"]);
  async function getBloggerName() {
    const res = await getTheProfileDocument(username, conf.profile_id);
    console.log(res);
    setcred(res);
  }
  async function getReviewsOfBLogs() {
    try {
      const promise = await getReviews(data.slugs);
      console.log(promise);
    } catch (error) {
      return error;
    }
  }
  async function getBlogs() {
    const promise = await toGetAllBlogs();
    setallblogs(promise.documents);
  }
  useEffect(() => {
    getBloggerName();
    getBlogs();
  }, []);
  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setComments((prevComments) => [...prevComments, comment]);
      setComment("");
    }
  };
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md my-8">
      {/* Blog Header */}
      <div className="flex items-center mb-4">
        <img
          src="blog_picture.jpg"
          alt="Blog Post"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-bold">{data.title}</h2>
          <div className="flex items-center text-gray-600">
            <img
              src="blogger_image.jpg" // Replace with the URL of the blogger's image
              alt="Blogger"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="mr-2">{cred?.fullname}</span>
            <span>• {data.date}</span>
          </div>
        </div>
      </div>

      {/* Follow and Like Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
          Follow
        </button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline-gray">
          Like
        </button>
      </div>

      {/* Blog Content */}
      <p className="text-gray-700 mb-4">{data.content}</p>

      {/* Comments Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="text-gray-600 mb-2">
              {comment}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          ></textarea>
          <button
            onClick={handleAddComment}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Add Comment
          </button>
        </div>
      </div>

      {/* More Articles Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">More Articles</h3>
        {allblogs &&
          allblogs.map((item, index) => {
            if (index < 3) {
              return <BlogCard props={item} />;
            }
          })}
      </div>
    </div>
  );
}
