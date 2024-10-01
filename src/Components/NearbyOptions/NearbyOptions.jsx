import SearchBar from "../../Components/SearchBar/SearchBar";
import Dish from "../Dish/dish";
export default function NearByOptions() {
  let dummy=[
    {  id: 1,
      "address": "123 Main St, Springfield, IL",
      "name": "Springfield Library",
      "image": "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg"
    },
    { id: 2,
      "address": "456 Elm St, Oakwood, TX",
      "name": "Oakwood Community Center",
      "image": "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg"
    },
    { id: 3,
      "address": "789 Pine St, Maple City, CA",
      "name": "Maple City Park",
      "image": "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg"
    },
    { id: 4,
      "address": "101 Birch Ave, Greenfield, WI",
      "name": "Greenfield Arts Center",
      "image": "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg"
    },
   
  ]
  
  return (
    <div className="home-main-container">

      {/* <h4>What are you going to eat today</h4> */}
      <SearchBar/>
      <h4 className="highly-rated-nearby-options">Highly rated nearby options</h4>
      {dummy.map((item,index)=>{
        return(
         <Dish item={item} index={index}/>
        )
      })}

   

     
    </div>
  );
}
