import "./SidebarMenu.css";
import { useEffect } from "react";

import anime from "animejs";

export default function SidebarMenu () {

    useEffect(() => {
        anime({
            targets: ".sidebar-container",
            keyframes: [
                {translateX: -430}
            ],
            duration: 2000,
            easing: "easeOutExpo",
            zindex: 1,
            position: "relative",
        })
    },[])

    return (
        <div className={`sidebar-container`}>
            <div className="links">
                <p>Log In</p>
            </div>
            <div className="links">
                <p>About Us</p>
            </div>
            <div className="links">
                <p>Contact Us</p>
            </div>
        </div>
    )
}