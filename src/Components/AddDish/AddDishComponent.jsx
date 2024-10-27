import { Api, Category } from "@mui/icons-material";
import "../../Components/AddDish/AddDishComponent.css";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function AddDishComponent() {
  const [cuisines, setCuisines] = useState([]);

  let navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [hoverRating, setHoverRating] = useState(0);
  
  const [newDish, setNewDish] = useState({
    name: "",
    image: "",
    description: "",
    restaurant:'',
    cuisine:"",
    category_id:'',
    price: "",
    rating: 0,
    vegetarian: "",
    vegan: "",
    glutenFree: "",
    address: "",
    city:'',
    state:'',
    dish_id: "",
    user_id: "",
    lat:'',
    lng:''
  
  });

  const plateImages = [
    "https://t3.ftcdn.net/jpg/03/06/75/66/360_F_306756617_moZMl2JAPW5rwxj8TBggViHvKtX1QDK2.jpg",
    "https://www.shutterstock.com/image-vector/hands-holding-fork-spoon-empty-260nw-1292484178.jpg",
  ];
  
  function handleTextChange(e) {
    setNewDish({ ...newDish, [e.target.id]: e.target.value });
    console.log(newDish);
  }
  function addDish() {
    fetch(`${API}/dishes`, {
      method: "POST",
      body: JSON.stringify(newDish),
      headers: {
        "Content-type": "application/json",
      },
    })
      // .then(navigate("/"))
      .catch((error) => console.error("catch", error));
  }
  function handleSubmit(e) {
    getLatLng(fullAddress);
    e.preventDefault();
    addDish();
    console.log(newDish)

    
  }
  let fullAddress=`${newDish.address},${newDish.city},${newDish.state}`;
  async function getLatLng(address) {
   // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
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
    <div>

        <form className="add-dish-form" onSubmit={handleSubmit}>
          <label htmlFor="">Dish Name
            <br />
            <input placeholder="Please enter the dish name" type="text" id="name" value={newDish.name} onChange={handleTextChange} />
          </label>
          <br />
          <label htmlFor="">
            Dish image
            <br />
            <input placeholder="Please upload a picture of a dish " type="text" id="image" name="image"  value={newDish.image} onChange={handleTextChange} />
          </label>
          <br />
          <label htmlFor="">
            Cuisine
            <br />
            <select className="cuisine" id="cuisine" name="cuisine" value={newDish.cuisine} onChange={handleTextChange}>
        <option className="select" value=""></option>
        {...cuisines.map(dish=>   <option value={dish.cuisine_name}>{dish.cuisine_name}</option>)}
     
       
    </select> 
          </label>
          <br />
          <label htmlFor="">
            Restaurant Name
            <br />
            <input placeholder="Please enter the restaurant name"  type="text" id="restaurant" name="restaurant" value={newDish.restaurant} onChange={handleTextChange} />
          </label>
          <br />
          <label htmlFor="">
            Street 
            <br />
            <input  placeholder="Please enter the street"  type="text" id="address" name="address" value={newDish.address} onChange={handleTextChange} />
          </label>
          <br />
          <label htmlFor="">
            City
            <br />
            <input  placeholder="Please enter the city"  type="text" id="city" name="city" value={newDish.city} onChange={handleTextChange} />
          </label>
          <br />
          <label htmlFor="">
            State
            <br />
     
    <select className="states" id="state" name="states" value={newDish.state} onChange={handleTextChange}>
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
    </select>      </label>
          <br />
          <label htmlFor="">
            Phone number
            <br />
            
            <input placeholder="Please enter the phone number"  type="text" id="phone-number" name="phone-number" value={newDish.phone_number} onChange={handleTextChange} />
          </label>
          <br />
          <br />
          <br />
         <label htmlFor="">Rating</label>
         
          <div className="dish-details_plate-rating" id="rating" value={newDish.rating} onChange={handleTextChange}>
          {[1, 2, 3, 4, 5].map((rating, index) => (
            <img
              src={
                rating <= (hoverRating || newDish.rating)
                ? plateImages[1]
                : plateImages[0]
              }
              alt={`Plate ${rating}`}
              onMouseEnter={() => setHoverRating(rating)
               
              }
              onMouseLeave={() => setHoverRating(rating)}
              onClick={() => {
                setNewDish({ ...newDish, rating: rating });
              }}
              key={index}
            />
          ))}
        </div>

    
            <button className="add-new-dish_submit">Submit</button>
        </form>
    </div>
  )
}