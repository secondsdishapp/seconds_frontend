import { useState, useEffect } from 'react'
import { fetchAllDishRatingsByDishId } from '../../Services/ratings.services.js';
import { useNavigate } from 'react-router-dom';
import "./SlidingCarousel.css"

const API = import.meta.env.VITE_API_URL;

export default function CarouselCard({
  dish
  ,index
  ,slide
  ,length
}) {

  const navigate = useNavigate();
  const [dishRatings, setDishRatings] = useState([]);
  const [dishAverageRating, setDishAverageRating] = useState(0);

  async function getDishRatings(dish_id) {
    try {
      const dishRatings = await fetchAllDishRatingsByDishId(dish_id)
      setDishRatings(dishRatings)
      const averageRating = dishRatings.length > 0 ? dishRatings.reduce((a, b) => a + b.rating, 0) / dishRatings.length : 0
      setDishAverageRating(convertRating(averageRating))
    } catch (error) {
        throw error
    }
  }

  function convertRating(rating) {
    return Math.round((rating + Number.EPSILON) * 10) / 10
  }

  useEffect(() => {
    getDishRatings(dish.dish_id)
  }, [])

  function dishRating(rating) {
    let arrRating = rating.split(".");
    let firstIndex = arrRating[0];
    let ratingIcons = [];

    for (let i = 1; i <= firstIndex; i++) {
        ratingIcons.push("full");
    }

    if  (Number(arrRating[1]) !== 0) {
        if (Number(arrRating[1]) <= 50) {
            ratingIcons.push("half")
        } else if (Number(arrRating[1]) > 50) {
            ratingIcons.push("full")
        }
    }
    return ratingIcons;
}

  return (
    <div key={index} className={slide === index ? "single-card" : "single-card hidden"} onClick={() => navigate(`/dishes/${dish.dish_id}`)}>
          <div style={{display: "flex", marginLeft: "0%", alignItems: "center", width: "100%", gap: "0%"}}>
              {dishRating(dish.avg_rating).map((elem, index) => elem === "full" ?
                <img className="rate-icon" src="/seconds-plate-orange-circle.png"/>
                : <img className="rate-icon" src="/secondsIconHalf.png"/>)
              }
          </div>
          <img className="dish-image" src={dish.dish_image} onClick={(e) => e.preventDefault()}/>
          <div className="type-icon-rating-container" >
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "40px"}}>
                {dish.vegetarian ? <img className="food-type-icon" src="/vegan.svg"/> : null} 
                {dish.gluten_free ? <img className="food-type-icon2" src="/gluten-free.svg"/> : null}
            </div>
          </div>
          <div className="rest-icon-name-container">
            <img className="rest-icon" src="/dinner.svg" /> 
            <p className="title-restaurant">"{dish.dish_name}"</p>
          </div>
          <div className="rest-icon-name-container">
            <img className="rest-icon" src="/restaurant.svg" />
            <p className="title-restaurant">{dish.restaurant_name}</p>  
          </div>
          <p style={{textAlign:"center", fontFamily:"Nunito", fontWeight:"600",color:"#FF5252"}}>{index+1}/{length}</p>
    </div>
  )
}