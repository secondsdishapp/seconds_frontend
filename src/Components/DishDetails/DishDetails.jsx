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
  ,createDishRatingByFirebaseId
  ,deleteDishRatingByFirebaseId
} from '../../Services/ratings.services.js'

const API = import.meta.env.VITE_API_URL;
const plateImages = [
  "/dish6.svg",
  "/dish4.svg",
];
const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;

export default function DishDetails() {

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
  const [dishAverageRating, setDishAverageRating] = useState(dish.avg_rating);

  // get user id
  const user_id = localUser.user_id
  const firebase_id = currentUser?.uid || null
  
  let navigate = useNavigate()
  let { id } = useParams()
  console.log(typeof id);
  
  function ratingDishes(number){
    let string = [];
    for(let i = 1; i <= number; i++) {
      string.push(i)
    }
    return (
      <div style={{display: 'flex', flexDirection: 'row', marginLeft: "13vw", gap: "1vw"}}>
      {string.map((num, index) => <img src="/seconds-plate-orange-circle.png" className="dish-rating-icon"/>)}
      </div>
    )
  }
  
  // get dish details
  useEffect(() => {
    fetch(`${API}/dishes/${id}/location`)
      .then((res) => {
        return res.json()
      })
      .then(resJSON => {
        setDish(resJSON)
      })
      .catch(() => {
        navigate("/notfound")
      })
  }, [ id, navigate])

  // get dish ratings by dish Id and calculate average rating
  async function getDishRatings(dish_id) {
    try {
      const fetchedDishRatings = await fetchAllDishRatingsByDishId(dish_id)
      setDishRatings(fetchedDishRatings)
      const averageRating = fetchedDishRatings.length > 0 ? fetchedDishRatings.reduce((a, b) => a + b.rating, 0) / fetchedDishRatings.length : +dish.avg_rating
      setDishAverageRating(convertRating(averageRating))
    } catch (error) {
        throw error
    }
  }

  console.log(dish)

  function convertRating(rating) {
    return Math.round((rating + Number.EPSILON) * 10) / 10
  }

  useEffect(() => {
    getDishRatings(id)
  }, [dish, previousRating])

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

  }, [currentUser])

  // update dish rating
  const updatedRating = {
    dish_id: id,
    firebase_id,
    user_id,
    hoverRating,
    comment: 'test comment'
  }

  async function updateDishRating(updatedRating) {
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
    if (hoverRating === 0) {
      alert('Please select a rating before submitting')
      return
    }
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

  // delete dish user rating
  async function deleteDishRating({dish_id, firebase_id}) {
    if (currentUser) {
      try {
        const dishUserRating = await deleteDishRatingByFirebaseId(dish_id, firebase_id)
        setPreviousRating(0)
        setHoverRating(0)
        setTimeout(() => {
          alert('Your rating has been removed!')
        }, 500)
      } catch (error) {
          throw error
      }
    }
  }

  function handleDeleteDishRating(id, firebase_id) {
    if (currentUser) {
      deleteDishRating(id, firebase_id)
    } else if (isLocalLoggedIn) {
      deleteDishRating(id, user_id)
    }
  }

  // create dish rating
  
  async function handleCreateDishRating({dish_id, user_id, firebase_id, hoverRating, comment}) {
    console.log("dish_id", dish_id);
    console.log("Firebase ID", firebase_id);

    if (!currentUser) {
      alert('Login to rate this dish!')
      return
    }
    if (hoverRating === 0) {
      alert('Please select a rating before submitting')
      return
    }
    if (currentUser) {
      if (previousRating === hoverRating) {
        alert('Dish already rated!')
      } else {
          try {
            const newDishUserRating = await createDishRatingByFirebaseId(dish_id, firebase_id, hoverRating, comment)
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
    const restaurantAddress = `${dish.address}, ${dish.city}, ${dish.state} ${dish.zipcode || ""}`;
    const encodedAddress = encodeURIComponent(restaurantAddress);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  }

  useEffect(() => {
    console.log(dish, "dish")
  }, [dish])
  return (
    <div className='dish-details-container'>
      <h3 className='dish-details_dish-name'>{dish.dish_name}</h3>
      <img className="dish-details_dish-image" src={dish.dish_image || "/emptydish.png"} alt="" />
      {/* <h1 className='dish-details_rating-title'>Rating: {`${dishAverageRating}`}</h1> */}
      <div style={{display: "flex", flexDirection: "row", height: "60px", alignItems: "center"}}>
        <h3 className='dish-details_rating-content'>{dishAverageRating}</h3>
        {/* {ratingDishes(dishAverageRating)} */}
        <img src="/seconds-plate-orange-circle.png" style={{width: "60px"}}/>
      </div>
      <h3 className='dish-details_rating-length'>{`Ratings (${dishRatings.length || 1})`}</h3>
      
      <div className='dish-details_restaurant-info'>
        <h3 className='dish-details_restaurant-name'>{dish.restaurant_name}</h3>
        <p className="restaurant-address">{dish.address}, {dish.city}, {dish.country}</p>
        <div className='dish-details_restaurant-buttons'>
          <div style={{display: "grid", height: "100%", gridTemplateColumns: "50% 50%", backgroundColor: "#FF5252", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px", marginTop: "0px", alignContent: "center"}}> 
          <a href={`tel:${phoneNumber}`} style={{color:"white", textDecoration: "none", height: "100%", borderRight: "3px solid white"}}><img className='dish-details_restaurant-buttons_call' src="/viber2.svg"/></a>
          <img className='dish-details_restaurant-buttons_directions' src="/direction2.svg" onClick={getDirections}/>
          </div>
        </div>
      </div>
    
      <div className="rating-container">  
        <h3 className='dish-details_ask-for-rating'>
          {previousRating ?
            <p>"Thank you for rating this dish!"</p>
            :
            <p style={{color: "#009688", marginLeft: "8%"}}>Had it? Please rate it from 1 to 5!</p>
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
              onMouseLeave={() => setHoverRating(rating)}
              onClick={() => {}}
              key={index}
            />
          ))}
        </div>
      </div>
      {previousRating ?
        <div className='dish-details-button-group'>
          <button className='dish-details-rating-button delete-rating-button'
            onClick={() => handleDeleteDishRating(updatedRating)}
          > Remove Rating </button>
          <button className='dish-details-rating-button'
            onClick={() => handleUpdateDishRating(updatedRating)}
          > Update Rating </button>
        </div>
        :
        <div className='dish-details-button-group'>
          <button className='dish-details-rating-button'
            onClick={() => handleCreateDishRating({dish_id: id, user_id, firebase_id, hoverRating, comment: 'test comment'})}
          > Rate Dish </button>
        </div>
        }
    </div>
  )
}