import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';

export default function VeganCheckboxMUI({ vegan, setVegan }) {

  useEffect(() => {
    if (vegan !== null) {
        localStorage.setItem("vegan", JSON.stringify(vegan));
    }
  }, [vegan]);

  return (
    <div style={{marginTop: "20px", position: "absolute", justifyContent: "center", alignItems: "center"}}>
        <Checkbox
            checked={vegan}
            onChange={() => setVegan(!vegan)}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    </div>
  );
}