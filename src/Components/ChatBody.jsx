import React from "react";
import Style from "../css/ChatBoxCss/ChatBox.module.css";
import Message from "./Message";
import { useAuth } from "../Contexts/AuthContext";

const ChatBody = () => {
  const { chat, msgs } = useAuth();
 
  return chat ? (
    <div className={Style.chatBody} >
      <div className={Style.overLay}>
        {msgs ? msgs.map((msg, i) => <Message msg={msg} key={i} />) : null}
      </div>
    </div>
  ) : (
    ""
  );
};

export default ChatBody;
