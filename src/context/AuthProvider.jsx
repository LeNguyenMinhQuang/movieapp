import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubcrible = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setIsLoading(false);
        return;
      } else {
        setUser({});
        setIsLoading(false);
        navigate("/login");
      }
    });
    return () => {
      unsubcrible();
    };
  }, [navigate]);
  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <h1>Please wait</h1> : children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
