import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "./appwriteBackend/authentication/auth";

function Layer() {
  const [validate, setvalidate] = useState(false);
  console.log(validate);
  const navigate = useNavigate();
  const { checkLogin } = useAuth();
  async function validateUser() {
    const val = await checkLogin();
    console.log(val);
    if (val) {
      setvalidate(true);
    } else navigate("/login");
  }
  useEffect(() => {
    console.log(validate);
  }, [validate]);
  useEffect(() => {
    validateUser();
  }, []);
  return (
    <div className="  w-[100%]">
      {validate ? <Navbar /> : null}
      <Outlet />
    </div>
  );
}

export default Layer;
