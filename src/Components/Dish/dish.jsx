import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { fetchAllDishRatingsByDishId } from "../../Services/ratings.services.js"
import { AuthContext } from "../../Context/AuthContext/AuthContext.jsx";

const API = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Dish({ item, index, setSearch }) {

  const { currentUser } = useContext(AuthContext);
  const  firebase_id = currentUser?.uid || null
  const [dishRatings, setDishRatings] = useState([]);
  const [dishAverageRating, setDishAverageRating] = useState(0);
  const [isRatedByUser, setIsRatedByUser] = useState(false);
  console.log('isRatedByUser', isRatedByUser)

  // get dish ratings by dish Id and calculate average rating
  async function getDishRatings(dish_id) {
    try {
      const dishRatings = await fetchAllDishRatingsByDishId(dish_id);
      // console.log(dishRatings, "Dish Ratings");
      setDishRatings(dishRatings)
      const averageRating = dishRatings.length > 0 ? dishRatings.reduce((a, b) => a + b.rating, 0) / dishRatings.length : +item.avg_rating
      setDishAverageRating(convertRating(averageRating))
    } catch (error) {
        throw error
    }
  }

  function convertRating(rating) {
    return Math.round((rating + Number.EPSILON) * 10) / 10
  }

  useEffect(() => {
    getDishRatings(item.dish_id)
  }, [])

  useEffect (() => {
    if (firebase_id) {
      const isRatedByUser = dishRatings.some(rating => rating.firebase_id === firebase_id)
      setIsRatedByUser(isRatedByUser)
    }
  }, [dishRatings])

  // distance calculation

  const [distance, setDistance] = useState(0);
  const [ currentLocation, setCurrentLocation ] = useState({
      lat: null,
      lng: null,
  });
  let lat1=currentLocation.lat;
  let lng1=currentLocation.lng;
  const haversineDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

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

const calculateDistance = () => {
  const distanceResult = haversineDistance(
      parseFloat(lat1),
      parseFloat(lng1),
      parseFloat(item.latitude),
      parseFloat(item.longitude)
  );
  setDistance(distanceResult*0.621371); //Convert to miles
};
  useEffect(() => {
    calculateDistance();
  }, [lat1, lng1, item.latitude]);


  function ratingDishes(number) {
    let string = " ";
    for (let i = 0; i < number; i++) {
      string += "🍽️ ";
    }
    return string;
  }
  let navigate = useNavigate();

  return (
    <div
      onClick={() => {
        setSearch('')
        navigate(`/dishes/${item.dish_id}`)
      }}
      className="nearbyoptions-container"
      key={index}
    >
      <div className={`nearbyoptions_item ${isRatedByUser ? "rated-by-user" : ""}`}>
        <img
          className="nearbyoptions_item_image"
          src={item.dish_image || "/emptydish.png"}
          alt=""
        />
        <div style={{display: "grid", gridTemplateRows: "33% 33% 33%", width: "100%", alignContent: "center", paddingTop: "10px"}}>
        <div>
            <div className="nearbyoptions_item_dish-name-container">
              <img className="nearbyoptions_icon" src="/dinner.svg" />
              <h5 className="nearbyoptions_item_dish-name">{item.dish_name.length>32?item.dish_name.slice(0,32)+'...':item.dish_name}</h5>
            </div>
          </div>
          <div className="nearbyoptions_item_infos">
            <div className="nearbyoptions_item_dish-restaurant-container">
              <img className="nearbyoptions_icon nearbyoptions_iconrestaurant"  src="/restaurant.svg" />
              <p className="nearbyoptions_item_restaurant-name">
                {item.restaurant_name}
              </p>
            </div>
          </div>

         

          <div>
            <div className="nearbyoptions_item_dish-rating-container">
              <img className="nearbyoptions_iconrating"  src="/cutlery.svg" />
              <h3  className="nearbyoptions_rating-content">{dishAverageRating}</h3>
              <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "right"}}>
                <img className="nearbyoptions_icon_distance"  src="distance.svg" />
                <h3  className="nearbyoptions_distance-content">{distance?distance.toString().slice(0,4):null} mi</h3>
              </div>
              <br />
              {/* <h3  className="nearbyoptions_distance-km">km</h3> */}
              {/* <h3 className='nearbyoptions_rating-content'>{dishAverageRating}</h3> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

