import { useEffect } from "react";
import "./FilterMap.css";
import anime from "animejs";

export default function FilterMap({ radius, setRadius, filterMap }) {

    useEffect(() => {
        if(filterMap) {
            anime({
                targets: ".filter-container",
                keyframes: [
                    {translateX: '-75vw'}
                ],
                duration: 2000,
                easing: 'easeOutExpo',
                zindex: 10,
                position: 'absolute',
            });
        }
    },[filterMap]);

    return (
        <>
        {filterMap ? 
        <div className={`filter-container`}>
            <p style={{textAlign: "center", color: "white"}}>Filter & Sort</p>
             <label className="radius">
                    Radius:
                    <input className="radius-input" type="number" onChange={(e) => setRadius(e.target.value)}/>
                </label>
        </div>
        : null}
        </>
    )
}