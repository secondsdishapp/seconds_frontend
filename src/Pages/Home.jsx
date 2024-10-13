import React, { useState, useEffect, useContext } from "react";
import { LocalAuthContext } from "../Context/LocalAuth/LocalAuthContext.jsx";
import NearByOptions from "../Components/NearbyOptions/NearbyOptions";

const user = {
  user_id: 6,
  name: "Eater",
  email: "eater@gmail.com"
}

  export default function Home({count, menuToggle}) {
  const { isLocalLoggedIn, localUser, localLogin, localLogout } = React.useContext(LocalAuthContext);

  return (
    <div>
      <h1>Hello, {localUser.name}!</h1>
      <button onClick={() => localLogin(user)}>Login</button>
      <button onClick={() => localLogout(user)}>Logout</button>
      <NearByOptions count={count} menuToggle={menuToggle}/>
    </div>
  );
}
