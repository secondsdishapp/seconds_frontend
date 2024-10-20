import { useState, useEffect, useContext } from "react";
import { LocalAuthContext } from "../../Context/LocalAuth/LocalAuthContext.jsx";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Dish from "../Dish/dish";

const API = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function NearByOptions({count, menuToggle}) {
  // context
  const {
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);

  const [ dishesLocations, setDishesLocations ] = useState([]);
  const [ nearByDishes, setNearByDishes ] = useState([]);
  const [ allNearByDishes, setAllNearByDishes ] = useState([]);
  const [ locationsInRadius, setLocationsInRadius ] = useState([]);
  const [ search, setSearch ] = useState("");
  const [ filteredDishSearch, setFilteredDishSearch ] = useState([]);

  const [ currentLocation, setCurrentLocation ] = useState({
    lat: null,
    lng: null,
  });

  // get nearby options
  useEffect(() => {
    fetch(`${API}/dishes/nearbyoptions`)
    .then((response) => response.json())
    .then(res => {
      // console.log(res, "nearbyoptions");
        setNearByDishes(res.sort((a,b)=>b.
        avg_rating-a.avg_rating
        ))
        setAllNearByDishes(res.sort((a,b)=>b.
        avg_rating-a.avg_rating
        ))
    })
  }, [count]);

  // get dish locations
  useEffect(() => {
    fetch(`${API}/dishes/locations`)
    .then((response) => response.json())
    .then(res => {
        setDishesLocations(res)
    })
  }, [count]);

  // get current location
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
  }, []);

  // helper function to calculate distance
  function calculateDistance(point1, point2) {
    const earthRadiusMiles = 3959;
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
      Math.cos(point1.lat * Math.PI / 180) * 
      Math.cos(point2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusMiles * c;
  }

  // get dish locations within radius
  useEffect(() => {
    // console.log(count, "Count");
    if (currentLocation) {
      setLocationsInRadius(dishesLocations.filter((dish, index) => 
        calculateDistance(currentLocation, {lat: Number(dish.latitude), lng: Number(dish.longitude)}) <= 4));
    }
    // console.log(locationsInRadius, "Locations bad");
  }, [currentLocation,count]);

  // filter dish locations by search
  useEffect(() => {
    const filtered = dishesLocations.filter((dish, index) => 
      dish.dish_name.includes(search) || dish.restaurant_name.includes(search));
    
    if (filtered.length > 0) {
      setFilteredDishSearch(filtered.filter((dish, index) => 
        calculateDistance(currentLocation, {lat: Number(dish.latitude), lng: Number(dish.longitude)}) <= 100))
    }
    // console.log(filtered, "Filtered");
  }, [search])  

  // filter dishes by search
  let entireList =
    allNearByDishes.filter( el => 
      el.dish_name.toLowerCase().includes(search.toLowerCase()) || 
      el.restaurant_name.toLowerCase().includes(search.toLowerCase())
    )
  
  // filter dishes by rating
  let highlyRatedDishes = nearByDishes.filter(el => el.avg_rating >= 4.5);

  // console logs on state updates
  useEffect(() => {
    // console.log(dishesLocations, "Dishes Locations");
  },[dishesLocations]);

  useEffect(() => {
    // console.log(locationsInRadius, "Locations good");
  },[locationsInRadius]);

  useEffect(() => {
    // console.log(filteredDishSearch, "Filtered Dish Search");
  },[filteredDishSearch]);

  return (
    <div className="home-main-container">
      <SearchBar search={search} setSearch={setSearch}/>
      <h4 style={{display:'none'}} className="highly-rated-nearby-options">Highly rated nearby options</h4>
      <br />
      {search ?
        entireList.map((item,index) => (
          <Dish item={item} index={index} key={item.dish_id}/>
        )) :
        highlyRatedDishes.map((item,index) => (
          <Dish item={item} index={index} key={item.dish_id}/>
        ))
      }
    </div>
  );
}
