const conf = {
  url: String(import.meta.env.ARRWRITE_URL),
  project_id: String(import.meta.env.ARRWRITE_PROJECT_ID),
  databse_id: String(import.meta.env.ARRWRITE_DATABASE_ID),
  article_id: String(import.meta.env.ARRWRITE_COLLECTION_ARTICLE_ID),
  user_id: String(import.meta.env.ARRWRITE_COLLECTION_USER_ID),
  bucket_id: String(import.meta.env.ARRWRITE_BUCKET_ID),
};
export default conf;
