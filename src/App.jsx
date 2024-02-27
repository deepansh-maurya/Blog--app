import React from "react";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "./appwriteBackend/authentication/auth";
import StorageContextProvider from "./appwriteBackend/storage/storage";
import DatabaseContextPRovider from "./appwriteBackend/database/databse";
import Layer from "./Layer";
import GlobalBlogContextProvider from "./global/blogcontext";
function App() {
  return (
    <div>
      <GlobalBlogContextProvider>
        <DatabaseContextPRovider>
          <StorageContextProvider>
            <AuthContextProvider>
              <Layer />
            </AuthContextProvider>
          </StorageContextProvider>
        </DatabaseContextPRovider>
      </GlobalBlogContextProvider>
    </div>
  );
}

export default App;
