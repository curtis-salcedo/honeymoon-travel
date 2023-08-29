import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../utilities/DataContext';

// Service Imports
import { getTrips } from '../utilities/services/trips-service';

// Component imports
import TripDetails from '../components/TripDetails/TripDetails';
import Landing from './Landing/Landing';
import MobileTrip from './MobileTrip/MobileTrip';

// Form Imports
import TripForm from '../components/forms/TripForm/TripForm'


// Page imports
import Trip from '../pages/Trip/Trip';


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


export default function Mobile({ user }) {
  const { activeTrip, setActiveTrip } = useContext(DataContext)
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false)
  const [userTrips, setUserTrips] = useState([])

  useEffect(() => {
    async function fetchTrips() {
      try {
        const fetchedTrips = await getTrips();
        setUserTrips(fetchedTrips);
      } catch (error) {
        console.error('No Trips created or there was an error fetching trips:', error);
      }
    }
    fetchTrips();
  }, [activeTrip]);

  const handleShow = () => {
    setShow(!show)
  };
  // Get menu dropdown for selecting the correct trip
  // Get the data for the trip selected
  // Add a view on map button to replace the map component with the map view

  return (
    <>
    <div className='MobileContainer'>

        <div className='MobileContent' >
          <Container sx={{ display:'flex', backgroundColor: 'cyan', textAlign:'center', height: '6vh', justifyContent: 'center', alignItems: 'center' }}>
            Honeymoon Travel
          </Container>

          { activeTrip && activeTrip._id ?
            <Container>
              { activeTrip.name }
              <MobileTrip id={activeTrip._id} />
            </Container>
          :
            <Landing user={user} />
          }
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

    </div>
    </>
  );
}