import { Api, Category } from "@mui/icons-material";
import "../../Components/AddDish/AddDishComponent.css";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";



export default function AddDishComponent() {
  const [cuisines, setCuisines] = useState([]);
  const [ currImage, setCurrImage ] = useState("");
  const [ databaseRest, setDatabaseRest ] = useState([]);
  const [ databaseDishes, setDatabaseDishes ] = useState([]);


  let navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [hoverRating, setHoverRating] = useState(0);
  
  //STATE TO KEEP TRACK OF DISH INPUTS
  const [ nameDishInput, setNameDishInput ] = useState("");
  const [ imageURLInput, setImageURLInput ] = useState("");
  const [ cuisineInput, setCuisineInput ] = useState("");
  const [ dishAvgRating, setDishAvgRating ] = useState(0);

  //STATE TO KEEP TRACK OF RESTAURANT INPUTS
  const [ restaurantIdInput, setRestaurantIdInput ] = useState(0);
  const [ restaurantNameInput, setRestaurantNameInput ] = useState("");
  const [ restaurantStreetInput, setRestaurantStreetInput ] = useState("");
  const [ restaurantCityInput, setRestaurantCityInput ] = useState("");
  const [ restaurantStateInput, setRestaurantStateInput ] = useState("");

  //NEW RESTAURANT
  const [ newRestaurant, setNewRestaurant ] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
  });


//FUNCTION TO CHECK IF THE RESTAURANT ALREADY EXISTS--------------------------------------------------------------------
function checkRestaurantId(name) {

    const itExists = databaseRest.filter(rest => rest.name === name);
    console.log(itExists, "itExists")
    if (itExists[0]) {
        return setRestaurantIdInput(itExists[0].restaurant_id);
    }
    return 0;
}

// useEffect(() => {
//     setRestaurantIdInput(checkRestaurantId(newRestaurant.name));
// },[newRestaurant]);

useEffect(() => {
    console.log(restaurantIdInput, "Restaurant ID")
}, [restaurantIdInput])

//----------------------------------------------------------------------------------------------------------------------



  //CHECKING THE RESTAURANT ID--------------------------------------------------------
  useEffect(() => {
    checkRestaurantId(newRestaurant.name)
  }, [newRestaurant])


  //NEW DISH
  const [newDish, setNewDish] = useState({
    restaurant_id: restaurantIdInput,
    name: "",
    description: "",
    region: "",
    dish_image: "",
    is_vegetarian: false,
    is_vegan: false,
    is_gluten_free: false,
    avg_rating: 0,   
  });

  useEffect(() => {
    fetch(`${API}/restaurants`)
    .then((response) => response.json())
    .then(res => setDatabaseRest(res))
    .catch(err => console.log(err));
  }, [newRestaurant, restaurantIdInput])

  useEffect(() => {
    fetch(`${API}/dishes`)
    .then((response) => response.json())
    .then(res => setDatabaseDishes(res))
    .catch(err => console.log(err));
  }, [])


  useEffect(() => {
    console.log(databaseDishes, "databaseDishes")
  }, [databaseDishes]);
  useEffect(() => {
    console.log(databaseRest, "databaseRest")
  }, [databaseRest]);
//----------------------------------------------------------------------------------------------------------------------
  const plateImages = [
    "https://t3.ftcdn.net/jpg/03/06/75/66/360_F_306756617_moZMl2JAPW5rwxj8TBggViHvKtX1QDK2.jpg",
    "https://www.shutterstock.com/image-vector/hands-holding-fork-spoon-empty-260nw-1292484178.jpg",
  ];


  function handleTextChange(e) {
    setNewDish({ ...newDish, [e.target.id]: e.target.value });
  }

  function handleRestTextChange(e) {
    setNewRestaurant({ ...newRestaurant, [e.target.id]: e.target.value });
  }

  useEffect(() => {
    console.log(newDish, "newDish Line 88")
  }, [newDish]);

  useEffect(() => {
    console.log(newRestaurant, "newRestaurant Line 97")
  }, [newRestaurant]);

