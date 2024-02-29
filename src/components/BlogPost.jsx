import React, { useEffect } from "react";
import { useState } from "react";
import { Await, useLocation } from "react-router-dom";
import { useDatabse } from "../appwriteBackend/database/databse";
import { useBlog } from "../global/blogcontext";
import conf from "../conf/conf";
import BlogCard from "./BlogCard";
export default function BlogPost() {
  const { username } = useBlog();
  const [likes, setlikes] = useState("");
  const [allblogs, setallblogs] = useState();
  const post = useLocation();
  const {
    getTheProfileDocument,
    toGetAllBlogs,
    getReviews,
    updateLikes,
    updateComments,
  } = useDatabse();
  const data = post.state.props;
  const [cred, setcred] = useState();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  async function getBloggerName() {
    const res = await getTheProfileDocument(username, conf.profile_id);
    setcred(res);
  }
  async function getReviewsOfBLogs() {
    try {
      const promise = await getReviews(data.slug);
      if (promise.comments[0] != null) setComments(promise.comments);
      setlikes(promise.likes);
      console.log(promise, "comments");
    } catch (error) {
      return error;
    }
  }
  async function updatelikesofBlog() {
    const promise = await getReviews(data.slug);
    if (promise.likedby != username) {
      let like = Number(likes);
      like++;
      setlikes(like);
      const promise = await updateLikes(data.slug, String(like), username);
      console.log(promise);
    }
  }
  async function updateCommentsofBlog() {
    const review = comments;
    review.push(comment);
    setComments(review);
    console.log(comments);
    const promise = await updateComments(data.slug, review);
    console.log(promise);
    setComment("");
    getReviewsOfBLogs();
  }
  async function getBlogs() {
    const promise = await toGetAllBlogs();
    setallblogs(promise.documents);
  }

  useEffect(() => {
    getBloggerName();
    getBlogs();
    getReviewsOfBLogs();
  }, []);

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
        <button
          onClick={updatelikesofBlog}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline-gray"
        >
          Like
        </button>
        <div>{likes}</div>
      </div>

      {/* Blog Content */}
      <p className="text-gray-700 mb-4">{data.content}</p>

      {/* Comments Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <ul>
          {comments &&
            comments.map((comment, index) => (
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
            onClick={updateCommentsofBlog}
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
