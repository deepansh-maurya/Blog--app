import React, { useEffect } from "react";
import { useBlog } from "../global/blogcontext";
import { databases } from "../appwriteBackend/database/databse";
import conf from "../conf/conf";
import { Query } from "appwrite";

export default function Getresults() {
  const { search, setsearch } = useBlog();

  async function getSearchResults() {
    try {
      const promise = await databases.listDocuments(
        conf.databse_id,
        conf.article_id,
        [Query.equal("category", search)]
      );
      console.log(promise);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSearchResults();
  }, []);
  return <div></div>;
}
