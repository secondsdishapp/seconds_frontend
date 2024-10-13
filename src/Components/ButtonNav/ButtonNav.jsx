import * as React from 'react';
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MapIcon from '@mui/icons-material/Map';
import PlaceIcon from '@mui/icons-material/Place';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useState, useEffect } from 'react';


export default function FixedBottomNavigation({ setCount, count, menuToggle, setMenuToggle, value, setValue }) {
 
  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
 
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: '100' }} elevation={0}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            setMenuToggle(false);
          }}
        >
          <BottomNavigationAction style={{color: value === 0 ? "#009688" : "#FF5252"}} label="Map" icon={<PlaceIcon htmlColor='inherit' />} component={Link} to="/map" />
          <BottomNavigationAction style={{color: value === 1 ? "#009688" : "#FF5252"}} label="Home" icon={<RestaurantIcon htmlColor='inherit'/>} component={Link} to="/" />
          <BottomNavigationAction style={{color: value === 2 ? "#009688" : "#FF5252"}} label="Dishes" icon={<FavoriteIcon htmlColor='inherit'/>} component ={Link} to="/dishes" />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

// https://mui.com/material-ui/react-bottom-navigation/