import { useState, useEffect } from "react";
import MapComponent from "../Components/Map/MapComponent.jsx";

export default function Map({ menuToggle }) {

    return (
        <div style={{overflow: "hidden"}}>
            <MapComponent menuToggle={menuToggle}/>
        </div>
    )
}