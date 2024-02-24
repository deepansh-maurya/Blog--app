const conf = {
  url: String("https://cloud.appwrite.io/v1"),
  project_id: String("65d9c847a533f5a6c8c7"),
  databse_id: String(import.meta.env.VITE_ARRWRITE_DATABASE_ID),
  article_id: String(import.meta.env.VITE_ARRWRITE_COLLECTION_ARTICLE_ID),
  user_id: String(import.meta.env.VITE_ARRWRITE_COLLECTION_USER_ID),
  bucket_id: String(import.meta.env.VITE_ARRWRITE_BUCKET_ID),
};
export default conf;
