import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext({
  currentUser: {},
  signUp: () => {},
  login: () => {},
  logout: () => {},
  resetPassword: () => {},
});


export default function AuthContextProvider({ children }) {
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
      console.log(auth, "auth");
      setCurrentUser(user);
    });


    return () => unsubscribe();
  }, []);


  const ctxValue = {
    currentUser,
    signUpWithEmail,
    loginWithEmail,
    logout,
    resetPassword,
  };


  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
