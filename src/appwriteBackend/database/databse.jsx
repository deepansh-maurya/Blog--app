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
    date,
    status,
    slug,
  }) {
    try {
      const promise = await databases.createDocument(
        conf.databse_id,
        conf.article_id,
        slug,
        { title, content, category, tags, image, date, status, slug }
      );
      if (promise) return true;
    } catch (error) {
      return error;
    }
  }
  async function updatePost({
    title,
    content,
    category,
    tags,
    image,
    date,
    status,
    slug,
  }) {
    try {
      const promise = await databases.updateDocument(
        conf.databse_id,
        conf.article_id,
        slug,
        { title, content, category, tags, image, date, status, slug }
      );
      if (promise) return true;
    } catch (error) {
      return false;
    }
  }
  async function deletePost(slug) {
    try {
      const promise = await databases.deleteDocument(
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
      const promise = await databases.listDocuments(
        conf.databse_id,
        conf.article_id,
        [Query.equal("status", "active")]
      );
      if (promise) return promise;
    } catch (error) {
      return false;
    }
  }

  async function getSingleFieldFromDatabase() {
    try {
      const promise = await databases.listDocuments(
        conf.databse_id,
        conf.profile_id,
        [Query.orderAsc("username")]
      );
      if (promise) return promise;
    } catch (error) {
      return false;
    }
  }

  async function setProfileCredentialWhileSignUp({ username, email }) {
    try {
      const promise = await databases.createDocument(
        conf.databse_id,
        conf.profile_id,
        { username, email }
      );
      if (promise) return true;
    } catch (error) {
      return error;
    }
  }

  async function setOtherProfileCred({
    fullname,
    tagline,
    image,
    about,
    skills,
    twitter,
    instagram,
    facebook,
    linkedin,
    website,
  }) {
    try {
      const promise = await databases.createDocument(
        conf.databse_id,
        conf.profile_id,
        {
          fullname,
          tagline,
          image,
          about,
          skills,
          twitter,
          instagram,
          facebook,
          linkedin,
          website,
        }
      );
      if (promise) return true;
    } catch (error) {
      return error;
    }
  }

  async function setOtherFieldsOfProfile({ following, follower }) {
    try {
      const promise = await databases.createDocument(
        conf.databse_id,
        conf.linkedWithProfile,
        { following, follower }
      );
      if (promise) return true;
    } catch (error) {
      return error;
    }
  }
  return (
    <DatabaseContext.Provider
      value={{
        getPosts,
        deletePost,
        updatePost,
        createPost,
        setOtherFieldsOfProfile,
        setOtherProfileCred,
        setProfileCredentialWhileSignUp,
        getSingleFieldFromDatabase,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabse() {
  return useContext(DatabaseContext);
}
