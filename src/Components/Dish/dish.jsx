import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchAllDishRatingsByDishId } from "../../Services/ratings.services.js"

const API = import.meta.env.VITE_API_URL;

export default function Dish({item,index}) {
  // config 
  let navigate = useNavigate()

  // states
  const [dishRatings, setDishRatings] = useState([]);
  const [dishAverageRating, setDishAverageRating] = useState(0);

  // get dish ratings by dish Id and calculate average rating
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
    getDishRatings(item.dish_id)
  }, [])
  
  // convert rating to emojis
  function ratingDishes(number){
    let string=' '
    for(let i=0;i<number;i++){
      string+='🍽️ '
    }
    return string
  }

  return (
    <div 
      onClick={()=>navigate(`/dishes/${item.dish_id}`)} className="nearbyoptions-container" key={index}
    >
      <div className="nearbyoptions_item">
      <img className="nearbyoptions_item_image" src={item.dish_image} alt="" />
        <div className="nearbyoptions_item_name&restaurant">
          <p className="nearbyoptions_item_dish-name_title">Dish Name:</p>
          <h5 className="nearbyoptions_item_dish-name" >{item.dish_name}</h5>
          <p className="nearbyoptions_item_restaurant-name_title">Restaurant Name:</p>
          <p className="nearbyoptions_item_restaurant-name">{item.restaurant_name}</p>
          <p className="nearbyoptions_item_rating_title">Rating:</p>
          <h3 className='nearbyoptions_rating-content'>{dishAverageRating}</h3>
        </div>
      </div>
    </div>
  )
}