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


export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);


  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
 
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Map" icon={<PlaceIcon />} component={Link} to="/map" />
          <BottomNavigationAction label="Home" icon={<RestaurantIcon />} component={Link} to="/"/>
          <BottomNavigationAction label="Dishes" icon={<FavoriteIcon />} component ={Link} to="/dishes"/>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

// https://mui.com/material-ui/react-bottom-navigation/