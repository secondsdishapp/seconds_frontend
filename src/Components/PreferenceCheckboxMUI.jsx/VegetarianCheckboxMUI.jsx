import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';

export default function VegetarianCheckboxMUI({ vegetarian, setVegetarian }) {

  useEffect(() => {
    if (vegetarian !== null) {
        localStorage.setItem("vegetarian", JSON.stringify(vegetarian));
    }
  }, [vegetarian]);
  
  return (
    <div style={{marginTop: "20px", position: "absolute", justifyContent: "center", alignItems: "center"}}>
        <Checkbox
            checked={vegetarian}
            onChange={() => setVegetarian(!vegetarian)}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    </div>
  );
}
