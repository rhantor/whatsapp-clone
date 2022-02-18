import "../css/ChatRoom/ChatRoom.css";
import { MdDonutLarge, MdChat, MdMoreVert as DotMenu } from "react-icons/md";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import img from "../img/male_avatar.svg";

export default function Header() {
  const [status, setStatus] = useState(false);
  const handleClick = () => {
    status ? setStatus(false) : setStatus(true);
  };
  const { logout, currentUser , handleShowProfile } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate("/signup");
  };

  // show profile

const showProfile =()=>{
  navigate('/profile')
}
 

  

  return (
    <>
      <div className="header">
        <div className="avatar" onClick={handleShowProfile}>
          <img src={currentUser.photoURL || img} alt="avatar" />
        </div>
        <div className="headerMenu">
          <div className="sotry">
            <IconButton>
              <MdDonutLarge className="icon story" />
            </IconButton>
          </div>
          <div className="chatIcon">
            <IconButton>
              <MdChat className="icon chat" />
            </IconButton>
          </div>
          <div className="menuIcon">
            <div className="menuList">
              <IconButton onClick={handleClick}>
                {<DotMenu className="icon" />}
              </IconButton>

              <div className={`subMenu ${status ? "active" : null}`}>
                <li onClick={showProfile}>Profile</li>
                <li>Starred messages</li>
                <li>Settings</li>
                <li onClick={handleLogOut}>Log out</li>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
