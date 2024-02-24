import React from "react";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "./appwriteBackend/authentication/auth";
function App() {
  return (
    <div>
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    </div>
  );
}

export default App;
