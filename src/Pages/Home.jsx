import { useContext } from "react";
import { LocalAuthContext } from "../Context/LocalAuth/LocalAuthContext.jsx";
import NearByOptions from "../Components/NearbyOptions/NearbyOptions";

export default function Home({count, menuToggle}) {
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
      <NearByOptions count={count} menuToggle={menuToggle}/>
    </div>
  );
}
