import { useContext } from "react";
import { LocalAuthContext } from "../Context/LocalAuth/LocalAuthContext.jsx";
import NearByOptions from "../Components/NearbyOptions/NearbyOptions";

// local user
const user = {
  user_id: 6,
  name: "Eater",
  email: "eater@gmail.com"
}

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
      <h1>Hello, {localUser.name}!</h1>
      <button onClick={() => localLogin(user)}>Login</button>
      <button onClick={() => localLogout(user)}>Logout</button>
      <NearByOptions count={count} menuToggle={menuToggle}/>
    </div>
  );
}
