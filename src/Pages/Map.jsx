import { useState, useEffect, useContext } from "react";
import { LocalAuthContext } from "../Context/LocalAuth/LocalAuthContext.jsx";
import MapComponent from "../Components/Map/MapComponent.jsx";
import "./Map.css";

export default function Map({ menuToggle, search, setSearch }) {
  // context
  const { 
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);

  return (
    <div className={`map-page-container ${menuToggle ? "fixed" : ""}`} style={{overflow: "hidden"}}>
        <MapComponent menuToggle={menuToggle} search={search} setSearch={setSearch}/>
    </div>
  )
}

