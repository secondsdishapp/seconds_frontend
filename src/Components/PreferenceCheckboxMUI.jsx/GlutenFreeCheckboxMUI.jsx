import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';

export default function GlutenFreeCheckboxMUI({ glutenFree, setGlutenFree }) {

    useEffect(() => {
        if (glutenFree !== null) {
            localStorage.setItem("glutenFree", JSON.stringify(glutenFree));
        }
      }, [glutenFree]);

  return (
    <div style={{marginTop: "20px", position: "absolute", justifyContent: "center", alignItems: "center"}}>
        <Checkbox
            checked={glutenFree}
            onChange={() => setGlutenFree(!glutenFree)}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    </div>
  );
}
