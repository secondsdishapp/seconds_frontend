import { useContext, useEffect } from "react";
import { LocalAuthContext } from "../Context/LocalAuth/LocalAuthContext.jsx";
import NearByOptions from "../Components/NearbyOptions/NearbyOptions";

export default function Home({cuisine,setCuisine, count, menuToggle, vegetarian, setVegetarian, vegan, setVegan, glutenFree, setGlutenFree, search, setSearch }) {

  // context
  const {
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);

  return (
    <div>
      <NearByOptions cuisine={cuisine} setCuisine={setCuisine} count={count} menuToggle={menuToggle} vegetarian={vegetarian} setVegetarian={setVegetarian} vegan={vegan} setVegan={setVegan} glutenFree={glutenFree} setGlutenFree={setGlutenFree} search={search} setSearch={setSearch}/>
    </div>
  );
}
