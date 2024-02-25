import { Client, Storage, ID } from "appwrite";
import conf from "../../conf/conf";
import { createContext, useContext } from "react";

const StorageContext = createContext();
const client = new Client().setEndpoint(conf.url).setProject(conf.project_id);

const storage = new Storage(client);

export default function StorageContextProvider({ children }) {
  async function createPostImage(file) {
    try {
      const promise = storage.createFile(conf.bucket_id, ID.unique(), file);
      if (promise) return promise;
    } catch (error) {
      return false;
    }
  }

  async function deletePostImage(fileid) {
    try {
      const pormise = storage.deleteFile(conf.bucket_id, fileid);
      return true;
    } catch (error) {
      return false;
    }
  }
  async function imagePreview(fileid) {
    try {
      const promise = storage.getFilePreview(conf.bucket_id, fileid);
      return promise;
    } catch (error) {
      return false;
    }
  }
  return (
    <StorageContext.Provider
      value={{ createPostImage, deletePostImage, imagePreview }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  return useContext(StorageContext);
}
