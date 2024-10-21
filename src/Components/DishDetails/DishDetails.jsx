import { useState, useEffect, useContext } from 'react'
import { LocalAuthContext } from "../../Context/LocalAuth/LocalAuthContext.jsx";
import { AuthContext } from "../../Context/FirebaseAuth/AuthContext.jsx";
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  fetchAllDishRatingsByDishId
  ,fetchDishRatingByUserId
  ,updateDishRatingByUserId
  ,createDishRating
} from '../../Services/ratings.services.js'

const API = import.meta.env.VITE_API_URL;
const plateImages = [
  "https://t3.ftcdn.net/jpg/03/06/75/66/360_F_306756617_moZMl2JAPW5rwxj8TBggViHvKtX1QDK2.jpg",
  "https://www.shutterstock.com/image-vector/hands-holding-fork-spoon-empty-260nw-1292484178.jpg",
];

export default function DishDetails() {
  // configs
  let navigate = useNavigate()
  const {
    currentUser,
    signUpWithEmail,
    loginWithEmail,
    logout,
    resetPassword,
  } = useContext(AuthContext);

  console.log(currentUser)

  const [previousRating, setPreviousRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [sameRating, setSameRating] = useState(false);
  const [dish, setDish] = useState({ 'dish_name': '', 'dish_image': '', 'avg_rating': 1, 'restaurant_name': '','latitude':'','longitude':''})
  const [dishRatings, setDishRatings] = useState([]);
  const [dishAverageRating, setDishAverageRating] = useState(0);

  // get user id
  const  uid  = currentUser?.uid
  // get dish id
  let { id } = useParams()
  
  function ratingDishes(number){
    let string = ' '
    for(let i = 1; i <= number; i++) {
      string += '🍽️ '
    }
    return string
  }
  
  // get dish details
  useEffect(() => {
    fetch(`${API}/dishes/${id}`)
      .then((res) => {
        return res.json()
      })
      .then(resJSON => {
        setDish(resJSON)
        // console.log(dish)
      })
      .catch(() => {
        navigate("/notfound")
      })
  }, [id, navigate])

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
    getDishRatings(id)
  }, [previousRating])

  // get dish user rating
  async function setDishUserRating(dish_id, firebase_id) {
    if (!currentUser) return

    try {
      const dishUserRating = await fetchDishRatingByUserId(dish_id, firebase_id)
      if (dishUserRating.rating_id) {
        setPreviousRating(dishUserRating.rating)
        setHoverRating(dishUserRating.rating)
      }
    } catch (error) {
        throw error
    }
  }

  useEffect(() => {
    if (!currentUser?.uid) return
    console.log('should not see this')
    console.log(currentUser)
    setDishUserRating(id, uid)
  }, [])

  // update dish rating
  const updatedRating = {
    dish_id: id,
    firebase_id: uid,
    hoverRating,
    comment: 'test comment'
  }

  // set if hover rating is the same as previous rating
  useEffect(() => {
    if (hoverRating === previousRating && previousRating !== 0) {
      setSameRating(true)
    } else {
      setSameRating(false)
    }
  }, [hoverRating])

  // helper function to update dish rating
  async function updateDishRating(updatedRating) {
    if (!currentUser) return

    if (sameRating) {
      setTimeout(() => {
        alert('Same rating, no update')
      }, 500)
      return null
    }
    
    const { dish_id, firebase_id, hoverRating, comment } = updatedRating
    try {
      const dishUserRating = await updateDishRatingByUserId(dish_id, firebase_id, hoverRating, comment)
      setHoverRating(dishUserRating.rating)
      setPreviousRating(dishUserRating.rating)
      setTimeout(() => {
        alert('Your rating has been updated!')
      }, 500)
    } catch (error) {
        throw error
    }
  }

  function handleUpdateDishRating(id, firebase_id, hoverRating) {
    updateDishRating(id, firebase_id, hoverRating)
  }

  // create dish rating
  async function handleCreateDishRating({dish_id, firebase_id, hoverRating, comment}) {

    if (!currentUser ) {
      alert('Log in or Create an Account to rate this dish!')
      return null
    }

    if (previousRating === hoverRating) {
      alert('Dish already rated!')
      return null
    } 

    try {
      const newDishUserRating = await createDishRating(dish_id, firebase_id, hoverRating, comment)
      setPreviousRating(newDishUserRating.rating)
      setHoverRating(newDishUserRating.rating)
      setTimeout(() => {
        alert('Your rating has been created!')
      }, 500)
    } catch (error) {
        throw error
    }
  }

  return (
    <div className='dish-details-container'>
      <h3 className='dish-details_dish-name'>{dish.name}</h3>
      <img className="dish-details_dish-image" src={dish.dish_image} alt="" />
      <h3 className='dish-details_rating-title'>Rating:</h3>
      <h3 className='dish-details_rating-content'>{`${dishAverageRating} ${ratingDishes(dishAverageRating)} (+${dishRatings.length})`}</h3>
      
      <div className='dish-details_restaurant-info'>
        <h3 className='dish-details_restaurant-name'>{dish.restaurantname}</h3>
        <div className='dish-details_restaurant-buttons'>
          <button className='dish-details_restaurant-buttons_call'>Call</button>
          <button className='dish-details_restaurant-buttons_directions'>Directions</button>
        </div>
      </div>
    
      <div className="rating-container">  
        <h3 className='dish-details_ask-for-rating'>
          {previousRating ?
            "Thank you for rating this dish!"
            :
            "Did you try this dish? Please rate it from 1 to 5 !"
          }
        </h3>
        <div className="dish-details_plate-rating">
          {[1, 2, 3, 4, 5].map((rating, index) => (
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
              key={index}
            />
          ))}
        </div>
      </div>
      {previousRating ?
        <button className='dish-details-rating-button'
          onClick={() => handleUpdateDishRating(updatedRating)}
          disabled={sameRating}
        > Update Rating </button>
        :
        <button className='dish-details-rating-button'
          onClick={() =>
            handleCreateDishRating(updatedRating)}
        > Rate Dish </button> 
        }
    </div>
  )
}