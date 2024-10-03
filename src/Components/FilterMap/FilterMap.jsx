import { useEffect } from "react";
import "./FilterMap.css";
import anime from "animejs";

import FilterStyle from "./FilterStyle.jsx";

export default function FilterMap({ radius, setRadius, filterMap }) {

    useEffect(() => {
        if(filterMap) {
            anime({
                targets: ".filter-container",
                keyframes: [
                    {translateX: '-87vw'}
                ],
                duration: 2000,
                easing: 'easeOutExpo',
                zindex: 10,
                position: 'absolute',
            });
        } else {
            anime({
                targets: ".filter-container",
                keyframes: [
                    {translateX: '0vw'}
                ],
                duration: 2000,
                easing: 'easeOutExpo',
                zindex: 10,
                position: 'absolute',
            });
        }
    },[filterMap]);

    return (
        <div className={`filter-container`}>
            <p style={{textAlign: "center", color: "black"}}>Filter & Sort</p>
             <label className="radius">
                Radius:
                <input className="radius-input" type="number" onChange={(e) => setRadius(e.target.value)}/>
            </label>
            <FilterStyle />  
            <button type="button">Filter</button>
        </div>    
    )
}