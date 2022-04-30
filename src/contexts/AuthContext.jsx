import { useContext, useState } from "react";
import React from "react";
import { auth } from "../firebase";
import { useEffect, setCurrentUser } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurentUser] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}
export default AuthProvider;
