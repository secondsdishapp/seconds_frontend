import { Api, Category } from "@mui/icons-material";
import "../../Components/AddDish/AddDishComponent.css";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import GooglePlaces from "../GooglePlaces/GooglePlaces";

export default function AddDishComponent() {

  const [ addedDishAndRestaurant, setAddedDishAndRestaurant ] = useState(null);
  const [ databaseDishes, setDatabaseDishes ] = useState([]);
  const [ databaseRest, setDatabaseRest ] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [ currImage, setCurrImage ] = useState("/seconds-logo.png");
  const [ selectedPlace, setSelectedPlace ] = useState(null);
  const [ searchInput, setSearchInput ] = useState("");
  const [ arrSearchInput, setArrSearchInput ] = useState("");
  const [ restNameInput, setRestNameInput ] = useState("");
  const [ cityInput, setCityInput ] = useState("");
  const [ stateInput, setStateInput ] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState("");
  const [ coordinates, setCoordinates ] = useState({
    lat: 0,
    lng: 0,
});
 
const navigate = useNavigate();
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
  }, [newDish.name])

//----------------------------------------------------------------------------------------------------------------------
  const plateImages = [
    "/dish6.svg",
    "/dish4.svg",
  ];


  function handleTextChange(e) {
    setNewDish({ ...newDish, [e.target.id]: e.target.value });
  }

  function handleRestTextChange(e) {
    setNewRestaurant({ ...newRestaurant, [e.target.id]: e.target.value });
  }

  // useEffect(() => {
  //   console.log(newDish, "newDish Line 88")
  // }, [newDish]);

  // useEffect(() => {
  //   console.log(newRestaurant, "newRestaurant Line 97")
  // }, [newRestaurant]);

//---------------------------------------------------------------------------------------------------------------------------

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
        .then(res => setAddedDishAndRestaurant(res))
}
//UPDATING COORDINATES OF RESTAURANT-----------------------------------------------------------------------------------------
useEffect(() => {
  if (coordinates.lat !== 0 && coordinates.lng !== 0) {
      setNewRestaurant({...newRestaurant, latitude: coordinates.lat, longitude: coordinates.lng})
    }
}, [coordinates])

//---------------------------------------------------------------------------------------------------------------------------

  function handleSubmit(e) {
    e.preventDefault();
    addRestauranAndDish(newRestaurant, newDish);
    navigate(`/dishes/${addedDishAndRestaurant?.dish?.dish_id}`);
  }

  const fileUploader = useRef();

  function editImage() {
      fileUploader.current.click();
  };

  function uploadedFile () {
    const uploadedImage = fileUploader.current.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setCurrImage(base64String);
      setNewDish((newDish) => ({...newDish, dish_image: base64String}))
    }

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



  //GET THE STREET, CITY AND STATE FROM THE ADDRESS
  useEffect(() => {
    if (searchInput && searchInput !== " ") {
      setArrSearchInput(searchInput.split(","));
    }
  }, [searchInput]);

  useEffect(() => {
    setNewRestaurant({...newRestaurant, address: arrSearchInput[0]});
  }, [arrSearchInput]);

  useEffect(() => {
    if (arrSearchInput.length > 0) {
      setCityInput(arrSearchInput[1]?.trim());
      setStateInput(arrSearchInput[2]?.trim().split(" ")[0]);
      setNewRestaurant({
        ...newRestaurant,
        address: arrSearchInput[0],
        city: arrSearchInput[1]?.trim(),
        state: arrSearchInput[2]?.trim().split(" ")[0],
      })
    }
  }, [arrSearchInput])

  //---------------------------------------------------------------------------------------------------------------------------

  // useEffect(() => {
  //   console.log(stateInput, "stateInput")
  // }, [searchInput])

  // useEffect(() => {
  //   console.log(arrSearchInput, "Search Input Array")
  // }, [arrSearchInput])

  // useEffect(() => {
  //   console.log(stateInput, "State Input")
  // }, [stateInput]);

  // useEffect(() => {
  //   console.log(phoneNumber, "Phone Number")
  // }, [phoneNumber]);

  // useEffect(() => {
  //   console.log(restNameInput, "Restaurant Name")
  // }, [restNameInput]);

  // useEffect(() => {
  //   console.log(newRestaurant, "New Restaurant")
  // }, [newRestaurant])

  // useEffect(() => {
  //   console.log(addedDishAndRestaurant, "Added Dish and Restaurant")
  // }, [addedDishAndRestaurant]);
  
  return (
    <div style={{overflow:"hidden"}}>

        <form className="add-dish-form" onSubmit={handleSubmit}>
            <div className="dish-name-container">
                <label className="label-css" htmlFor="">Dish Name
                    <br />
                    <input className="dish-name-input" placeholder="Please enter the dish name" type="text" id="name" value={newDish.name} onChange={handleTextChange} />
                </label>
            </div>
            <br />

            <div className="dish-image-container">
                <label className="label-css" htmlFor="">
                Dish image
                    <br />
                </label>
                <img className="dish-image2" src={currImage} alt="dish"/>
                <input ref={fileUploader} type="file" id="image" className="choose-file2" onChange={uploadedFile} />
                <br/>
                <button className="edit-image" onClick={editImage}>Upload Image</button>
            </div>
            <br />

            <div className="cuisine-container">
                <label className="label-css" htmlFor="">
                Cuisine
                <br />
                <select className="cuisine" id="cuisine" name="cuisine" value={newDish.cuisine} onChange={handleTextChange}>
                <option className="select" value=""></option>
                {...cuisines.map(dish=>   <option className="select" value={dish.cuisine_name}>{dish.cuisine_name}</option>)}    
                 </select> 
                </label>
            </div>
            <br />

        <GooglePlaces searchInput={searchInput} setSearchInput={setSearchInput} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} restNameInput={restNameInput} setRestNameInput={setRestNameInput} newRestaurant={newRestaurant} setNewRestaurant={setNewRestaurant} coordinates={coordinates} setCoordinates={setCoordinates}/>

        <div className="restaurant-name-container">
          <label className="label-css" htmlFor="">
            Restaurant Name
            <br />
            <input className="restaurant-name-input" placeholder={restNameInput || "Please enter the restaurant name"}  type="text" id="name" name="name" value={restNameInput} onChange={handleRestTextChange} disabled/>
          </label>
        </div>
          <br />

          <div className="restaurant-street-container">
          <label className="label-css" htmlFor="">
            Street 
            <br />
            <input className="restaurant-street-input" placeholder={arrSearchInput[0] || "Please enter the name"}  type="text" id="address" name="address" value={arrSearchInput[0]} onChange={handleRestTextChange} disabled/>
          </label>
          </div>
          <br />

          <div className="restaurant-city-container">
          <label className="label-css" htmlFor="">
            City
            <br />
            <input className="restaurant-city-input" placeholder={cityInput || "Please enter the city"}  type="text" id="city" name="city" value={cityInput} onChange={handleRestTextChange} disabled/>
          </label>
          </div>
          <br />


     <div className="restaurant-state-container">
          <label className="label-css" htmlFor="">
            State
            <br/>
            <input className="restaurant-state-input" placeholder={stateInput || "Please enter state"}  type="text" id="state" name="state" value={stateInput} onChange={handleRestTextChange} disabled/>
    </label>
    </div>
          <br />

          <div className="restaurant-phone-container">
          <label className="label-css" htmlFor="">
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