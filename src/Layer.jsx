import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "./appwriteBackend/authentication/auth";

function Layer() {
  const [validate, setvalidate] = useState(false);
  console.log(validate);
  let navigate = useNavigate();
  const { checkLogin } = useAuth();
  async function validateUser() {
    const val = await checkLogin();
    if (val) {
      setvalidate(true);
      navigate("/myfeed");
    } else navigate("/login");
  }
  useEffect(() => {
    validateUser();
  }, []);
  return (
    <div>
      {validate ? <Navbar /> : null}
      <Outlet />
    </div>
  );
}

export default Layer;
