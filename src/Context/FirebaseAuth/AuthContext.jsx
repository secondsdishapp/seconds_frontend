import { createContext, useContext, useState, useEffect } from "react";
import { fbAuth } from "../../../firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  async function signUpWithEmail(email, password) {
    return createUserWithEmailAndPassword(fbAuth, email, password);
  }
  async function loginWithEmail(email, password) {
    return signInWithEmailAndPassword(fbAuth, email, password);
  }
  async function resetPassword(email) {
    return sendPasswordResetEmail(fbAuth, email);
  }
  async function logout() {
    return signOut(fbAuth);
  }

  // async function signUpWithGoogle() {
  //   return signInWithPopup(auth, provider);
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fbAuth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);


  const contextValue = {
    currentUser,
    signUpWithEmail,
    loginWithEmail,
    logout,
    resetPassword,
  };


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };