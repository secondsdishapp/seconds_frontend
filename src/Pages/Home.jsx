import { useContext, useEffect } from "react";
import { LocalAuthContext } from "../Context/LocalAuth/LocalAuthContext.jsx";
import NearByOptions from "../Components/NearbyOptions/NearbyOptions";

// local user
const user = {
  user_id: 3,
  name: "Eater",
  email: "eater@gmail.com"
}

export default function Home({ count, menuToggle, vegetarian, setVegetarian, vegan, setVegan, glutenFree, setGlutenFree }) {

  // context
  const {
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);
  console.log("user_id", localUser?.user_id || 0);
  
  // const savedPreference = localStorage.getItem("vegetarian");

  // useEffect(() => {
  //   console.log(vegetarian, "Vegetarian value in the Home page")
  // }, [vegetarian])

  // useEffect(() => {
  //   console.log(savedPreference, "Vegetarian Home Page")
  // }, [savedPreference]);
  
  // useEffect(() => {
  //   localStorage.setItem("vegetarian", JSON.stringify(vegetarian)); // Save state on change
  // }, [vegetarian]);
  

  return (
    <div>
      {/* <h1>Hello, {localUser.name}!</h1>
      <button onClick={() => localLogin(user)}>Login</button>
      <button onClick={() => localLogout(user)}>Logout</button> */}
      <NearByOptions count={count} menuToggle={menuToggle} vegetarian={vegetarian} setVegetarian={setVegetarian} vegan={vegan} setVegan={setVegan} glutenFree={glutenFree} setGlutenFree={setGlutenFree}/>
    </div>
  );
}
