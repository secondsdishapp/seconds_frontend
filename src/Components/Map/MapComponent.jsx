import "./MapComponent.css";
import { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps"; 

//COMPONENTS
import SlidingCarousel from "../SlidingCarousel/SlidingCarousel";

export default function MapComponent() {

    const API = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    //SEARCH BAR
    const [ search, setSearch ] = useState("");

    //RADIUS
    const [ radius, setRadius ] = useState(100);
    

    //FILTERED DISH SEARCH
    const [ filteredDishSearch, setFilteredDishSearch ] = useState([]);

    //FILTERED RESTAURANT SEARCH
    const [ filteredRestSearch, setFilteredRestSearch ] = useState([]);

    //SELECTED MARKER
    const [ selectedMarker, setSelectedMarker ] = useState(null);

    //RESTAURANTS ARRAY
    const [ restaurants, setRestaurants ] = useState([]);

    //DISHES ARRAY
    const [ dishes, setDishes ] = useState([]);

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

    useEffect(() => {
        if (currentLocation) {
            setLocationsInRadius(dishesLocations.filter((dish, index) => calculateDistance(currentLocation, {lat: Number(dish.latitude), lng: Number(dish.longitude)}) <= radius));
        }
    },[currentLocation, radius])

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

    const mapContainerStyle = {
        width: '400px',
        height: '400px',
    };
    
    const center = {
        lat: 37.7749,
        lng: -122.4194,
    }
    
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

    //Filtering the search

    useEffect(() => {
        const filtered = dishesLocations.filter((dish, index) => dish.dish_name.includes(search) || dish.restaurant_name.includes(search));
        if (filtered.length > 0) {
            setFilteredDishSearch(filtered.filter((dish, index) => calculateDistance(currentLocation, {lat: Number(dish.latitude), lng: Number(dish.longitude)}) <= radius))
        } else {
            setFilteredDishSearch([]);
        }
    },[search])

    //-------------------------------------------------------------------------------------------------


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
    }, [radius])

    return (
        <div className="map-container">
            <div className="upper-container">
                <img className="map-icon" src="/map-location2.png" alt="Map Icon" />
                <input className="search-bar" type="text" placeholder="Search dish or restaurant" value={search} onChange={handleSearch} onClick={() => setSelectedMarker(null)}/>
                <label className="radius">
                    Radius:
                    <input className="radius-input" type="number" onChange={(e) => setRadius(e.target.value)}/>
                </label>
                <img className="filter-icon" src="/filter.png" alt="Filter Icon" />
            </div>
            {currentLocation.lat && currentLocation.lng ?
            <div className="google-map">
            <APIProvider apiKey={API_KEY} onLoad={() => console.log("Maps API loaded")}>
                <Map
                    style={{width: "100%", height: "400px"}}
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
                <div style={{width:"100%", display:"flex", flexDirection:"row"}}>
                    <SlidingCarousel filteredDishSearch={filteredDishSearch}/>
                </div>
          :  <p style={{fontSize:"30px"}}>No Results</p>}
          </div>
      )
  }