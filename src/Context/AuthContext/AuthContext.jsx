import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../../firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext({
  currentUser: {},
  signUpWithEmail: () => {},
  loginWithEmail: () => {},
  logout: () => {},
  resetPassword: () => {},
 });

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  async function signUpWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  async function loginWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  async function logout() {
    return signOut(auth);
  }

  // async function signUpWithGoogle() {
  //   return signInWithPopup(auth, provider);
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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

export const useAuth = () => useContext(AuthContext)