import { useContext, useEffect } from "react";
import NearByOptions from "../Components/NearbyOptions/NearbyOptions";

export default function Home({ count, menuToggle, vegetarian, setVegetarian, vegan, setVegan, glutenFree, setGlutenFree }) {

  return (
    <div>
      <NearByOptions count={count} menuToggle={menuToggle} vegetarian={vegetarian} setVegetarian={setVegetarian} vegan={vegan} setVegan={setVegan} glutenFree={glutenFree} setGlutenFree={setGlutenFree}/>
    </div>
  );
}
