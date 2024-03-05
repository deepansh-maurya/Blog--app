import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDatabse } from "../appwriteBackend/database/databse";
import conf from "../conf/conf";
import BlogCard from "./BlogCard";
import { databases } from "../appwriteBackend/database/databse";
import { Query } from "appwrite";
import FeedBLogCard from "./FeedBlogCard";
import { useBlog } from "../global/blogcontext";
import { useStorage } from "../appwriteBackend/storage/storage";
export default function FeedBlogPost() {
  const { createPostImage, imagePreview } = useStorage();

  const [follower, setfollower] = useState("follow");
  const { username } = useBlog();
  const [likes, setlikes] = useState("");
  const [allblogs, setallblogs] = useState();
  const post = useLocation();
  const data = post.state.props;
  console.log(data, "ytttttttttttttttttttt");
  const {
    getTheProfileDocument,
    getReviews,
    updateLikes,
    updateComments,
    toGetBLogsForFeed,
  } = useDatabse();
  const [cred, setcred] = useState();
  // console.log(cred);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [blogimage, setblogimage] = useState();
  async function getImage() {
    const promise = await imagePreview(data.image);
    setblogimage(promise.href);
  }
  const [profile, setprofile] = useState();
  async function getBloggerName() {
    const res = await getTheProfileDocument(data.username, conf.profile_id);
    const promise = await imagePreview(res.image);
    setprofile(promise.href);
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
    console.log("aa gya");
    const promise = await getReviews(data.slug);
    const likedby = promise.likedby;
    console.log(promise);
    if (!likedby.includes(username)) {
      likedby.push(username);
      let like = Number(likes);
      like++;
      setlikes(like);
      const promise = await updateLikes(data.slug, String(like), likedby);
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
    const promise = await databases.listDocuments(
      conf.databse_id,
      conf.article_id,
      [Query.equal("username", data.username)]
    );
    console.log(promise);
    if (promise) setallblogs(promise.documents);
  }

  async function handleFollow() {
    const promise = await databases.getDocument(
      conf.databse_id,
      conf.linkedWithProfile,
      data.username
    );
    const promise3 = await databases.getDocument(
      conf.databse_id,
      conf.linkedWithProfile,
      username
    );
    console.log(promise, promise3);
    let followedby = promise.followedby;
    let youfollowed = promise3.youfollowed;
    console.log(followedby, youfollowed);
    if (!followedby.includes(username)) {
      setfollower("following");
      let follower = Number(promise.follower);
      follower++;
      followedby.push(username);
      youfollowed.push(data.username);
      follower = String(follower);
      const promise2 = await databases.updateDocument(
        conf.databse_id,
        conf.linkedWithProfile,
        data.username,
        { follower, followedby }
      );
      if (promise2) console.log(promise2);
      const promise4 = await databases.updateDocument(
        conf.databse_id,
        conf.linkedWithProfile,
        username,
        { youfollowed }
      );
      console.log(promise4);
    }
  }

  async function toCheckFolllowerLikes() {
    const promise = await databases.getDocument(
      conf.databse_id,
      conf.linkedWithProfile,
      data.username
    );
    let follower = promise.followedby;
    if (follower.includes(username)) setfollower("following");
  }
  useEffect(() => {
    toCheckFolllowerLikes();
    getBloggerName();
    getBlogs();
    getReviewsOfBLogs();
    getImage();
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md my-8">
      {/* Blog Header */}
      <div className="flex items-center mb-4">
        <img
          src={blogimage}
          alt="Blog Post"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-bold">{data.title}</h2>
          <div className="flex items-center text-gray-600">
            <img
              src={profile} // Replace with the URL of the blogger's image
              alt="Blogger"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="mr-2">{cred?.username}</span>
            <span>• {data.date}</span>
          </div>
        </div>
      </div>

      {/* Follow and Like Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleFollow}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          {follower}
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
          allblogs
            .slice(0, 3)
            .map((item, index) => <FeedBLogCard key={index} props={item} />)}
      </div>
    </div>
  );
}
