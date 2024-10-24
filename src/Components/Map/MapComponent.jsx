import "./MapComponent.css";
import { useState, useEffect, useRef } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps"; 
import anime from "animejs";
import { useNavigate } from "react-router-dom";

//COMPONENTS
import SlidingCarousel from "../SlidingCarousel/SlidingCarousel";
import FilterMap from "../FilterMap/FilterMap";

export default function MapComponent({ menuToggle, search, setSearch }) {

    const navigate = useNavigate();

    const API = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    //DISH OR RESTAURANT STATE
    const [ isSelected, setIsSelected ] = useState("");

    //FILTER PREFERENCES
    const [ filterPreferences, setFilterPreferences ] = useState("");

    //FILTER RATINGS
    const [ filterRatings, setFilterRatings ] = useState(null);

     //RADIUS
     const [ radius, setRadius ] = useState(100);

    //FILTER RESULTS--------------------------------------------------------------------------------------------------------
    const [ filterResults, setFilterResults ] = useState({
        radius: radius,
        preference: "",
        rating: ""
    });

    useEffect(() => {
        setFilterResults({
            radius: radius || String(100),
            preference: filterPreferences || "",
            rating: filterRatings || ""
        })
    }, [filterPreferences, filterRatings, radius])

    useEffect(() => {
        console.log(filterResults, "Filter Results");
    }, [filterResults]);


    //----------------------------------------------------------------------------------------------------------------------

    //FILTER MAP 2
    const [ filterMapToggle, setFilterMapToggle ] = useState(false);

    //FILTER MAP
    const [ filterMap, setFilterMap ] = useState(false);

    //SEARCH BAR
    const [ search2, setSearch2 ] = useState("");
    useEffect(() => {
        console.log(search, "Line 60");
    }, [search])

    //SEARCH FILTER
    const [ searchFilter, setSearchFilter ] = useState([]);

    //RATING FILTER
    const [ ratingFilter, setRatingFilter ] = useState([]);
    
    //FILTERED DISH SEARCH
    const [ filteredDishSearch, setFilteredDishSearch ] = useState([]);

    //FILTERED RESTAURANT SEARCH
    const [ filteredRestSearch, setFilteredRestSearch ] = useState([]);

    //SELECTED MARKER
    const [ selectedMarker, setSelectedMarker ] = useState(null);

    //RESTAURANTS ARRAY
    const [ restaurants, setRestaurants ] = useState([]);

    //DISHES LOCATIONS ARRAY
    const [ dishesLocations, setDishesLocations ] = useState([]);

    //LOCATIONS INSIDE RADIUS
    const [ locationsInRadius, setLocationsInRadius ] = useState([]);

    //CURRENT COORDINATES
    const [ currentLocation, setCurrentLocation ] = useState({
        lat: null,
        lng: null,
    });

    const [ error, setError ] = useState(null);

    //FUNCTIONS WITH MATH LOGIC TO CALCULATE IF LOCATION IS INSIDE A GIVEN RADIUS
    function calculateDistance(point1, point2) {
        const earthRadiusMiles = 3959;
        const dLat = (point2.lat - point1.lat) * Math.PI / 180;
        const dLon = (point2.lng - point1.lng) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return earthRadiusMiles * c;
    }

    //Filtering the search

    useEffect(() => {
        if (search) {
            setSearch2(search);
        } else {
            setSearch2("");
        }
    }, [search]);

    useEffect(() => {
            setSearchFilter( dishesLocations.filter((dish, index) => dish.dish_name.toLowerCase().includes(search2.toLowerCase()) || dish.restaurant_name.toLowerCase().includes(search2.toLowerCase()))); 
    },[search2, dishesLocations]);

    useEffect(() => {
        console.log(searchFilter, "Search Filter")
    }, [searchFilter]);

    useEffect(() => {
        if (filterResults.rating === "Highest") {
            setRatingFilter(searchFilter.sort((a, b) => b.avg_rating - a.avg_rating));
        } else if (filterResults.rating === "Lowest") {
            setRatingFilter(searchFilter.sort((a, b) => a.avg_rating - b.avg_rating));
        } else {
            setRatingFilter(searchFilter)
        }
    }, [searchFilter, filterResults]);

    useEffect(() => {
        console.log(ratingFilter, "Rating Filter")
    }, [ratingFilter])

    useEffect(() => {
        if (searchFilter.length > 0) {
            if (filterResults.preference === "Vegetarian") {
                setFilteredDishSearch(searchFilter.filter((dish, index) => ((calculateDistance(currentLocation, {lat: Number(dish.latitude), lng: Number(dish.longitude)}) <= filterResults.radius) && dish.vegetarian === true)));
            } else {
                setFilteredDishSearch(searchFilter.filter((dish, index) => calculateDistance(currentLocation, {lat: Number(dish.latitude), lng: Number(dish.longitude)}) <= filterResults.radius));
            }
        } else {
            setFilteredDishSearch([]);
        }
    }, [radius, filterResults, searchFilter]);

    //-------------------------------------------------------------------------------------------------


    useEffect(() => {
        if (currentLocation) {
            setLocationsInRadius(filteredDishSearch.filter((dish, index) => calculateDistance(currentLocation, {lat: Number(dish.latitude), lng: Number(dish.longitude)}) <= filterResults.radius));
        }
    },[currentLocation, radius, search, filteredDishSearch, filterResults])

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocation({
                    lat: Number(position.coords.latitude),
                    lng: Number(position.coords.longitude),
                });
            }),
            (error) => {
                setError(error.message);
            };
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    },[]);

    useEffect(() => {
        fetch(`${API}/restaurants`)
        .then((response) => response.json())
        .then(res => {
            setRestaurants(res)
        })
    },[]);

    useEffect(() => {
        fetch(`${API}/dishes/locations`)
        .then((response) => response.json())
        .then(res => {
            setDishesLocations(res)
        })
    },[]);

    function handleSearch (e) {
        setSearch(e.target.value)
    }

    //SLIDING CAROUSEL ANIMATION

    useEffect(() => {
        anime({
            targets: ".carousel-main-container",
            keyframes: [
                {translateX: "100%"}
            ],
            duration: 2500,
            easing: "easeOutExpo",
            zindex: 1,
            // position: "relative",
        });
    }, [search, filteredDishSearch])


    //-----------------------------------------------------------------------------------------------------------------------
    //JUST FOR TESTING PURPOSES - CAN DELETE AFTER EVERYTHING IS WORKING FINE
    useEffect(() => {
        console.log(restaurants, "Restaurants");
    },[restaurants])

    useEffect(() => {
        console.log(dishesLocations, "Dishes Locations");
    },[dishesLocations])

    useEffect(() => {
        console.log(search, "Search");
    },[search]);

    useEffect(() => {
        console.log(filteredDishSearch, "Filtered Search")
    },[filteredDishSearch])

    useEffect(() => {
        console.log(filteredRestSearch, "Filtered Restaurants")
    },[filteredRestSearch])

    useEffect(() => {
        console.log(locationsInRadius, "Locations Inside Radius");
    },[locationsInRadius])

    useEffect(() => {
        console.log(radius, "Radius");
    }, [radius]);

    useEffect(() => {
        console.log(filterPreferences, "Filter Preferences");
    },[filterPreferences]);

    useEffect(() => {
        console.log(filterRatings, "Filter Ratings");
    }, [filterRatings]);

    return (
        <div className="map-container" onClick={() => filterMap ? setFilterMap(!filterMap) : null}>
            <div className="upper-container">
                <img className="map-icon" src="/list.svg" alt="Map Icon" onClick={() => navigate("/")}/>
                <input className="search-bar" type="text" placeholder="Search dish or restaurant" value={search} onChange={(e) => setSearch(e.target.value) } onClick={() => setSelectedMarker(null)}/>
                <div style={{overflow: "hidden"}}>
                    <img className="filter-icon" src="/filter2.svg" alt="Filter Icon" onClick={() => setFilterMap(!filterMap)}/>
                    <div className="child" onClick={(e) => e.stopPropagation()}>
                        <FilterMap radius={radius} setRadius={setRadius} setFilterMap={setFilterMap} filterMap={filterMap} filterMapToggle={filterMapToggle} setFilterMapToggle={setFilterMapToggle} filterPreferences={filterPreferences} setFilterPreferences={setFilterPreferences} filterRatings={filterRatings} setFilterRatings={setFilterRatings} filteredDishSearch={filteredDishSearch}/>
                    </div>
                </div>
            </div>
            <div style={{width: "100%", height: "50px", paddingLeft: "10%", paddingRight: "10%"}}>
            <div className="dish-restaurant-filters">
                <div className="dish-filter" onClick={() => setIsSelected("dish-underline")}>
                    Dish
                    <div className={`underline ${isSelected === "dish-underline" ? "dish-underline" : ""}`}></div>
                </div>
                <div className="restaurant-filter" onClick={() => setIsSelected("restaurant-underline")}>
                    Restaurant
                    <div className={`underline ${isSelected === "restaurant-underline" ? "restaurant-underline" : ""}`}></div>
                </div>
            </div>
            </div>
            {currentLocation.lat && currentLocation.lng ?
            <div className="google-map">
            <APIProvider apiKey={API_KEY} onLoad={() => console.log("Maps API loaded")}>
                <Map
                    style={{width: "90%", height: "250px", marginLeft: "5%", borderRadius: "5px"}}
                    defaultZoom={10}
                    defaultCenter={ currentLocation }
                    mapId={"757334e0ef14872c"}
                    onCameraChanged={(event) => {
                        console.log("Camera changed: ", event)
                    }}>
                        {filteredDishSearch.map((restaurant, index) => (
                            <AdvancedMarker key={index} position={{lat: Number(restaurant.latitude), lng: Number(restaurant.longitude)}} onClick={() => setSelectedMarker({lat: Number(restaurant.latitude), lng: Number(restaurant.longitude), name: restaurant.restaurant_name})}/>
                        ))}
                        {selectedMarker && (
                            <InfoWindow position={{lat: Number(selectedMarker.lat), lng: Number(selectedMarker.lng)}}>
                                <div>
                                    <h2>{selectedMarker.name}</h2>
                                    <p>Latitude: {selectedMarker.lat}</p>
                                    <p>Longitude: {selectedMarker.lng}</p>
                                </div>
                            </InfoWindow>
                        )}
                </Map>
            </APIProvider>
            </div>
            : <p>Loading...</p>}
            {currentLocation.lat && currentLocation.lng && filteredDishSearch.length > 0 ? 
                <div className="carousel-main-container">
                    <p className="container-title">Dishes</p>
                    <SlidingCarousel filteredDishSearch={filteredDishSearch} locationsInRadius={locationsInRadius}/>
                    <p className="important-text">*Always verify with the restaurant the ingredients of the dish if you have any allergy conditions.</p>
                </div>
          :  <p style={{fontSize:"30px", color:"#009688"}}>No Results</p>}
        </div>
      )
  }