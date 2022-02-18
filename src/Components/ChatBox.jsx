import React, { useState } from "react";
import Style from "../css/ChatBoxCss/ChatBox.module.css";
import { IconButton } from "@mui/material";
import { Mic, Send, AttachFile } from "@mui/icons-material";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBody from "./ChatBody";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContext";
import whatsappimg from "../img/whatsapp.png";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ClipLoader } from "react-spinners";
function ChatBox() {
  const { chat, currentUser } = useAuth();
  const [input, setInput] = useState("");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const submitMsg = async (e) => {
    e.preventDefault();
    if (input || file) {
      setLoading(true);
      const user2 = chat.uid;
      const user2Avatar = chat.avatar;
      const id =
        currentUser.uid > user2
          ? `${currentUser.uid + user2}`
          : `${user2 + currentUser.uid}`;
      // Sent file
      let downUrl;
      if (file) {
        const fileRef = ref(storage, `images/${new Date()}- ${file.name}`);
        const snap = await uploadBytes(fileRef, file);
        const downloadUrl = await getDownloadURL(
          ref(storage, snap.ref.fullPath)
        );
        downUrl = downloadUrl;
      }
      await addDoc(collection(db, "messages", id, "chat"), {
        input,
        from: currentUser.uid,
        fromAvatar: currentUser.photoURL,
        to: user2,
        toAvatar: user2Avatar,
        createAt: Timestamp.fromDate(new Date()),
        media: downUrl || "",
      });
      setLoading(false);
      setInput("");
      setFile();
    }
  };

  return (
    <>
      {chat ? (
        <div className={Style.chatBox}>
          <ChatBoxHeader />
          <ChatBody />

          <div className={Style.chatFooter}>
            <div className={Style.emojiContainer}>
              <label htmlFor="img">
                <AttachFile className={Style.Icon} />
              </label>
              <input
                type="file"
                id="img"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
            <form className={Style.inputSection} onSubmit={submitMsg}>
              {file ? (
                <span className={Style.fileTracker}>{file.name}</span>
              ) : (
                ""
              )}
              <input
                type="text"
                placeholder="Type message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {loading ? (
                <ClipLoader color="red" size={25} />
              ) : (
                <IconButton type="submit" onClick={submitMsg}>
                  <Send className={Style.submitBtn} />
                </IconButton>
              )}
            </form>
            <div className={Style.micSec}>
              <IconButton>
                <Mic />
              </IconButton>
            </div>
          </div>
        </div>
      ) : (
        <div className={Style.whatsappLogo}>
          <div className={Style.overLay}></div>
          <img src={whatsappimg} alt="" />
        </div>
      )}
    </>
  );
}

export default ChatBox;
