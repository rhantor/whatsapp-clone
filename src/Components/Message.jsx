import React, { useEffect, useRef } from "react";
import Style from "../css/ChatBoxCss/ChatBox.module.css";
import { useAuth } from "../Contexts/AuthContext";
import Moment from "react-moment";
const Message = ({ msg }) => {
  const { currentUser } = useAuth();

  const scrollBottom = useRef();
  useEffect(() => {
    scrollBottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <>
      <div
        className={`${Style.chatMsg}  ${
          msg.from === currentUser.uid ? Style.sender : null
        }`}
        ref={scrollBottom}
      >
        {msg.media ? (
          <div>
            <img src={msg.media && msg.media} alt="" />
            {msg.input}
          </div>
        ) : (
          <>
            {msg.input}
            <br />
            <small style={{ fontSize: "10px" }}>
              <Moment fromNow>{msg.createAt.toDate()}</Moment>
            </small>
          </>
        )}
      </div>
    </>
  );
};

export default Message;
