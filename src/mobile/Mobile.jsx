import React, { useState, useEffect, useContext } from 'react';
import { useRef } from 'react';
import { DataContext } from '../utilities/DataContext';

// Service Imports
import { getTrips } from '../utilities/services/trips-service';
import { getTripById } from '../utilities/api/trips-api';
import { logOut } from '../utilities/services/users-service'

// Component imports
import TripDetails from '../components/TripDetails/TripDetails';
import Landing from './Landing/Landing';
import MobileTrip from './MobileTrip/MobileTrip';
import Itinerary from './Itinerary/Itinerary';
import Header from './components/Header';

// Form Imports
import TripForm from '../components/forms/TripForm/TripForm'
import AddMenu from './forms/AddMenu'


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
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Settings from '@mui/icons-material/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';

export default function Mobile({ user, setUser }) {
  const { activeTrip, setActiveTrip, tripData } = useContext(DataContext)
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false)
  const [userTrips, setUserTrips] = useState([])
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [trip, setTrip] = useState(null)
  const [openAddMenu, setOpenAddMenu] = useState(false)
  const [viewItinerary, setViewItinerary] = useState(false)

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
  const handleLogout = () => {
    logOut();
    setUser(null)
    console.log(user)
    console.log(localStorage('token'))
  }
  const handleAdd = () => {
    setOpenAddMenu(!openAddMenu)
  }
  const handleItinerary = () => {
    setViewItinerary(!viewItinerary)
  }


  return (
    <>
    <div className='MobileContainer'>

        <div className='MobileContent' >

          { activeTrip ?
            <Container sx={{margin:0,padding:0}}>
              <Header activeTrip={activeTrip} />
              { viewItinerary ?
              <Itinerary viewItinerary={viewItinerary} />
              : 
              <MobileTrip id={activeTrip._id} />
              }
            </Container>
          :
            <Landing user={user} />
          }
        </div>
        <div className='MobileFooter'>
          <Box sx={{ width: '100%', bottom: 0, position: 'sticky', margin: 0, padding: 0 }}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Add" icon={<AddCircleOutlineIcon />} onClick={handleAdd} />
              <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
              { viewItinerary ?
                <BottomNavigationAction label="Itinerary" icon={<ListAltIcon />} onClick={handleItinerary} />
                : 
                <BottomNavigationAction label="Trip" icon={<ViewAgendaIcon />} onClick={handleItinerary} />
              }
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
                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
    { openAddMenu ? <AddMenu open={openAddMenu} setOpen={setOpenAddMenu} id={activeTrip._id} /> : null }
    </>
  );
}