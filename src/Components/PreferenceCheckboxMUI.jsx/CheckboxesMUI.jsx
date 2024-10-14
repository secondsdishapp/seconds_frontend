import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';

export default function ControlledCheckbox({ vegetarian, setVegetarian }) {
  const [checked, setChecked] = React.useState(false);


  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
        setVegetarian(true);
    } else {
        setVegetarian(false);
    }
  };

  useEffect(() => {
    console.log(checked, "Checkbox")
  }, [checked])

  return (
    <div style={{marginTop: "20px", position: "absolute", justifyContent: "center", alignItems: "center"}}>
        <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    </div>
  );
}
