import { useNavigate } from "react-router-dom"

export default function Dish({item,index}) {
    let navigate = useNavigate()

  return (
    <div onClick={()=>navigate(`/dishes/${item.id}`)}  className="nearbyoptions-container" key={index}>
    <div className="nearbyoptions-item">
    <img className="nearbyoptions-item-image" src={item.image} alt="" />
      <div className="nearbyoptions-item-name&address">
      <h5>{item.name}</h5>
      <p className="neabyoptions-item-address">{item.address}</p>
      </div>
     
    </div>
  </div>
  )
}