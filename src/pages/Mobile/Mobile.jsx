import React, { useState } from 'react';

// Component imports

// Page imports

// Style imports
import './Mobile.css';
import {
  Button,
  Typography,
  Card,
  CardActions,
  Grid,
  Container,
  CardMedia,
  ButtonBase,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


export default function Mobile() {
  const [value, setValue] = React.useState(0);
  // Get menu dropdown for selecting the correct trip
  // Get the data for the trip selected
  // Add a view on map button to replace the map component with the map view
  return (
    <>
    <div className='MobileContainer'>
    <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
      <div className='MobileContent' > 
        <Typography variant="h4" component="h1" gutterBottom>
          
        </Typography>
      </div>

      <div className='MobileFooter'>
        <Box sx={{ width: '100%', bottom: 0, position: 'sticky'  }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Box>
      </div>
    </Container>
    </div>
    </>
  );
}