import { useState, useEffect } from "react";
import MapComponent from "../Components/Map/MapComponent.jsx";

export default function Map() {

    // const API = import.meta.env.VITE_API_URL;


    // const [ restaurants, setRestaurants ] = useState([]);

    // useEffect(() => {
    //     fetch(`${API}/restaurants`)
    //     .then((response) => response.json())
    //     .then(res => {
    //         setRestaurants(res)
    //     })
    // },[])

    return (
        <div>
            <MapComponent />
        </div>
    )
}