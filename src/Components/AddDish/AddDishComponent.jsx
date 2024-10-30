import { Api, Category } from '@mui/icons-material';
import '../../Components/AddDish/AddDishComponent.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function AddDishComponent() {
  const [cuisines, setCuisines] = useState([]);

  let navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [hoverRating, setHoverRating] = useState(0);

  const [newDish, setNewDish] = useState({
    name: '',
    image: '',
    description: '',
    restaurant: '',
    cuisine: '',
    category_id: '',
    price: '',
    rating: 0,
    vegetarian: '',
    vegan: '',
    glutenFree: '',
    address: '',
    city: '',
    state: '',
    dish_id: '',
    user_id: '',
    lat: '',
    lng: '',
  });

  const plateImages = [
    'https://t3.ftcdn.net/jpg/03/06/75/66/360_F_306756617_moZMl2JAPW5rwxj8TBggViHvKtX1QDK2.jpg',
    'https://www.shutterstock.com/image-vector/hands-holding-fork-spoon-empty-260nw-1292484178.jpg',
  ];

  function handleTextChange(e) {
    setNewDish({ ...newDish, [e.target.id]: e.target.value });
    console.log(newDish);
  }
  function addDish() {
    fetch(`${API}/dishes`, {
      method: 'POST',
      body: JSON.stringify(newDish),
      headers: {
        'Content-type': 'application/json',
      },
    })
      // .then(navigate("/"))
      .catch((error) => console.error('catch', error));
  }
  function handleSubmit(e) {
    getLatLng(fullAddress);
    e.preventDefault();
    addDish();
    console.log(newDish);
  }
  let fullAddress = `${newDish.address},${newDish.city},${newDish.state}`;
  async function getLatLng(address) {
    // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        return setNewDish({ ...newDish, lat: location.lat, lng: location.lng });
      } else {
        throw new Error(`Geocoding error: ${data.status}`);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  useEffect(() => {
    fetch(`${API}/cuisines`)
      .then((response) => response.json())
      .then((res) => {
        setCuisines(res);
      });
  }, [newDish.name]);

  return (
    <div className="add-dish-form-container">
      <div className="add-dish-form-box">
        <form className="add-dish-form" onSubmit={handleSubmit}>
          
          <div className="add-dish-form-group-dish-name">
            <label htmlFor="dish-name" className="add-dish-form-label-dish-name">
              Dish Name:
              <br />
              <input
                placeholder="Please enter the dish name"
                type="text"
                id="name"
                value={newDish.name}
                onChange={handleTextChange}
                className="add-dish-form-input-field-dish-name"
              />
            </label>
          </div>

          <div className="add-dish-form-group-dish-image">
            <label htmlFor="dish-image" className="add-dish-form-label-dish-image">
              Dish Image:
              <br />
              <input
                placeholder="Please upload a picture of a dish "
                type="text"
                id="image"
                name="image"
                value={newDish.image}
                onChange={handleTextChange}
                className="add-dish-form-input-field-dish-image"
              />
            </label>
          </div>

          <div className="add-dish-form-group-cuisine">
            <label htmlFor="cuisine" className="add-dish-form-label-cuisine">
              Cuisine:
              <br />
              <select
                className="add-dish-form-input-field-cuisine"
                id="cuisine"
                name="cuisine"
                value={newDish.cuisine}
                onChange={handleTextChange}
                
              >
                <option className="select" value=""></option>
                {...cuisines.map((dish) => (
                  <option value={dish.cuisine_name}>{dish.cuisine_name}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="add-dish-form-group-restaurant-name">
            <label htmlFor="restaurant-name" className="add-dish-form-label-restaurant-name">
              Restaurant Name:
              <input
                placeholder="Please enter the restaurant name"
                type="text"
                id="restaurant"
                name="restaurant"
                value={newDish.restaurant}
                onChange={handleTextChange}
                className="add-dish-form-input-field-restaurant-name"
              />
            </label>
          </div>

          <div className="add-dish-form-group-street">
            <label htmlFor="street" className="add-dish-form-label-street">
              Street
              <input
                placeholder="Please enter the street"
                type="text"
                id="address"
                name="address"
                value={newDish.address}
                onChange={handleTextChange}
                className="add-dish-form-input-field-street"
              />
            </label>
          </div>

          <div className="add-dish-form-group-city">
            <label htmlFor="city" className="add-dish-form-label-city">
              City
              <input
                placeholder="Please enter the city"
                type="text"
                id="city"
                name="city"
                value={newDish.city}
                onChange={handleTextChange}
                className="add-dish-form-input-field-city"
              />
            </label>
          </div>

          <div className="add-dish-form-group-state">
            <label htmlFor="state" className="add-dish-form-label-state">
              State
              <select
                className="add-dish-form-input-field-state"
                id="state"
                name="states"
                value={newDish.state}
                onChange={handleTextChange}
              >
                <option className="select" value=""></option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
              </select>
            </label>
          </div>

          <div className="add-dish-form-group-phone-number">
            <label htmlFor="phone-number" className="add-dish-form-label-phone-number">
              Phone number
              <input
                placeholder="Please enter the phone number"
                type="text"
                id="phone-number"
                name="phone-number"
                value={newDish.phone_number}
                onChange={handleTextChange}
                className="add-dish-form-input-field-phone-number"
              />
            </label>
          </div>

          <div className="add-dish-form-group-rating">
            <label htmlFor="rating" className="add-dish-form-label-rating">Rating</label>

            <div
              className="add-dish-form-input-field-rating"
              id="rating"
              value={newDish.rating}
              onChange={handleTextChange}
            >
              {[1, 2, 3, 4, 5].map((rating, index) => (
                <img
                  src={
                    rating <= (hoverRating || newDish.rating)
                      ? plateImages[1]
                      : plateImages[0]
                  }
                  alt={`Plate ${rating}`}
                  onMouseEnter={() => setHoverRating(rating)}
                  onMouseLeave={() => setHoverRating(rating)}
                  onClick={() => {
                    setNewDish({ ...newDish, rating: rating });
                  }}
                  key={index}
                />
              ))}
            </div>
          </div>

          <button className="add-dish-form-submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}
