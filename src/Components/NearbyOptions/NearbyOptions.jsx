import SearchBar from "../../Components/SearchBar/SearchBar";
import Dish from "../Dish/dish";
import { useState,useEffect } from "react";



export default function NearByOptions({count}) {

  const [ dishesLocations, setDishesLocations ] = useState([]);
  const [ nearByDishes, setNearByDishes ] = useState([]);
  const [ allNearByDishes, setAllNearByDishes ] = useState([]);
  const [ locationsInRadius, setLocationsInRadius ] = useState([]);
  const [ search, setSearch ] = useState("");
  const [ filteredDishSearch, setFilteredDishSearch ] = useState([]);

  const API = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [ currentLocation, setCurrentLocation ] = useState({
    lat: null,
    lng: null,
});


useEffect(() => {
  console.log(locationsInRadius, "Locations good");
},[locationsInRadius]);

function calculateDistance(point1, point2) {
    const earthRadiusMiles = 3959;
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusMiles * c;
}

useEffect(() => {
  console.log(count, "Count");
 
  
    if (currentLocation) {
        setLocationsInRadius(dishesLocations.filter((dish, index) => calculateDistance(currentLocation, {lat: Number(dish.latitude), lng: Number(dish.longitude)}) <= 4));

    }
    console.log(locationsInRadius, "Locations bad");
   
},[currentLocation,count]);


useEffect(() => {
  const filtered = dishesLocations.filter((dish, index) => dish.dish_name.includes(search) || dish.restaurant_name.includes(search));
  if (filtered.length > 0) {
      setFilteredDishSearch(filtered.filter((dish, index) => calculateDistance(currentLocation, {lat: Number(dish.latitude), lng: Number(dish.longitude)}) <= 100))
  }
  // console.log(filtered, "Filtered");
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
},[count]);
useEffect(() => {
  fetch(`${API}/dishes/nearbyoptions`)
  .then((response) => response.json())
  .then(res => {
    console.log(res, "nearbyoptions");
      setNearByDishes(res.sort((a,b)=>b.
      avg_rating-a.avg_rating
      ))
      setAllNearByDishes(res.sort((a,b)=>b.
      avg_rating-a.avg_rating
      ))
      
  })
},[count]);
let entireList=allNearByDishes.filter(el=>el.dish_name.toLowerCase().includes(search.toLowerCase())||el.restaurant_name.toLowerCase().includes(search.toLowerCase()))

let highlyRatedDishes=nearByDishes.filter(el=>el.avg_rating>=4.5);

useEffect(() => {
  console.log(dishesLocations, "Dishes Locations");
},[dishesLocations]);

useEffect(() => {
  console.log(filteredDishSearch, "Filtered Dish Search");
},[filteredDishSearch]);

  
  return (search?
    <div className="home-main-container">

      {/* <h4>What are you going to eat today</h4> */}
      <SearchBar search={search} setSearch={setSearch}/>
      <h4 style={{display:'none'}} className="highly-rated-nearby-options">Highly rated nearby options</h4>
      <br />
      {entireList.map((item,index)=>{
        return(
         <Dish item={item} index={index}/>
        )
      })}

   

     
    </div>: <div className="home-main-container">

{/* <h4>What are you going to eat today</h4> */}
<SearchBar search={search} setSearch={setSearch}/>
<h4 className="highly-rated-nearby-options">Highly rated nearby options</h4>
{highlyRatedDishes.map((item,index)=>{
  return(
   <Dish item={item} index={index}/>
  )
})}




</div>
  );
}
