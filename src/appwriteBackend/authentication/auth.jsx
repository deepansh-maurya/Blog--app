import { Client, Account, ID } from "appwrite";
import { createContext, useContext } from "react";
import conf from "../../conf/conf";

const LoginSIgnupContext = createContext();
const client = new Client().setEndpoint(conf.url).setProject(conf.project_id);
const account = new Account(client);

export default function AuthContextProvider({ children }) {
  async function signUpUser(email, password, name) {
    console.log(email, password, name);
    try {
      const response = await account.create(ID.unique(), email, password, name);
      console.log("singup", response);
      if (response) return response;
    } catch (error) {
      return error;
    }
  }

  async function loginUser(email, password) {
    try {
      const response = await account.createEmailSession(email, password);
      if (response) return response;
    } catch (error) {
      return error;
    }
  }

  async function checkLogin() {
    try {
      const user = await account.get();
      if (user) return true;
    } catch (error) {
      return false;
    }
  }
  return (
    <LoginSIgnupContext.Provider value={{ loginUser, signUpUser, checkLogin }}>
      {children}
    </LoginSIgnupContext.Provider>
  );
}

export function useAuth() {
  return useContext(LoginSIgnupContext);
}
