import React, { useEffect, useState } from "react";
import { useBlog } from "../global/blogcontext";
import { databases } from "../appwriteBackend/database/databse";
import conf from "../conf/conf";
import { Query } from "appwrite";

export default function Getresults() {
  const { search, setsearch } = useBlog();
  const [blogs, setblogs] = useState([]);
  console.log(blogs);
  async function getSearchResults() {
    try {
      // const promise = await databases.listDocuments(
      //   conf.databse_id,
      //   conf.article_id,
      //   [Query.orderAsc("tags")]
      // );
      // const documents = promise.documents;
      // documents.forEach((item, index) => {
      //   if (item.tags.includes(search)) {
      //     setblogs((prev) => [...prev, item]);
      //   }
      // });
      const promise2 = await databases.listDocuments(
        conf.databse_id,
        conf.article_id,
        [Query.equal("category", "science")]
      );
      setblogs((prev) => [...prev, promise2.documents]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSearchResults();
  }, []);
  return <div></div>;
}
