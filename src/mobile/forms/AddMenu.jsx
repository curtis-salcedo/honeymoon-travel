import React, { useState } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Component imports
import AddMenuButton from '../components/buttons/AddMenuButton';
import Header from '../components/Header';

// Form Imports
import AccommodationForm from '../../components/forms/AccommodationForm/AccommodationForm';
import ActivityForm from '../../components/forms/ActivityForm/ActivityForm';
import MealForm from '../../components/forms/MealForm/MealForm';
import TravelForm from '../../components/forms/TravelForm/TravelForm';

import {
  Typography,
  Container,
  Button,
  Box,
  Modal,
  ChildModal,
  Grow,
  Grid,
  Paper,
  CardHeader,
  CardMedia,
  CardContent,
  Card
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HikingIcon from '@mui/icons-material/Hiking';
import Star from '@mui/icons-material/Star'

import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import DiningIcon from '@mui/icons-material/Dining';

export default function AddMenu({ open, setOpen, activeTrip }) {
  const [show, setShow] = useState(false)
  const [selection, setSelection] = useState(null)

  // Modal open state
  const handleClose = () => {
    setOpen(false);
  };
  // Show Form Selected
  const handleOpen = (name) => {
    setSelection(name);
    setShow(true);
  };
  const handleCancel = () => {
    if (selection) {
      setSelection(null);
    } else {
      setOpen(false)
    }
  }

  console.log(open, selection, show)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '95vh',
    width: '95vw',
    bgcolor: 'background.paper',
    border: 'var(--dark) solid 2px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '2vmin',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  return (
    <Box sx={{ ...style, border: 'solid 2px black' }}>
      { selection ?
      null
      :  
      <>
      <Grid>

        <Typography variant="h5" sx={{textAlign: 'center', marginBottom:'20px'}}>
          Select a category to add to the {activeTrip.name} trip
        </Typography>

        <Grid item xs={12} style={{display:"flex", flexDirection:"column"}}>
          <AddMenuButton text="Stay" icon={<HotelIcon/>} onClick={() => handleOpen('accommodation')} />
          <AddMenuButton text="Activity" icon={<LocalActivityIcon/>}         onClick={() => handleOpen('activity')} />
          <AddMenuButton text="Meal" icon={<DiningIcon/>} onClick={() => handleOpen('travel')} />
          <AddMenuButton text="Travel" icon={<FlightIcon/>} onClick={() => handleOpen('travel')} />
        </Grid>
      </Grid>

      {/* <Grid>
      <Button
        fullWidth
        color="primary"
        size="small"
        variant="outlined"
        outlined="true"
        onClick={() => handleOpen('accommodation')}
      >
        Add Stay
      </Button>
      <Button
        fullWidth
        color="primary"
        size="small"
        variant="outlined"
        outlined="true"
        onClick={() => handleOpen('activity')}
      >
        Add Activity
      </Button>
      <Button
        fullWidth
        color="primary"
        size="small"
        variant="outlined"
        outlined="true"
        onClick={() => handleOpen('meal')}
      >
        Add Meal
      </Button>
      <Button
        fullWidth
        color="primary"
        size="small"
        variant="outlined"
        outlined="true"
        onClick={() => handleOpen('travel')}
      >
        Add Travel
      </Button>
    </Grid>  */}
    </>
    }

      {selection && (
        <Grid container>
          {show && selection === 'accommodation' ? (
            <AccommodationForm id={activeTrip.id} setShow={setShow} />
          ) : null}
          {show && selection === 'activity' ? (
            <ActivityForm id={activeTrip.id} setShow={setShow} />
          ) : null}
          {show && selection === 'meal' ? (
            <MealForm id={activeTrip.id} setShow={setShow} />
          ) : null}
          {show && selection === 'travel' ? (
            <>
            <TravelForm id={activeTrip.id} setShow={setShow} />
            </>
            ) : null}
        </Grid>
      )}
      
        <Grid>
          { selection ?
          <Button
          fullWidth
          color="primary"
          size="small"
          variant="outlined"
          outlined="true"
          onClick={() => handleOpen(null)}
          >
          Back
        </Button>
        : null }
          <Button
          fullWidth
          color="primary"
          size="small"
          variant="outlined"
          outlined="true"
          onClick={() => handleCancel()}
          sx={{marginTop:1}}
          >
          Cancel
        </Button>
      </Grid>
    </Box>
  )
}