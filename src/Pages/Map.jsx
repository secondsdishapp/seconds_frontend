import { useState, useEffect } from "react";
import MapComponent from "../Components/Map/MapComponent.jsx";
import "./Map.css";

export default function Map({ menuToggle }) {

    return (
        <div className={`map-page-container ${menuToggle ? "fixed" : ""}`} style={{overflow: "hidden"}}>
            <MapComponent menuToggle={menuToggle}/>
        </div>
    )
}

