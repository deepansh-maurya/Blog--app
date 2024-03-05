import React, { useEffect, useState } from "react";
import { Query } from "appwrite";
import BlogCard from "../../components/BlogCard";
import { databases, useDatabse } from "../../appwriteBackend/database/databse";
import FeedBLogCard from "../../components/FeedBlogCard";
import conf from "../../conf/conf";
import { useBlog } from "../../global/blogcontext";
import { useNavigate } from "react-router-dom";
export default function MyFeed() {
  const navigate = useNavigate();
  const [draftlength, setdraftlength] = useState(0);
  const { username } = useBlog();
  const [blogs, setblogs] = useState();
  const { getPosts } = useDatabse();
  async function getBlogs() {
    const promise = await getPosts();
    setblogs(promise.documents);
    console.log(promise);
  }

  async function totaldrafts() {
    const promise = await databases.listDocuments(
      conf.databse_id,
      conf.draftcollection_id
    );
    if (promise) setdraftlength(promise.documents.length);
    console.log(draftlength);
  }
  useEffect(() => {
    totaldrafts();
  }, []);
  async function getFollowedBlogs() {
    const promise = await databases.getDocument(
      conf.databse_id,
      conf.linkedWithProfile,
      username
    );
    let followed = promise.youfollowed;
    const promise2 = await databases.listDocuments(
      conf.databse_id,
      conf.article_id,
      [Query.equal("username", followed)]
    );
    setblogs(promise2.documents);
  }
  async function getFeaturedBlogs() {
    const promise2 = await databases.listDocuments(
      conf.databse_id,
      conf.article_id,
      [Query.equal("featured", true)]
    );
    setblogs(promise2.documents);
  }
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div className="flex bg-gray-900 text-white">
      <div className="w-3/4 p-4">
        <nav className="flex mb-4">
          <div
            onClick={getBlogs}
            className="mr-4 cursor-pointer hover:text-blue-500"
          >
            Personalized
          </div>
          <div
            onClick={getFollowedBlogs}
            className="mr-4 cursor-pointer hover:text-blue-500"
          >
            Following
          </div>
          <div
            onClick={getFeaturedBlogs}
            className="cursor-pointer hover:text-blue-500"
          >
            Featured
          </div>
        </nav>

        {blogs &&
          blogs.map((blog, index) => (
            <FeedBLogCard key={blog[index.slug]} props={blog} />
          ))}
      </div>

      <div className="w-1/4 p-4">
        <div className="mb-4 cursor-pointer hover:text-blue-500">
          Draft
          <div
            onClick={() => {
              navigate("/profile");
            }}
            className="hover:text-blue-500"
          >
            see all
          </div>
          <div>Your pending Drafts: {draftlength}</div>
        </div>
        <div className="cursor-pointer hover:text-blue-500">Trending</div>
      </div>
    </div>
  );
}
