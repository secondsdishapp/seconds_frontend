import { useNavigate } from "react-router-dom";

export default function Dish({ item, index }) {
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
      onClick={() => navigate(`/dishes/${item.dish_id}`)}
      className="nearbyoptions-container"
      key={index}
    >
      <div className="nearbyoptions_item">
        <img
          className="nearbyoptions_item_image"
          src={item.dish_image}
          alt=""
        />
        <div className="nearbyoptions_item_infos">
          <div className="nearbyoptions_item_dish-restaurant-container">
          <img className="nearbyoptions_icon"  src="/restaurant.svg" />
          <p className="nearbyoptions_item_restaurant-name">
            {item.restaurant_name}
          </p>

          </div>
          <div className="nearbyoptions_item_dish-name-container">
            <img className="nearbyoptions_icon" src="/dinner.svg" />

            <h5 className="nearbyoptions_item_dish-name">{item.dish_name}</h5>
          </div>
          <div className="nearbyoptions_item_dish-rating-container">

            <img className="nearbyoptions_icon"  src="/dish.png" />
            <h3  className="nearbyoptions_rating-content">{item.avg_rating}</h3>
            <img className="nearbyoptions_icon"  src="distance.png" />
            <h3  className="nearbyoptions_distance-content">{item.avg_rating}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
