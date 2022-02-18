import React, { createContext, useContext, useEffect, useState } from "react";
import "../firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [chat, setChat] = useState();
  const [msgs, setMsgs] = useState();

  useEffect(() => {
    const auth = getAuth();
    const logout = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return logout;
  }, []);

  // Sing In with google

  function singInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider);
  }

  // logout
  function logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  // Select user and chat
  const selectUser = (user) => {
    setChat(user);
    const user2 = user.uid;
    const id =
      currentUser.uid > user2
        ? `${currentUser.uid + user2}`
        : `${user2 + currentUser.uid}`;
    // get msgs
    const msgRef = collection(db, "messages", id, "chat");
    const q = query(msgRef, orderBy("createAt", "asc"));
    onSnapshot(q, (querySnap) => {
      let msgs = [];
      querySnap.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  };
  const value = {
    currentUser,
    logout,
    singInWithGoogle,
    selectUser,
    chat,
    msgs,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
