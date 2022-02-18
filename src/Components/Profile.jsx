import React, { useRef, useState } from "react";
import Styles from "../css/Profile/Profile.module.css";
import img from "../img/male_avatar.svg";
import { useAuth } from "../Contexts/AuthContext";
import { IconButton } from "@mui/material";
import { ArrowBack, Mode, CheckCircle, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import Moment from "react-moment";
function Profile() {
  const [bio, setBio] = useState(JSON.parse(localStorage.getItem("bio")));
  const [input, setInput] = useState("");
  const [hideBioInput, showBioInput] = useState(false);
  const bioRef = useRef("");
  const maxLength = 26;
  const { currentUser } = useAuth();
  console.log(currentUser);
  const navigate = useNavigate();
  const handleBioClick = () => {
    showBioInput(true);
  };
  const bioSaveBtn = () => {
    showBioInput(false);
    setBio(input);
    localStorage.setItem("bio", JSON.stringify(input));
  };
  const bioCancelBtn = () => {
    showBioInput(false);
  };

  const hideProfile = () => {
    navigate("/chatroom");
  };

  return (
    <div className={Styles.profileBody}>
      <header className={Styles.proHeader}>
        <IconButton onClick={hideProfile}>
          <ArrowBack className="Icon" />
        </IconButton>
      </header>
      <div className={Styles.container}>
        <div className={Styles.imgSec}>
          <div className={Styles.Img}>
            <img src={currentUser.photoURL || img} alt="" />
          </div>
        </div>
        <div className={Styles.details}>
          <h1>{currentUser.displayName}</h1>
          <div className={Styles.info}>
            <p>Your account ~</p>
            <h3>{currentUser.email}</h3>
            {/* <p>
              Joined on :{" "}
              <Moment format="YYYY:MM:DD">{currentUser.createdAt}</Moment>{" "}
            </p> */}
          </div>
          <div className={Styles.bio}>
            <div className="editIcon">
              <h3 className={Styles.bioTitle}>Set Your Bio ~</h3>
              <span className="mainBio">{bio}</span>
              <IconButton className="Icon" onClick={handleBioClick}>
                <Mode />
              </IconButton>
            </div>

            {hideBioInput === false ? null : (
              <div className={Styles.bioText} ref={bioRef}>
                <input
                  className={Styles.bioInput}
                  type="text"
                  value={input}
                  maxLength={26}
                  onChange={(e) => setInput(e.target.value)}
                />
                <span className={Styles.inputLength} title="Text-Limitation">
                  {input.length}/ {maxLength}
                </span>

                <div className={Styles.bioSaveContent}>
                  <span>
                    <IconButton className="Icon" onClick={bioSaveBtn}>
                      <CheckCircle />
                    </IconButton>
                    <IconButton className="Icon" onClick={bioCancelBtn}>
                      <Cancel />
                    </IconButton>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
