
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
export default function DishDetails() {
  const [hoverRating, setHoverRating] = useState(0);
  const plateImages = [
    "https://t3.ftcdn.net/jpg/03/06/75/66/360_F_306756617_moZMl2JAPW5rwxj8TBggViHvKtX1QDK2.jpg",
    "https://www.shutterstock.com/image-vector/hands-holding-fork-spoon-empty-260nw-1292484178.jpg",
  ];



    const[dish,setDish]=useState({'dishname':'Chicken Sandwish','image':'https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg','restaurantname':'KFC','restaurantaddress':'123 Main St, Springfield, IL','price':'$10','rating':4,'ingredients':'chicken, mayo, bread'})
    let { id } = useParams()
    function ratingDishes(number){
      let string=' '
      for(let i=0;i<number;i++){
        string+='🍽️ '
      }
      return string

    }
  return (
    <div className='dish-details-container'>
        <h3 className='dish-details_dish-name'>{dish.dishname}</h3>
        <img className="dish-details_dish-image" src={dish.image} alt="" />
        <h3 className='dish-details_rating-title'>Rating:</h3>

                <h3 className='dish-details_rating-content'>{ratingDishes(dish.rating)}</h3>
                

        <div className='dish-details_restaurant-info'>
        <h3 className='dish-details_restaurant-name'>{dish.restaurantname}</h3>
        <div className='dish-details_restaurant-buttons'>
          <button className='dish-details_restaurant-buttons_call'>Call</button>
          <button className='dish-details_restaurant-buttons_directions'>Directions</button>
        </div>
        </div>
        <h3 className='dish-details_ingredients-title'>Ingredients:</h3>
        <p className='dish-details_ingredients-content'>{dish.ingredients}.</p>
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