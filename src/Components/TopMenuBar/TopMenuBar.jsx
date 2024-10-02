import "./TopMenuBar.css";
import { useState } from "react";

export default function TopMenuBar({ menuToggle, setMenuToggle }) {


    return (
        
        <div className="top-menubar-container">
            <img src="/seconds-logo2.png" className="logo"/>
            <div className="hamburger-menu-container" >
                <label className="hamburger-menu" >
                    <input className="" type="checkbox" onClick={() => setMenuToggle(!menuToggle)}/>
                </label>
            </div>
        </div>
    )
}