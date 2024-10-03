import { useState, useEffect } from "react";
import MapComponent from "../Components/Map/MapComponent.jsx";

export default function Map() {

    return (
        <div style={{overflow: "hidden"}}>
            <MapComponent />
        </div>
    )
}