import React, { useEffect, useState } from "react";
import { databases } from "../../appwriteBackend/database/databse";
import conf from "../../conf/conf";
import DraftCard from "./DraftCard";
export default function Draft() {
  const [drafts, setdrafts] = useState();
  async function getDrafts() {
    try {
      const promise = await databases.listDocuments(
        conf.databse_id,
        conf.draftcollection_id
      );
      if (promise) {
        console.log(promise);
        setdrafts(promise.documents);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDrafts();
  }, []);
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Drafts</h1>

      {drafts &&
        drafts.map((item, index) => {
          return <DraftCard key={index} prop={item} />;
        })}
    </div>
  );
}
