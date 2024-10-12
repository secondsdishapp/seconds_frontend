import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputMUI({ radius, setRadius }) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 0, width: '40vw' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Radius (mi)" variant="standard" onChange={(e) => setRadius(Number(e.target.value))}  />
    </Box>
  );
}
