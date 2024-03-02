import { createContext, useContext, useState } from "react";

const GLobalBlogContext = createContext();

export default function GlobalBlogContextProvider({ children }) {
  const [username, setusername] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "technology",
    tags: "",
    image: "",
    date: "",
    status: "",
    slug: "",
  });
  console.log(formData);
  console.log(username);
  return (
    <GLobalBlogContext.Provider
      value={{ username, setusername, formData, setFormData }}
    >
      {children}
    </GLobalBlogContext.Provider>
  );
}

export function useBlog() {
  return useContext(GLobalBlogContext);
}
