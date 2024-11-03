import { Api, Category } from "@mui/icons-material";
import "../../Components/AddDish/AddDishComponent.css";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import GooglePlaces from "../GooglePlaces/GooglePlaces";

export default function AddDishComponent() {

  const [cuisines, setCuisines] = useState([]);
  const [ currImage, setCurrImage ] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [ searchInput, setSearchInput ] = useState("");
  const [ arrSearchInput, setArrSearchInput ] = useState("");
  const [ restNameInput, setRestNameInput ] = useState("");
  const [ stateInput, setStateInput ] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState("");
 


let navigate = useNavigate();
const API = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const [hoverRating, setHoverRating] = useState(0);
  

//STATE TO KEEP TRACK OF RESTAURANT INPUTS
const [ restaurantIdInput, setRestaurantIdInput ] = useState(0);

//NEW RESTAURANT
const [ newRestaurant, setNewRestaurant ] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "United States",
});

//NEW DISH
const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    region: "",
    dish_image: "",
    is_vegetarian: false,
    is_vegan: false,
    is_gluten_free: false,
    avg_rating: 0,   
});

//------------------------------------------------------------------------------------------------------------------------
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
async function addRestauranAndDish(newRestaurant, newDish) {
    fetch(`${API}/restaurants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            resData: newRestaurant,
            dishData: newDish,
        })
        })
        .then(response => response.json())
}
  

  function handleSubmit(e) {
    e.preventDefault();
    e.preventDefault();
    // getLatLng(fullAddress);
    addRestauranAndDish(newRestaurant, newDish)
    console.log(newDish)
  }

  const fileUploader = useRef();

  function editImage() {
      fileUploader.current.click();
  };

  function uploadedFile () {
    const uploadedImage = fileUploader.current.files[0];
    // const imageURL = URL.createObjectURL(uploadedImage);
    const reader = new FileReader();
    // setCurrImage(imageURL);
    reader.onloadend = () => {
      const base64String = reader.result;
      setCurrImage(base64String);
      setNewDish((newDish) => ({...newDish, dish_image: base64String}))
    }

    // setNewDish((newDish) => ({...newDish, dish_image: imageURL}))
    // setNewDish((newDish) => ({...newDish, dish_image: imageURL}))
    reader.readAsDataURL(uploadedImage);
  }


  let fullAddress=`${newDish.address},${newDish.city},${newDish.state}`;


  async function getLatLng(address) {
  
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
            const location = data.results[0].geometry.location;
            return setNewDish({ ...newDish, lat: Number(location.lat), lng: Number(location.lng) });
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


  //GET THE STREET, CITY AND STATE FROM THE ADDRESS
  useEffect(() => {
    if (searchInput && searchInput !== " ") {
      setArrSearchInput(searchInput.split(","));
    }
  }, [searchInput]);

  useEffect(() => {
    if (arrSearchInput.length > 0) {
      setStateInput(arrSearchInput[2].trim().split(" ")[0]);
    }
  }, [arrSearchInput])

  useEffect(() => {
    console.log(stateInput, "stateInput")
  }, [searchInput])

  useEffect(() => {
    console.log(arrSearchInput, "Search Input Array")
  }, [arrSearchInput])

  useEffect(() => {
    console.log(stateInput, "State Input")
  }, [stateInput]);

  useEffect(() => {
    console.log(phoneNumber, "Phone Number")
  }, [phoneNumber]);

  useEffect(() => {
    console.log(restNameInput, "Restaurant Name")
  }, [restNameInput]);

  useEffect(() => {
    console.log(newRestaurant, "New Restaurant")
  }, [newRestaurant])

  //----------------------------------------------------------------------------------------------------------------------
  // const calculateDistance = () => {
  //   const distanceResult = haversineDistance(
  //       parseFloat(lat1),
  //       parseFloat(lng1),
  //       parseFloat(item.latitude),
  //       parseFloat(item.longitude)
  //   );
  //   setDistance(distanceResult);
  // };
  
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

        <GooglePlaces searchInput={searchInput} setSearchInput={setSearchInput} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} restNameInput={restNameInput} setRestNameInput={setRestNameInput} newRestaurant={newRestaurant} setNewRestaurant={setNewRestaurant}/>

        <div className="restaurant-name-container">
          <label htmlFor="">
            Restaurant Name
            <br />
            <input className="restaurant-name-input" placeholder={restNameInput || "Please enter the restaurant name"}  type="text" id="name" name="name" value={restNameInput} onChange={handleRestTextChange} disabled/>
          </label>
        </div>
          <br />

          <div className="restaurant-street-container">
          <label htmlFor="">
            Street 
            <br />
            <input className="restaurant-street-input" placeholder={arrSearchInput[0] || "Please enter the name"}  type="text" id="address" name="address" value={arrSearchInput[0]} onChange={handleRestTextChange} disabled/>
          </label>
          </div>
          <br />

          <div className="restaurant-city-container">
          <label htmlFor="">
            City
            <br />
            <input className="restaurant-city-input" placeholder={arrSearchInput[1] || "Please enter the city"}  type="text" id="city" name="city" value={arrSearchInput[1]} onChange={handleRestTextChange} disabled/>
          </label>
          </div>
          <br />


     <div className="restaurant-state-container">
          <label htmlFor="">
            State
            <br/>
            <input className="restaurant-state-input" placeholder={stateInput || "Please enter state"}  type="text" id="state" name="state" value={stateInput} onChange={handleRestTextChange} disabled/>
            {/* <br />
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
    </select> */}
    </label>
    </div>
          <br />

          <div className="restaurant-phone-container">
          <label htmlFor="">
            Phone number
            <br />
            
            <input className="restaurant-phone-input" placeholder={phoneNumber || "Please enter the phone number"}  type="text" id="phone-number" name="phone-number" value={phoneNumber} onChange={handleTextChange} disabled/>
          </label>
          </div>

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