//----------------------------------------------------------------------------------------------------------------------

  async function addDish(newDish) {
    if (restaurantIdInput) {
        setNewDish({ ...newDish, restaurant_id: restaurantIdInput });
    }
    try {
        const response = await fetch(`${API}/dishes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newDish)
        })

        const data = await response.json();
        console.log(data, "Inside POST for New Dish");
    } catch(error) {
        console.error("Error from Dish POST", error);
    }
  }

  async function addRestaurant(newRestaurant) {
    let restID;
    const searchRestaurant = databaseRest.filter(restaurant => restaurant.name === newRestaurant.name);
    if (searchRestaurant) {
        restID = searchRestaurant[0].restaurant_id;
        setRestaurantIdInput(restID);
    } else {
    try {
        const response = await fetch(`${API}/restaurants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRestaurant)
        })

        const data = await response.json();
        console.log(data, "Inside POST for New Restaurant");
    } catch(error) {
        console.error("Error from Restaurant POST", error);
    }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    getLatLng(fullAddress);
    addRestaurant(newRestaurant);
    addDish(newDish);
    console.log(newDish)
  }

  const fileUploader = useRef();

  function editImage() {
      fileUploader.current.click();
  };

  function uploadedFile () {
    const uploadedImage = fileUploader.current.files[0];
    const imageURL = URL.createObjectURL(uploadedImage);
    setCurrImage(imageURL);

    setNewDish((newDish) => ({...newDish, dish_image: imageURL}))
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
            return setNewDish({ ...newDish, lat: String(location.lat), lng: String(location.lng) });
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

    useEffect(() => {
        console.log(uploadedFile,"Image uploaded")
    }, [uploadedFile])

    useEffect(() => {
        console.log(currImage,"Image uploaded 2")
    }, [currImage]);

    //CHECK IF THE RESTAURANT NAME IS IN THE DATABASE------------------------------------------------------------------
    return (
      <div style={{overflow:"hidden"}}>
  
          <form className="add-dish-form" onSubmit={handleSubmit}>
              <div className="dish-name-container">
                  <label htmlFor="">Dish Name
                      <br />
                      <input className="dish-name-input" placeholder="Please enter the dish name" type="text" id="name" value={newDish.name} onChange={handleTextChange} />
                  </label>
              </div>
              <br />
  
              <div className="dish-image-container">
                  <label htmlFor="">
                  Dish image
                      <br />
                      {/* <input className="dish-image-input" placeholder="Please upload a picture of a dish " type="text" id="image" name="image"  value={currImage} onChange={handleTextChange} hidden/> */}
                  </label>
                  <img className="dish-image" src={currImage} alt="dish"/>
                  <input ref={fileUploader} type="file" id="image" className="choose-file2" onChange={uploadedFile} />
              </div>
              <br />
  
              <div className="cuisine-container">
                  <label htmlFor="">
                  Cuisine
                  <br />
                  <select className="cuisine" id="cuisine" name="cuisine" value={newDish.cuisine} onChange={handleTextChange}>
                  <option className="select" value=""></option>
                  {...cuisines.map(dish=>   <option className="select" value={dish.cuisine_name}>{dish.cuisine_name}</option>)}    
                   </select> 
                  </label>
              </div>
              <br />
  
          <div className="restaurant-name-container">
            <label htmlFor="">
              Restaurant Name
              <br />
              <input className="restaurant-name-input" placeholder="Please enter the restaurant name"  type="text" id="name" name="name" value={newRestaurant.name} onChange={handleRestTextChange} />
            </label>
          </div>
            <br />
  
            <div className="restaurant-street-container">
            <label htmlFor="">
              Street 
              <br />
              <input className="restaurant-street-input" placeholder="Please enter the street"  type="text" id="address" name="address" value={newRestaurant.address} onChange={handleRestTextChange} />
            </label>
            </div>
            <br />
  
            <div className="restaurant-city-container">
            <label htmlFor="">
              City
              <br />
              <input className="restaurant-city-input" placeholder="Please enter the city"  type="text" id="city" name="city" value={newRestaurant.city} onChange={handleRestTextChange} />
            </label>
            </div>
            <br />
  
  
       <div className="restaurant-state-container">
            <label htmlFor="">
              State
              <br />
      <select className="states" id="state" name="states" value={newRestaurant.state} onChange={handleRestTextChange}>
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
            <br />
  
            <div className="restaurant-phone-container">
            <label htmlFor="">
              Phone number
              <br />
              
              <input className="restaurant-phone-input" placeholder="Please enter the phone number"  type="text" id="phone-number" name="phone-number" value={newDish.phone_number} onChange={handleTextChange} />
            </label>
            </div>
        
            {/* <br />
            <br />
            <br /> */}
  
            <p className="rating-title">Rating</p>
            <div className="dish-rating-container">
            <div className="dish-details_plate-rating" id="dish-rating" value={newDish.avg_rating} onChange={handleTextChange}>
            {[1, 2, 3, 4, 5].map((avg_rating, index) => (
              <img
                src={
                  avg_rating <= (hoverRating || newDish.avg_rating)
                  ? plateImages[1]
                  : plateImages[0]
                }
                alt={`Plate ${avg_rating}`}
                onMouseEnter={() => setHoverRating(avg_rating)
                 
                }
                onMouseLeave={() => setHoverRating(avg_rating)}
                onClick={() => {
                  setNewDish({ ...newDish, avg_rating: avg_rating });
                }}
                key={index}
              />
            ))}
          </div>
          </div>
         
  
      
              <button className="add-new-dish_submit">Submit</button>
          </form>
      </div>
    )
  }