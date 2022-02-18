import React from "react";
import { AttachFile, MoreVert } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import Style from "../css/ChatBoxCss/ChatBox.module.css";
import { useAuth } from "../Contexts/AuthContext";

const ChatBoxHeader = () => {
  const { chat } = useAuth();
  return chat ? (
    <header>
      <Avatar src={chat.avatar} />
      <div className={Style.chatName}>
        <h3>{chat.name}</h3>
      </div>
      <div className={Style.chatInfo}>
        <IconButton>
          <AttachFile className={Style.Icon} />
        </IconButton>
        <IconButton>
          <MoreVert className={Style.Icon} />
        </IconButton>
      </div>
    </header>
  ) : (
    ""
  );
};

export default ChatBoxHeader;
