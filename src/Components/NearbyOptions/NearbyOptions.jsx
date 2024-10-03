import SearchBar from "../../Components/SearchBar/SearchBar";
import Dish from "../Dish/dish";
// import { useState, useEffect } from "react";
import { useState,useEffect } from "react";
export default function NearByOptions() {
  const [ dishesLocations, setDishesLocations ] = useState([]);
  const [ locationsInRadius, setLocationsInRadius ] = useState([]);
  const [ search, setSearch ] = useState("");

  const API = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [ currentLocation, setCurrentLocation ] = useState({
    lat: null,
    lng: null,
});
useEffect(() => {
  console.log(locationsInRadius, "Locations good");
},[locationsInRadius])
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
        setLocationsInRadius(dishesLocations.filter((dish, index) => calculateDistance(currentLocation, {lat: Number(dish.latitude), lng: Number(dish.longitude)}) <= 110));

    }
},[currentLocation])
useEffect(() => {
  const filtered = dishesLocations.filter((dish, index) => dish.dish_name.includes(search) || dish.restaurant_name.includes(search));
  if (filtered.length > 0) {
      setFilteredDishSearch(filtered.filter((dish, index) => calculateDistance(currentLocation, {lat: Number(dish.latitude), lng: Number(dish.longitude)}) <= 100))
  }
  console.log(filtered, "Filtered");
},[search])

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
  fetch(`${API}/dishes/locations`)
  .then((response) => response.json())
  .then(res => {
      setDishesLocations(res)
      
  })
},[]);
  let dummy=[
    {  id: 1,
      "address": "123 Main St, Springfield, IL",
      "name": "Springfield Library",
      "image": "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg"
    },
    { id: 2,
      "address": "456 Elm St, Oakwood, TX",
      "name": "Oakwood Community Center",
      "image": "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg"
    },
    { id: 3,
      "address": "789 Pine St, Maple City, CA",
      "name": "Maple City Park",
      "image": "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg"
    },
    { id: 4,
      "address": "101 Birch Ave, Greenfield, WI",
      "name": "Greenfield Arts Center",
      "image": "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg"
    },
   
  ]
  
  return (
    <div className="home-main-container">

      {/* <h4>What are you going to eat today</h4> */}
      <SearchBar/>
      <h4 className="highly-rated-nearby-options">Highly rated nearby options</h4>
      {dummy.map((item,index)=>{
        return(
         <Dish item={item} index={index}/>
        )
      })}

   

     
    </div>
  );
}
