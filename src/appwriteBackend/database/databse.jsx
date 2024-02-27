import { Client, Databases, ID, Query } from "appwrite";
import conf from "../../conf/conf";
import { createContext, useContext } from "react";
import { useBlog } from "../../global/blogcontext";
const DatabaseContext = createContext();
const client = new Client().setEndpoint(conf.url).setProject(conf.project_id);

const databases = new Databases(client);

export default function DatabaseContextPRovider({ children }) {
  const { username } = useBlog();
  //functions for handling posts
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
  /////

  // functions for handling the profile component
  //funtions to get single field from database
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

  // function to set username and email while sign up
  async function setProfileCredentialWhileSignUp(id, { username, email }) {
    console.log(username, email);
    try {
      const promise = await databases.createDocument(
        conf.databse_id,
        conf.profile_id,
        id,
        { username, email }
      );
      if (promise) return true;
    } catch (error) {
      return error;
    }
  }

  // to edit the profile section
  async function setOtherProfileCred(
    id,
    {
      username,
      email,
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
  ) {
    try {
      const promise = await databases.updateDocument(
        conf.databse_id,
        conf.profile_id,
        id,
        {
          username,
          email,
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

  // to set the follower
  async function setOtherFieldsOfProfile(
    username,
    { following, follower, email }
  ) {
    console.log(follower, following, email);
    try {
      const promise = await databases.createDocument(
        conf.databse_id,
        conf.linkedWithProfile,
        username,
        { following, follower, email }
      );
      if (promise) return true;
    } catch (error) {
      return error;
    }
  }
  async function updateFollowerFollowing(
    username,
    { following, follower, email }
  ) {
    try {
      const promise = await databases.updateDocument(
        conf.databse_id,
        conf.linkedWithProfile,
        username,
        { following, follower, email }
      );
      if (promise) return true;
    } catch (error) {
      return error;
    }
  }
  // to get the document of profile
  async function getTheProfileDocument(username, collectionId) {
    try {
      const promise = await databases.getDocument(
        conf.databse_id,
        collectionId,
        username
      );
      if (promise) return promise;
    } catch (error) {
      return error;
    }
  }
  /////////////
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
        getTheProfileDocument,
        updateFollowerFollowing,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabse() {
  return useContext(DatabaseContext);
}
