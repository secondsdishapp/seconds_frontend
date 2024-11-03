import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';

export default function VegetarianCheckboxMUI({ vegetarian, setVegetarian, activeUser}) {

  useEffect(() => {
    if (activeUser[0]?.is_vegetarian) {
      setVegetarian(activeUser[0]?.is_vegetarian);
    }
  }, [activeUser[0]?.is_vegetarian]);

  // useEffect(() => {
  //   if (vegetarian !== null) {
  //       localStorage.setItem("vegetarian", JSON.stringify(vegetarian));
  //   }
  // }, [vegetarian]);
  
  return (
    <div style={{marginTop: "20px", position: "absolute", justifyContent: "center", alignItems: "center"}}>
        <Checkbox
            checked={vegetarian}
            onChange={() => { 
              setVegetarian(!vegetarian);
              console.log(vegetarian, "Vegetarian MUI");
            }}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    </div>
  );
}
