import "./SidebarMenu.css";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/FirebaseAuth/AuthContext";

import anime from "animejs";

export default function SidebarMenu ({ menuToggle, setMenuToggle, value, setValue }) {

    const {
      currentUser,
      signUpWithEmail,
      loginWithEmail,
      logout,
      resetPassword,
    } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        anime({
            targets: ".sidebar-container",
            keyframes: [
                {translateX: '-100vw'}
            ],
            duration: 2000,
            easing: "easeOutExpo",
            zindex: 1,
            position: "relative",
        })
    }, [])

    return (
        <div className={`sidebar-container`}>
            <div className="links" onClick={() => {
                currentUser ? navigate("/myaccount") : navigate("/auth");
                setMenuToggle(false);
                setValue(-1);
                }
            }>
                <p className="link-text">{currentUser ? "My Account" : "Log In"}</p>
                {/* <p className="link-text">My Account</p> */}
            </div>
            <div className="links" onClick={() => {
                navigate("/about");
                setMenuToggle(false);
                setValue(-1);
                }
            }>
                <p className="link-text">About Us</p>
            </div>
            {currentUser ?
              <div className="links" onClick={() => {
                logout();
                navigate("/");
                setMenuToggle(false);
                setValue(-1);
                }
              }>
                <p className="link-text">Log Out</p>
              </div> : 
              null 
            }
        </div>
    )
}