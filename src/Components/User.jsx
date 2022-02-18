import React from "react";
import Style from "../css/UserComponent/User.module.css";
import { Avatar } from "@mui/material";
import { useAuth } from "../Contexts/AuthContext";
const User = ({ user,}) => {
  const {selectUser} = useAuth()
  return (
    
    <div className={Style.user} onClick={()=> selectUser(user)}>
      <div className={Style.avatar}>
        <Avatar src={user.avatar} />
      </div>
      <div className={Style.userName}>
        <h5>{user.name}</h5>
      </div>
      {/* <span className={user.isOnline? Style.online : Style.offline}></span> */}
    </div>
  );
};

export default User;
