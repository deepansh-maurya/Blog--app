import React, { useEffect, useState } from "react";
import { useBlog } from "../global/blogcontext";
import { databases } from "../appwriteBackend/database/databse";
import conf from "../conf/conf";
import { Query } from "appwrite";
import FeedBLogCard from "./FeedBlogCard";

export default function Getresults() {
  const [draftlength, setdraftlength] = useState(0);
  const { search, setsearch } = useBlog();
  const [blogs, setblogs] = useState([]);
  console.log(blogs);
  async function getSearchResults() {
    try {
      const promise = await databases.listDocuments(
        conf.databse_id,
        conf.article_id,
        [Query.orderAsc("tags")]
      );
      const documents = promise.documents;
      documents.forEach((item, index) => {
        if (item.tags.includes("sdfs")) {
          setblogs((prev) => [...prev, item]);
        }
      });
      const promise2 = await databases.listDocuments(
        conf.databse_id,
        conf.article_id,
        [Query.equal("category", search)]
      );
      promise2.documents.forEach((item, index) => {
        setblogs((prev) => [...prev, item]);
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSearchResults();
  }, []);
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
  return (
    <div>
      {/* {blogs.map((item, index) => {
        return <FeedBLogCard props={item} />;
      })} */}
      <div className="flex">
        <div className="w-3/4 p-4">
          {blogs &&
            blogs.map((blog, index) => (
              <FeedBLogCard key={index} props={blog} />
            ))}
        </div>

        <div className="w-1/4 p-4">
          <div className="mb-4 text-blue-500 cursor-pointer">
            Draft
            <div
              onClick={() => {
                navigate("/profile");
              }}
            >
              see all
            </div>
            <div>Your pending Drafts : {draftlength}</div>
          </div>
          <div className="text-blue-500 cursor-pointer">Trending</div>
        </div>
      </div>
    </div>
  );
}
