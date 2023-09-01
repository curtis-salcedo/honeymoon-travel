import React, { useState, useEffect, useContext } from 'react';
import { useRef } from 'react';
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
  Paper,
  MenuList,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
  Stack,
  CardHeader,
  Avatar,
  IconButton,
  Collapse,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Settings from '@mui/icons-material/Settings';


export default function Mobile({ user }) {
  const { activeTrip, setActiveTrip } = useContext(DataContext)
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false)
  const [userTrips, setUserTrips] = useState([])
  const [settingsOpen, setSettingsOpen] = useState(false)

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
  // Show the settings menu
  const handleSettings = () => {
    setSettingsOpen(!settingsOpen)
  }
  // Get menu dropdown for selecting the correct trip
  // Get the data for the trip selected
  // Add a view on map button to replace the map component with the map view



  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  // Need to add Itinerary view


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
              <BottomNavigationAction
                ref={anchorRef}
                icon={<Settings />}
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                id="composition-button"
                label="Settings"
                aria-haspopup="true"
                onClick={handleToggle}
              />
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>Profile</MenuItem>
                          <MenuItem onClick={handleClose}>My account</MenuItem>
                          <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </BottomNavigation>
          </Box>
        </div>

    </div>
    </>
  );
}