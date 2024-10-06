import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
const API = import.meta.env.VITE_API_URL;
const plateImages = [
  "https://t3.ftcdn.net/jpg/03/06/75/66/360_F_306756617_moZMl2JAPW5rwxj8TBggViHvKtX1QDK2.jpg",
  "https://www.shutterstock.com/image-vector/hands-holding-fork-spoon-empty-260nw-1292484178.jpg",
];

export default function DishDetails() {
  const [hoverRating, setHoverRating] = useState(0);
  const [dish, setDish] = useState({ 'dish_name': '', 'dish_image': '', 'avg_rating': 1, 'restaurant_name': '','latitude':'','longitude':''})

  // get user id
  const [user, setUser] = useState({})
  
  let navigate = useNavigate()
  let { id } = useParams()
  
  function ratingDishes(number){
    let string = ' '
    for(let i = 1; i <= number; i++) {
      string += '🍽️ '
    }
    return string
  }
      
  useEffect(() => {
    console.log(id)
    fetch(`${API}/dishes/${id}`)
      .then((res) => {
        return res.json()
      })
      .then(resJSON => {
        setDish(resJSON)
        console.log(dish)
      })
      .catch(() => {
        navigate("/notfound")
      })

  }, [id, navigate])
  //{dish_id: 1, dish_name: 'Margherita Pizza', dish_image: 'https://cookieandkate.com/images/2021/07/margherita-pizza-recipe-1-2.jpg', avg_rating: '4.50', restaurant_name: 'Joes Pizza', …}
  return (
    <div className='dish-details-container'>
      <h3 className='dish-details_dish-name'>{dish.name}</h3>
      <img className="dish-details_dish-image" src={dish.dish_image} alt="" />
      <h3 className='dish-details_rating-title'>Rating:</h3>
      <h3 className='dish-details_rating-content'>{ratingDishes(dish.avg_rating)}</h3>
      
      <div className='dish-details_restaurant-info'>
        <h3 className='dish-details_restaurant-name'>{dish.restaurantname}</h3>
        <div className='dish-details_restaurant-buttons'>
          <button className='dish-details_restaurant-buttons_call'>Call</button>
          <button className='dish-details_restaurant-buttons_directions'>Directions</button>
        </div>
      </div>
    
      <div className="rating-container">  
        <h3 className='dish-details_ask-for-rating'>"Did you try this dish? Please rate it from 1 to 5 !"</h3>
        <div className="dish-details_plate-rating">
          {[1, 2, 3, 4, 5].map((rating) => (
            <img
              src={
                rating <= (hoverRating || dish.rating)
                ? plateImages[1]
                : plateImages[0]
              }
              alt={`Plate ${rating}`}
              onMouseEnter={() => setHoverRating(rating)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
      <button className='dish-details-rating-button'>Rate Dish</button>
    </div>
  )
}