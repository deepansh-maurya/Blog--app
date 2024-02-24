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
import Myfeed from "./pages/myfeed/index.js";
import Login from "./pages/login/index.js";
import Signup from "./pages/signup/index.js";
import Write from "./pages/write/index.js";
import Profile from "./pages/profile/index.js";
import Explore from "./pages/explore/index.js";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/myfeed" element={<Myfeed />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/write" element={<Write />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/explore" element={<Explore />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
