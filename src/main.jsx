import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Myfeed from "./pages/myfeed/index.jsx";
import Login from "./pages/login/index.jsx";
import Signup from "./pages/signup/index.jsx";
import Write from "./pages/write/index.jsx";
import ProfileSection from "./pages/profile/index.jsx";
import Explore from "./pages/explore/index.jsx";
import Layer from "./Layer.jsx";
import BlogPost from "./components/BlogPost.jsx";
import FeedBlogPost from "./components/FeedBlogPost.jsx";
import EditBlog from "./components/EditBlog.jsx";
import EditDraftBLog from "./pages/profile/EditDraftBLog.jsx";
import Getresults from "./components/Getresults.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/search-results" element={<Getresults />} />
      <Route path="/editdraftblog" element={<EditDraftBLog />} />
      <Route path="/editblog" element={<EditBlog />} />
      <Route path="/feedblogpost" element={<FeedBlogPost />} />
      <Route path="/blogpost" element={<BlogPost />} />
      <Route path="/layer" element={<Layer />} />
      <Route path="/myfeed" element={<Myfeed />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/write" element={<Write />} />
      <Route path="/profile" element={<ProfileSection />} />
      <Route path="/explore" element={<Explore />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
