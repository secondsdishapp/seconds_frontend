import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';

export default function ControlledCheckbox({ vegan, setVegan, vegetarian, setVegetarian, glutenFree, setGlutenFree, preference }) {
  const [checked, setChecked] = React.useState(false);

//console.log(preference, "Prefence type");

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
        if (preference === "vegetarian") {
            setVegetarian(true);
        } else if (preference === "vegan") {
            setVegan(true);
        } else if (preference === "gluten free") {
            setGlutenFree(true);
        }
    } else {
        if (preference === "vegetarian") {
            setVegetarian(false);
        } else if (preference === "vegan") {
            setVegan(false);
        } else if (preference === "gluten free") {
            setGlutenFree(false);
        }
    }
  };

  


  useEffect(() => {
    console.log(checked, "Checkbox")
  }, [checked])

  return (
    <div style={{marginTop: "20px", position: "absolute", justifyContent: "center", alignItems: "center"}}>
        <Checkbox
            checked={checked}
            onChange={(e) => handleChange(e)}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    </div>
  );
}
