import { Client, Account, ID } from "appwrite";
import { createContext, useContext } from "react";
import conf from "../../conf/conf";
import { useBlog } from "../../global/blogcontext";
import { useNavigate } from "react-router-dom";

const LoginSIgnupContext = createContext();
const client = new Client().setEndpoint(conf.url).setProject(conf.project_id);
const account = new Account(client);

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const { setusername } = useBlog();
  async function signUpUser(email, password, name) {
    console.log(email, password, name);
    try {
      const response = await account.create(ID.unique(), email, password, name);
      console.log("singup", response);
      if (response) {
        const res = await loginUser(email, password);
        const res2 = await checkLogin();
        setusername(res2.name);
        navigate("/myfeed");
        console.log(res, "login", res2);
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  async function loginUser(email, password) {
    try {
      const response = await account.createEmailSession(email, password);
      if (response) {
        const res = await checkLogin();
        setusername(res.name);
        navigate("/myfeed");
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  async function checkLogin() {
    try {
      const user = await account.get();
      if (user) {
        setusername(user.name);
        navigate("/myfeed");
        return user;
      }
    } catch (error) {
      return false;
    }
  }
  async function logOut() {
    console.log("a gya ");
    try {
      const promise = await account.deleteSession("current");
      console.log(promise);
      if (promise) {
        console.log("logout");
        navigate("/login");
      }
    } catch (error) {
      return error;
    }
  }
  return (
    <LoginSIgnupContext.Provider
      value={{ loginUser, signUpUser, checkLogin, logOut }}
    >
      {children}
    </LoginSIgnupContext.Provider>
  );
}

export function useAuth() {
  return useContext(LoginSIgnupContext);
}
