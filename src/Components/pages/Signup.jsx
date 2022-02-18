import img from "../../img/google.png";
import whatsappImg from "../../img/whatsapp.png";
import style from "../../css/SignIn/SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { IconButton } from "@mui/material";


export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { singInWithGoogle, currentUser } = useAuth();
  // const {displayName} = currentUser ;
  console.log(currentUser);
  const navigate = useNavigate();

  const handleGoogleSing = async () => {
    try {
      setLoading(true);
      await singInWithGoogle();

      navigate("/chatroom");
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case "auth/internal-error":
          setError(err.message);
          break;

        default:
          break;
      }
      setError(err);
    }
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.form}>
          <div className={style.form_frame}>
            <img src={whatsappImg} alt="" />

            <h1 className={style.title}>WhatsApp Web</h1>
            <IconButton
              className={style.googleBtn}
              onClick={handleGoogleSing}
              disabled={loading}
            >
              <img src={img} alt="google-logo" className={style.icon} />{" "}
              {loading ? "login..." : "Sign With Google"}
            </IconButton>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </>
  );
}
