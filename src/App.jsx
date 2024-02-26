import React from "react";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "./appwriteBackend/authentication/auth";
import StorageContextProvider from "./appwriteBackend/storage/storage";
import DatabaseContextPRovider from "./appwriteBackend/database/databse";
import Layer from "./Layer";
function App() {
  return (
    <div>
      <DatabaseContextPRovider>
        <StorageContextProvider>
          <AuthContextProvider>
            <Layer />
          </AuthContextProvider>
        </StorageContextProvider>
      </DatabaseContextPRovider>
    </div>
  );
}

export default App;
