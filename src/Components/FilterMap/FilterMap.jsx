import { useEffect } from "react";
import "./FilterMap.css";
import anime from "animejs";

import FilterStyle from "./FilterStyle.jsx";
import InputMUI from "./InputMUI.jsx";

export default function FilterMap({ radius, setRadius, setFilterMap, filterMap, filterPreferences, setFilterPreferences, filterRatings, setFilterRatings, filteredDishSearch, filterMapToggle, setFilterMapToggle }) {

    const filterContainer = document.querySelector(".filter-container");
    

    useEffect(() => {
        if(filterMap) {
            anime({
                targets: ".filter-container",
                keyframes: [
                    {translateX: '-63vw'}
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
                    {translateX: '23.5vw'}//-37
                ],
                duration: 2000,
                easing: 'easeOutExpo',
                zindex: 10,
                position: 'absolute',
               
            });
        }
    }, [filterMap]);

    return (
        <div className="filter-container" >
            <p className="filter-title">Filter & Sort</p>
            <InputMUI radius={radius} setRadius={setRadius}/>
            <FilterStyle filterPreferences={filterPreferences} setFilterPreferences={setFilterPreferences} filterRatings={filterRatings} setFilterRatings={setFilterRatings} tabIndex={"-1"}/>  
            <p className="results-text">Results so far: {filteredDishSearch.length}</p>
            <button className="filter-btn" type="button" tabIndex={"-1"}>Filter</button>
        </div>    
    )
}