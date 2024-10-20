import "./SidebarMenu.css";
import { useEffect, useContext } from "react";
import { LocalAuthContext } from "../../Context/LocalAuth/LocalAuthContext";
import { useNavigate } from "react-router-dom";

import anime from "animejs";

export default function SidebarMenu ({ menuToggle, setMenuToggle, value, setValue }) {

    const { isLocalLoggedIn } = useContext(LocalAuthContext);

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
    },[])

    return (
        <div className={`sidebar-container`}>
            <div className="links" onClick={() => {
                // isLocalLoggedIn ? navigate("/myaccount") : navigate("/login");
                navigate("/myaccount");
                setMenuToggle(false);
                setValue(-1);
                }
            }>
                {/* <p className="link-text">{isLocalLoggedIn ? "My Account" : "Log In"}</p> */}
                <p className="link-text">My Account</p>
            </div>
            <div className="links" onClick={() => {
                navigate("/about");
                setMenuToggle(false);
                setValue(-1);
                }
            }>
                <p className="link-text">About Us</p>
            </div>
            <div className="links" onClick={() => {
                navigate("/contact-us");
                setMenuToggle(false);
                setValue(-1);
                }
            }>
                <p className="link-text">Log Out</p>
            </div>
        </div>
    )
}