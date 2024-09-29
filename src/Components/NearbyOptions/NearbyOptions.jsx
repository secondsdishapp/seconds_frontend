import SearchBar from "../../Components/SearchBar/SearchBar";
export default function NearByOptions() {
  let dummy=[
    {
      "address": "123 Main St, Springfield, IL",
      "name": "Springfield Library",
      "image": "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg"
    },
    {
      "address": "456 Elm St, Oakwood, TX",
      "name": "Oakwood Community Center",
      "image": "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg"
    },
    {
      "address": "789 Pine St, Maple City, CA",
      "name": "Maple City Park",
      "image": "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg"
    },
    {
      "address": "101 Birch Ave, Greenfield, WI",
      "name": "Greenfield Arts Center",
      "image": "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/sandwiches/spicy-mayo-fried-chicken-sandwich/crispychickensandwich_1206x709.jpg"
    },
   
  ]
  
  return (
    <div className="home-main-container">

      {/* <h4>What are you going to eat today</h4> */}
      <SearchBar/>
      <h4>Highly rated nearby options</h4>
      {dummy.map((item,index)=>{
        return(
          <div className="nearbyoptions-container" key={index}>
            <div className="nearbyoptions-item">
            <img className="nearbyoptions-item-image" src={item.image} alt="" />
              <div className="nearbyoptions-item-name&address">
              <h5>{item.name}</h5>
              <p className="neabyoptions-item-address">{item.address}</p>
              </div>
             
            </div>
          </div>
        )
      })}

   

     
    </div>
  );
}
