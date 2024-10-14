import { useContext } from 'react';
import { LocalAuthContext } from '../../Context/LocalAuth/LocalAuthContext.jsx';
import { Link } from 'react-router-dom';
import { fetchAllDishRatingsByDishId } from '../../Services/ratings.services.js';

const API = import.meta.env.VITE_API_URL;

export default function CarouselDish({
  dish
  ,index
  ,slide
}) {
  // context
  const {
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);

  return (
    <div key={index} className={slide === index ? "single-card" : "single-card hidden"}>
      <div style={{display: "flex", marginLeft: "0%", alignItems: "center", width: "100%", gap: "2%"}}>
        {dishRating(dish.avg_rating).map((elem, index) => elem === "full" ? 
          <img className="rate-icon" src="/eat.png"/> :
          <img className="rate-icon" src="/eat-half.png"/>)
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
    </div>
  )
}