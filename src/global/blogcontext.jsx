import { createContext, useContext, useState } from "react";

const GLobalBlogContext = createContext();

export default function GlobalBlogContextProvider({ children }) {
  const [username, setusername] = useState("");
  console.log(username);
  return (
    <GLobalBlogContext.Provider value={{ username, setusername }}>
      {children}
    </GLobalBlogContext.Provider>
  );
}

export function useBlog() {
  return useContext(GLobalBlogContext);
}
