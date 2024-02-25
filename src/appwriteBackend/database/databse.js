import { Client, Databases, ID, Query } from "appwrite";
import conf from "../../conf/conf";
import { createContext, useContext } from "react";
const DatabaseContext = createContext();
const client = new Client().setEndpoint(conf.url).setProject(conf.project_id);

const databases = new Databases(client);

export default function DatabaseContextPRovider({ children }) {
  async function createPost({
    title,
    content,
    category,
    tags,
    image,
    userid,
    date,
    slug,
    status,
  }) {
    try {
      const promise = databases.createDocument(
        conf.databse_id,
        conf.article_id,
        slug,
        { title, content, category, tags, image, userid, date, status }
      );
      if (promise) return true;
    } catch (error) {
      return false;
    }
  }
  async function updatePost({
    title,
    content,
    category,
    tags,
    image,
    userid,
    date,
    slug,
    status,
  }) {
    try {
      const promise = databases.updateDocument(
        conf.databse_id,
        conf.article_id,
        slug,
        { title, content, category, tags, image, userid, date, status }
      );
      if (promise) return true;
    } catch (error) {
      return false;
    }
  }
  async function deletePost(slug) {
    try {
      const promise = databases.deleteDocument(
        conf.databse_id,
        conf.article_id,
        slug
      );
      if (promise) return true;
    } catch (error) {
      return false;
    }
  }

  async function getPosts() {
    try {
      const promise = databases.listDocuments(
        conf.databse_id,
        conf.article_id,
        [Query.equal("status", "active")]
      );
      if (promise) return promise;
    } catch (error) {
      return false;
    }
  }

  return (
    <DatabaseContext.Provider
      value={{ getPosts, deletePost, updatePost, createPost }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabse() {
  return useContext(DatabaseContext);
}
