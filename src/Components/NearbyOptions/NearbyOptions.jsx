import { useState, useEffect, useContext } from "react";
import { LocalAuthContext } from "../../Context/LocalAuth/LocalAuthContext.jsx";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Dish from "../Dish/dish";

export default function NearByOptions({
  count,
  menuToggle,
  vegetarian,
  setVegetarian,
  vegan,
  setVegan,
  glutenFree,
  setGlutenFree,
  cuisine,
  setCuisine
}) {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  // context
  const { isLocalLoggedIn, localUser, localLogin, localLogout, localAuthTest } =
    useContext(LocalAuthContext);

  const [dishesLocations, setDishesLocations] = useState([]);
  const [nearByDishes, setNearByDishes] = useState([]);
  const [allNearByDishes, setAllNearByDishes] = useState([]);
  const [locationsInRadius, setLocationsInRadius] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDishSearch, setFilteredDishSearch] = useState([]);
  const [cuisine1, setCuisine1] = useState('');

  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    // console.log(locationsInRadius, "Locations good");
  }, [locationsInRadius]);

  function calculateDistance(point1, point2) {
    const earthRadiusMiles = 3959;
    const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
    const dLon = ((point2.lng - point1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((point1.lat * Math.PI) / 180) *
        Math.cos((point2.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusMiles * c;
  }

  useEffect(() => {
    // console.log(count, "Count");
    if (currentLocation) {
      setLocationsInRadius(
        dishesLocations.filter(
          (dish, index) =>
            calculateDistance(currentLocation, {
              lat: Number(dish.latitude),
              lng: Number(dish.longitude),
            }) <= 4
        )
      );
    }
    // console.log(locationsInRadius, "Locations bad");
  }, [currentLocation, count]);

  useEffect(() => {
    const filtered = dishesLocations.filter(
      (dish, index) =>
        dish.dish_name.includes(search) || dish.restaurant_name.includes(search)
    );
    if (filtered.length > 0) {
      setFilteredDishSearch(
        filtered.filter(
          (dish, index) =>
            calculateDistance(currentLocation, {
              lat: Number(dish.latitude),
              lng: Number(dish.longitude),
            }) <= 100
        )
      );
    }
    // console.log(filtered, "Filtered");
  }, [search]);

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

  useEffect(() => {
    fetch(`${API}/dishes/locations`)
      .then((response) => response.json())
      .then((res) => {
        setDishesLocations(res);
      });
  }, [count]);

  useEffect(() => {
    fetch(`${API}/dishes/nearbyoptions`)
      .then((response) => response.json())
      .then((res) => {
        // console.log(res, "nearbyoptions");
        setNearByDishes(res.sort((a, b) => b.avg_rating - a.avg_rating));
        setAllNearByDishes(res.sort((a, b) => b.avg_rating - a.avg_rating));
      });
    console.log(highlyRatedDishes);
  }, [count,search]);

  let entireList = allNearByDishes.filter(
    (el) =>
      el.dish_name.toLowerCase().includes(search.toLowerCase()) ||
      el.restaurant_name.toLowerCase().includes(search.toLowerCase())
    );
    let highlyRatedDishes = nearByDishes.filter((el) => el.avg_rating >= 3.5);
  let objectOfEntireList = {};
  let filterEntireListPerCuisine = [];
  for (let element of entireList) {
    if (!objectOfEntireList[element.cuisine_name]) {
      filterEntireListPerCuisine.push(element);
    }
    objectOfEntireList[element.cuisine_name] = 1;
  }
  let objectOfRecommendedList = {};
  let filterRecommendedListPerCuisine = [];
  for (let element of highlyRatedDishes) {
    if (!objectOfRecommendedList[element.cuisine_name]) {
      filterRecommendedListPerCuisine.push(element);
    }
    objectOfRecommendedList[element.cuisine_name] = 1;
  }


  useEffect(() => {
    // console.log(dishesLocations, "Dishes Locations");
  }, [dishesLocations]);

  useEffect(() => {
    // console.log(filteredDishSearch, "Filtered Dish Search");
  }, [filteredDishSearch]);

  useEffect(() => {
    const savedPreference = localStorage.getItem("vegetarian");
    if (savedPreference !== null) {
      setVegetarian(Boolean(savedPreference));
    }
  }, []);

  useEffect(() => {
    const savedPreference = localStorage.getItem("vegan");
    if (savedPreference !== null) {
      setVegan(Boolean(savedPreference));
    }
  }, []);

  useEffect(() => {
    const savedPreference = localStorage.getItem("glutenFree");
    if (savedPreference !== null) {
      setGlutenFree(Boolean(savedPreference));
    }
  }, []);

  useEffect(() => {
    if (vegetarian) {
      entireList.filter((item, index) => item.vegetarian === true);
    }
  }, [vegetarian]);

  return search ?
  
   (
    <div className="home-main-container">
      <div className="searchbar-map-container">
        <SearchBar
          search={search}
          setSearch={setSearch}
          vegetarian={vegetarian}
          vegan={vegan}
          glutenFree={glutenFree}
          setCuisine={setCuisine}
        />
        <img
          className="map-icon"
          src="/map.svg"
          onClick={() => navigate("/map")}
        />
      </div>
      <div className="homepage_filterpercuisine">
        {filterEntireListPerCuisine.map((dish) => (
          <div className="homepage_filterpercuisine_item">
            <img
              className="homepage_filterpercuisine_item_image"
              src={dish.dish_image}
              onClick={()=>{
                setCuisine1(dish.cuisine_name)
                console.log(cuisine1)
                
                }}
            ></img>
            <p className="homepage_filterpercuisine_item_name">{dish.cuisine_name}</p>
          </div>
        ))}
      </div>
      <h4 style={{ display: "none" }} className="highly-rated-nearby-options">
        Highly rated nearby options
      </h4>
      <br />

  
      {entireList.map((item, index) => {
        return <Dish item={item} index={index} key={item.dish_id} />;
      })}
    </div>
  ) : (
    <div className="home-main-container">
      <div className="searchbar-map-container">
        <SearchBar set search={search} setSearch={setSearch} />
        <img
          className="map-icon"
          src="/map.svg"
          onClick={() => navigate("/map")}
        />
      </div>
      <div className="homepage_filterpercuisine">
        {filterRecommendedListPerCuisine.map((dish) => (
          <div className="homepage_filterpercuisine_item">
            <img
              className="homepage_filterpercuisine_item_image"
              src={dish.dish_image}
              onClick={()=>{
                setCuisine(dish.cuisine_name)
                
                }}
            ></img>
            <h5 className="homepage_filterpercuisine_item_name">{dish.cuisine_name}</h5>
          </div>
        ))}
      </div>

      <h4 className="highly-rated-nearby-options">
        Highly rated nearby options
      </h4>
      {cuisine?highlyRatedDishes.filter(el=>el.cuisine_name===cuisine).map((item, index) => {
        return <Dish item={item} index={index} key={item.dish_id} />;
      }):highlyRatedDishes.map((item, index) => {
        return <Dish item={item} index={index} key={item.dish_id} />;
      })}
    </div>
  );
}
