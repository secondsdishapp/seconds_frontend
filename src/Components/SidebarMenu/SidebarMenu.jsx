import "./SidebarMenu.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import anime from "animejs";

export default function SidebarMenu ({ menuToggle, setMenuToggle, value, setValue }) {

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
                navigate("/login");
                setMenuToggle(false);
                setValue(-1);
                }
            }>
                <p className="link-text">Log In</p>
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
                <p className="link-text">Contact Us</p>
            </div>
        </div>
    )
}