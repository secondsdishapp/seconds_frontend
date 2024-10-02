import "./SidebarMenu.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import anime from "animejs";

export default function SidebarMenu ({ menuToggle, setMenuToggle }) {

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
                }
            }>
                <p className="link-text">Log In</p>
            </div>
            <div className="links">
                <p className="link-text">About Us</p>
            </div>
            <div className="links">
                <p className="link-text">Contact Us</p>
            </div>
        </div>
    )
}