import React, { useEffect, useState } from "react";
import { useDatabse } from "../../appwriteBackend/database/databse";
import BlogCard from "../../components/BlogCard";

export default function Manageblogs() {
  const { toGetAllBlogs } = useDatabse();
  const [blogs, setblogs] = useState();
  async function getBLogs() {
    const response = await toGetAllBlogs();
    setblogs(response.documents);
  }
  useEffect(() => {
    // console.log(blogs);
  }, [blogs]);
  useEffect(() => {
    getBLogs();
  }, []);
  return (
    <div>
      {blogs &&
        blogs.map((blog) => {
          return <BlogCard props={blog} />;
        })}
    </div>
  );
}
