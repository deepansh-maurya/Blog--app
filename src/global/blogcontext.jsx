import { createContext, useContext, useState } from "react";

const GLobalBlogContext = createContext();

export default function GlobalBlogContextProvider({ children }) {
  const [email, setemail] = useState("");
  return (
    <GLobalBlogContext.Provider value={{ email, setemail }}>
      {children}
    </GLobalBlogContext.Provider>
  );
}

export function useBlog() {
  return useContext(GLobalBlogContext);
}
