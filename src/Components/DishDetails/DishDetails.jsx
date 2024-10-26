import { useState, useEffect, useContext } from 'react'
import { LocalAuthContext } from "../../Context/LocalAuth/LocalAuthContext.jsx";
import { AuthContext } from "../../Context/AuthContext/AuthContext.jsx";
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  fetchAllDishRatingsByDishId
  ,fetchDishRatingByUserId
  ,updateDishRatingByUserId
  ,createDishRating
  ,fetchDishRatingByFirebaseId
  ,updateDishRatingByFirebaseId
} from '../../Services/ratings.services.js'

const API = import.meta.env.VITE_API_URL;
const plateImages = [
  "https://t3.ftcdn.net/jpg/03/06/75/66/360_F_306756617_moZMl2JAPW5rwxj8TBggViHvKtX1QDK2.jpg",
  "https://www.shutterstock.com/image-vector/hands-holding-fork-spoon-empty-260nw-1292484178.jpg",
];

export default function DishDetails() {

  const phoneNumber = "+16463745482";

  // context
  const {
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);

  const { currentUser } = useContext(AuthContext);

  const [previousRating, setPreviousRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [dish, setDish] = useState({ 'dish_name': '', 'dish_image': '', 'avg_rating': 1, 'restaurant_name': '','latitude':'','longitude':''})
  const [dishRatings, setDishRatings] = useState([]);
  const [dishAverageRating, setDishAverageRating] = useState(0);

  // get user id
  const user_id = localUser.user_id
  const firebase_id = currentUser?.uid || null
  
  let navigate = useNavigate()
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
    fetch(`${API}/dishes/${id}/location`)
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
      const fetchedDishRatings = await fetchAllDishRatingsByDishId(dish_id)
      setDishRatings(fetchedDishRatings)
      const averageRating = fetchedDishRatings.length > 0 ? fetchedDishRatings.reduce((a, b) => a + b.rating, 0) / fetchedDishRatings.length : 0
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
    if (currentUser) {
      try {
        const dishUserRating = await fetchDishRatingByFirebaseId(dish_id, firebase_id)
        if (dishUserRating?.rating_id) {
          setPreviousRating(dishUserRating.rating)
          setHoverRating(dishUserRating.rating)
        } else {
          setPreviousRating(0)
        }
      } catch (error) {
          throw error
      }

    } else if (isLocalLoggedIn) {
        try {
          const dishUserRating = await fetchDishRatingByUserId(dish_id, user_id)
          if (dishUserRating.rating_id) {
            setPreviousRating(dishUserRating.rating)
            setHoverRating(dishUserRating.rating)
          }
        } catch (error) {
            throw error
        }
    }
  }

  useEffect(() => {
    if (currentUser) {
      setDishUserRating(id, firebase_id)

    } else if (isLocalLoggedIn) {
      setDishUserRating(id, user_id)
    }

  }, [])

  // update dish rating
  const updatedRating = {
    dish_id: id,
    firebase_id,
    user_id,
    hoverRating,
    comment: 'test comment'
  }

  async function updateDishRating(updatedRating) {
    console.log(updatedRating)
    if (currentUser) {
      const { dish_id, firebase_id, hoverRating, comment } = updatedRating
        try {
          const dishUserRating = await updateDishRatingByFirebaseId(dish_id, firebase_id, hoverRating, comment)
          console.log(dishUserRating)
          if (dishUserRating.rating_id) {
            setHoverRating(dishUserRating.rating)
            setPreviousRating(dishUserRating.rating)
            setTimeout(() => {
              alert('Your rating has been updated!')
            }, 500)
          }
        } catch (error) {
            throw error
        }
    } else if (isLocalLoggedIn) {
        const { dish_id, user_id, hoverRating, comment } = updatedRating
        try {
          const dishUserRating = await updateDishRatingByUserId(dish_id, user_id, hoverRating, comment)
          console.log(dishUserRating)
          if (dishUserRating.rating_id) {
            setHoverRating(dishUserRating.rating)
            setPreviousRating(dishUserRating.rating)
            setTimeout(() => {
              alert('Your rating has been updated!')
            }, 500)
          }
        } catch (error) {
            throw error
        }
    }
  }

  function handleUpdateDishRating(id, user_id, firebase_id, hoverRating) {
    if (currentUser) {
      if (previousRating === hoverRating) {
        alert('Same rating, no update')
      } else {
          updateDishRating(id, firebase_id, hoverRating)
      }
    } else if (isLocalLoggedIn) {
      if (previousRating === hoverRating) {
        alert('Same rating, no update')
      } else {
          updateDishRating(id, user_id, hoverRating)
      }
    }
  }

  // create dish rating
  async function handleCreateDishRating({dish_id, user_id, hoverRating, comment}) {
    if (currentUser) {
    
    } else if (isLocalLoggedIn) {
      if (previousRating === hoverRating) {
        alert('Dish already rated!')
      } else {
          try {
            const newDishUserRating = await createDishRating(dish_id, user_id, hoverRating, comment)
            console.log("newDishUserRating", newDishUserRating)
              setPreviousRating(newDishUserRating.rating)
              setHoverRating(newDishUserRating.rating)
              setTimeout(() => {
                alert('Your rating has been created!')
              }, 500)
          } catch (error) {
              throw error
          }
      }
    }
  }

  function getDirections () {
    const restaurantAdress = `${dish.address}, ${dish.city}, ${dish.state} ${dish.zipcode}`;
    const encodedAddress = encodeURIComponent(restaurantAdress);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  }

  return (
    <div className='dish-details-container'>
      <h3 className='dish-details_dish-name'>{dish.dish_name}</h3>
      <img className="dish-details_dish-image" src={dish.dish_image} alt="" />
      {/* <h1 className='dish-details_rating-title'>Rating: {`${dishAverageRating}`}</h1> */}
      <h3 className='dish-details_rating-content'>{`${dishAverageRating} ${ratingDishes(dishAverageRating)}`}</h3>
      <h3 className='dish-details_rating-length'>{`Reviews (${dishRatings.length})`}</h3>
      
      <div className='dish-details_restaurant-info'>
        <h3 className='dish-details_restaurant-name'>{dish.restaurant_name}</h3>
        <div className='dish-details_restaurant-buttons'>
          <a href={`tel:${phoneNumber}`} style={{color:"white", textDecoration: "none"}}><img className='dish-details_restaurant-buttons_call' src="/viber.svg"/></a>
          <img className='dish-details_restaurant-buttons_directions' src="/direction.svg" onClick={getDirections}/>
        </div>
      </div>
    
      <div className="rating-container">  
        <h3 className='dish-details_ask-for-rating'>
          {previousRating ?
            <p>"Thank you for rating this dish!"</p>
            :
            <p style={{color: "#009688"}}>Had it? Please rate it from 1 to 5!</p>
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
        > Update Rating </button>
        :
        <button className='dish-details-rating-button'
          onClick={() => handleCreateDishRating({dish_id: id, user_id, hoverRating, comment: 'test comment'})}
        > Rate Dish </button> 
        }
    </div>
  )
}