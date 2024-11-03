import "./DishCategoryFiltering/DishCategoryFilter.css";
import { useState, useEffect, useContext } from "react";
import { LocalAuthContext } from "../../Context/LocalAuth/LocalAuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../Context/StateContext.jsx";

// components
import SearchBar from "../../Components/SearchBar/SearchBar";
import DishCategoryFilter from "./DishCategoryFiltering/DishCategoryFilter.jsx";
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
  search,
  setSearch,
}) {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const {
    // dish results
    entireList, setEntireList
    , finalEntireList, setFinalEntireList
    // dish category filtering
    , dishCategoryFilters, setDishCategoryFilters
    , dishCategoryFilter, setDishCategoryFilter
    , handleDishCategoryfiltering
  } = useContext(StateContext);

  //CREATE A STATE TO FILTER THE ENTIRE LIST BASED ON THE PREFERENCES-------------------------------------------------------------------
  const [ preferenceListVegetarian, setPreferenceListVegetarian ] = useState([]);
  const [ preferenceListVegan, setPreferenceListVegan ] = useState([]);
  const [ preferenceListGlutenFree, setPreferenceListGlutenFree ] = useState([]);


  //USING LOCALSTORAGE TO GET THE PREFERENCES---------------------------------------------------------------------------------------------
  useEffect(() => {
    const savedPreference = localStorage.getItem("vegetarian");
    if (savedPreference === "false") {
      setVegetarian(false);
    } else if (savedPreference === "true") {
      setVegetarian(true);
    }
  }, []);

  useEffect(() => {
    const savedPreference = localStorage.getItem("vegan");
    if (savedPreference === "false") {
      setVegan(false);
    } else if (savedPreference === "true") {
      setVegan(true);
    }
  }, []);

  useEffect(() => {
    const savedPreference = localStorage.getItem("glutenFree");
    if (savedPreference === "false") {
      setGlutenFree(false);
    } else if (savedPreference === "true") {
      setGlutenFree(true);
    }
  }, []);  

  //---------------------------------------------------------------------------------------------------------------------------

  // context
  const { isLocalLoggedIn, localUser, localLogin, localLogout, localAuthTest } =
    useContext(LocalAuthContext);

  const [ dishesLocations, setDishesLocations ] = useState([]);
  const [ nearByDishes, setNearByDishes ] = useState([]);
  const [ allNearByDishes, setAllNearByDishes ] = useState([]);
  const [ locationsInRadius, setLocationsInRadius ] = useState([]);
  const [ filteredDishSearch, setFilteredDishSearch ] = useState([]);
  // const [ entireList, setEntireList ] = useState([]);
  // const [ finalEntireList, setFinalEntireList ] = useState([]);
  const [ listPerCuisine, setListPerCuisine ] = useState([]);
  const [ uniqueListPerCuisine, setUniqueListPerCuisine ] = useState([]);
  const [ cuisineIcons, setCuisineIcons ] = useState([]);
  const [ cuisine, setCuisine ] = useState('');
  const [ finalCuisineFilterList, setFinalCuisineFilterList ] = useState([]);
  const [ clicked, setClicked ] = useState("");

  const [ restaurantResults, setRestaurantResults ] = useState([]);

  const [ currentLocation, setCurrentLocation ] = useState({
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
    // get unique dish names from search
    const uniqueDishNames = [...new Set([...finalEntireList.filter((dish) => 
      dish.dish_name.toLowerCase()
        .includes(search.toLowerCase()))])
        .keys()
        .map((dish) => dish.dish_name)]
    // sort unique dish names
    if(uniqueDishNames) uniqueDishNames.sort((a, b) => a.localeCompare(b));
    console.log(uniqueDishNames)
    setDishCategoryFilters(uniqueDishNames);

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
    fetch(`${API}/dishes/locations`)
      .then((response) => response.json())
      .then((res) => {
        // console.log(res, "nearbyoptions");
        setNearByDishes(res.sort((a, b) => b.avg_rating - a.avg_rating));
        setAllNearByDishes(res.sort((a, b) => b.avg_rating - a.avg_rating));
      });
  }, [count,search]);

  useEffect(() => {
    fetch(`${API}/dishes/nearbyoptions`)
    .then((response) => response.json())
    .then((res) => {
      setListPerCuisine(res.sort((a, b) => b.avg_rating - a.avg_rating));
    });
  }, [])

  useEffect(() => {
    // console.log(listPerCuisine, "listPerCuisine");
  }, [listPerCuisine])

  useEffect(() => {
    const cuisines = listPerCuisine.map((dish) => dish.cuisine_name);
    setCuisineIcons([...cuisines]);
    // setCuisineIcons(cuisineIcons.filter((cuisine, index) => cuisineIcons.indexOf(cuisine) === index));
  }, [entireList]);

  useEffect(() => {
    setUniqueListPerCuisine(cuisineIcons.filter((cuisine, index) => cuisineIcons.indexOf(cuisine) === index));
  }, [cuisineIcons]);

  useEffect(() => {
    // console.log(cuisineIcons, "cuisineIcons Array Line 188");
  }, [cuisineIcons]);

  useEffect(() => {
    // console.log(uniqueListPerCuisine, "uniqueListPerCuisine");
  }, [uniqueListPerCuisine]);

  //USING LOCALSTORAGE PREFERENCES TO FILTER THE LIST FIRST--------------------------------------------------------------------------------

  useEffect(() => {
    // console.log(allNearByDishes, "allNearByDishes Line 202");
  }, [allNearByDishes]);

  useEffect(() => {
    if (vegetarian) {
      setPreferenceListVegetarian(allNearByDishes.filter((dish) => dish.is_vegetarian === true));
    } else {
      setPreferenceListVegetarian(allNearByDishes);
    }
  }, [allNearByDishes,vegetarian]);

  useEffect(() => {
    // console.log(preferenceListVegetarian, "preferenceListVegetarian Line 209");
  }, [preferenceListVegetarian]);

  useEffect(() => {
    if (vegan) {
      setPreferenceListVegan(preferenceListVegetarian.filter((dish) => dish.is_vegan === true));
    } else {
      setPreferenceListVegan(preferenceListVegetarian);
    }
  }, [preferenceListVegetarian]);

  useEffect(() => {
    if (glutenFree) {
      setPreferenceListGlutenFree(preferenceListVegan.filter((dish) => dish.is_gluten_free === true));
    } else {
      setPreferenceListGlutenFree(preferenceListVegan);
    }
  }, [glutenFree, preferenceListVegan]);


  //---------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    // console.log(vegetarian, "Vegetarian value on nearby options page")
  }, [vegetarian]);

  useEffect(() => {
    setEntireList(preferenceListGlutenFree.filter((el) => el.dish_name.toLowerCase().includes(search.toLowerCase()) || el.restaurant_name.toLowerCase().includes(search.toLowerCase())));
  }, [preferenceListGlutenFree, vegetarian, vegan, glutenFree]);
 
  //---------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    // console.log(entireList, "Entire List line 194")
  }, [entireList])

  useEffect(() => {
    setFinalEntireList(entireList.filter((el) => el.avg_rating >= 0));
  }, [entireList]);
  

  //CUISINE FILTER LIST----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setFinalCuisineFilterList(listPerCuisine.filter(dish => dish.cuisine_name === cuisine));
  }, [cuisine])

  useEffect(() => {
    // console.log(listPerCuisine, "Final Entire List line 252");
  }, [cuisine])

  useEffect(() => {
    // console.log(finalCuisineFilterList, "Final Cuisine Filter List line 252");
  }, [finalCuisineFilterList])

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
    // console.log(cuisine, "Cuisine state line 269");
  }, [cuisine])

  useEffect(() => {
    // console.log(dishesLocations, "Dishes Locations");
  }, [dishesLocations]);

  useEffect(() => {
    // console.log(filteredDishSearch, "Filtered Dish Search");
  }, [filteredDishSearch]);

  useEffect(() => {
    // console.log(search, "Nearby Options Search")
  }, [search]);

  return (
    <div className="home-main-container">
      {/* search bar */}
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

      {/* if searching dont show cuisine filters */}
      {search ?
        null :
        <div className="homepage_filterpercuisine">
          {uniqueListPerCuisine.map((dish) => (
            <div className="homepage_filterpercuisine_item">
              <img
                className={`homepage_filterpercuisine_item_image ${clicked === dish ? "active" : ""}`}
                src={`/${dish}.svg`}
                onClick={()=>{
                  setCuisine(dish)
                  setClicked(dish)
                }}
              ></img>
              <h5 className="homepage_filterpercuisine_item_name">{dish}</h5>
            </div>
          ))}
        </div>
      }

      {/* Dish category filters */}
      {search ? <DishCategoryFilter /> : null}

      {/* change header based on search */}
      <h4 
        // style={search ? { display: "none" } : null} 
        className="highly-rated-nearby-options">
          {search ? "Dish Results" : "Highly Rated Nearby"}
      </h4>
      
      {/* show entire list or cuisine filtered list */}
      {search ?
        <div>
          {finalEntireList.map((item, index) => (
            <Dish item={item} index={index} key={item.dish_id} />
          ))} 
        </div> :
        <div>
          {cuisine ?
            finalCuisineFilterList.map((item, index) => {
              return <Dish item={item} index={index} key={item.dish_id} />;
            }) :
            finalEntireList.map((item, index) => {
              return <Dish item={item} index={index} key={item.dish_id} />;
            })
          }
        </div> 
      }
    </div>
  )
}
