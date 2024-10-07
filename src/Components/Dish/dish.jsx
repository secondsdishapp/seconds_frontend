import { useNavigate } from "react-router-dom"

export default function Dish({item,index}) {
  
  function ratingDishes(number){
    let string=' '
    for(let i=0;i<number;i++){
      string+='🍽️ '
    }
    return string

  }
    let navigate = useNavigate()

  return (
    <div onClick={()=>navigate(`/dishes/${item.dish_id}`)}  className="nearbyoptions-container" key={index}>
    <div className="nearbyoptions_item">
    <img className="nearbyoptions_item_image" src={item.dish_image} alt="" />
      <div className="nearbyoptions_item_name&restaurant">
        <p className="nearbyoptions_item_dish-name_title">Dish Name:</p>
      <h5 className="nearbyoptions_item_dish-name" >{item.dish_name}</h5>
      <p className="nearbyoptions_item_restaurant-name_title">Restaurant Name:</p>
      <p className="nearbyoptions_item_restaurant-name">{item.restaurant_name}</p>
      <p className="nearbyoptions_item_rating_title">Rating:</p>
      <h3 className='nearbyoptions_rating-content'>{item.avg_rating}</h3>

      </div>
     
    </div>
  </div>
  )
}