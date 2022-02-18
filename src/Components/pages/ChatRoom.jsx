import React, { useEffect } from "react";
import ChatBox from "../ChatBox";
import SideBar from "../SideBar";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../Contexts/AuthContext";
const ChatRoom = () => {
  const { currentUser } = useAuth();
  useEffect(() => {
    (async () => {
      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
        email: currentUser.email,
        createAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
    })();
  }, [currentUser]);
  return (
    <div className="body">
      <div className="chatRoom">
        <div className="leftSide">
          <SideBar />
        </div>
        <div className="rightSide">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
