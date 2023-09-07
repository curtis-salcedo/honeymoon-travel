
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Service imports
import { getImages } from '../../utilities/services/maps-service';

// Component imports
import Accommodation from '../components/Accommodation';
import Activity from '../components/Activity';
import Meal from '../components/Meal';
import Travel from '../components/Travel';

// Style imports
import './MobileTrip.css';
import {
  Button,
  Typography,
  Card,
  CardActions,
  Grid,
  Box,
  Container,
} from '@mui/material';


export default function MobileTrip({ user, id }) {
  const {tripData} = useContext(DataContext)
  const [accommodations, setAccommodations] = useState([])
  const [activities, setActivities] = useState([])
  const [meals, setMeals] = useState([])
  const [travels, setTravels] = useState([])
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('')

  const [openAccommodation, setOpenAccommodation] = useState(false);
  const [openActivity, setOpenActivity] = useState(false);
  const [openMeal, setOpenMeal] = useState(false);
  const [openTravel, setOpenTravel] = useState(false);

  useEffect(() => {
    setAccommodations(tripData.accommodations)
    setActivities(tripData.activities)
    setMeals(tripData.meals)
    setTravels(tripData.travels)

  }, [tripData]);

  const titleStyle = {
    margin: 2,
    padding: 0,
    // marginLeft: '32px'
  }
  const style = {
    margin: 0,
    padding: 0,
    backgroundColor: 'var(--light)',
    height: '450px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }

  return (
    <Container sx={{margin:0, padding:0}}>
      <Grid container >

        <Typography variant='h5' sx={{ ...titleStyle }}>Stays</Typography>
        { accommodations ?
          <Grid item xs={12} sx={{ ...style }}>
            <Accommodation id={id} setCategory={setCategory} accommodations={accommodations} open={openAccommodation} setOpen={setOpenAccommodation} />
          </Grid>
        : null }

        <Typography variant='h5' sx={{ ...titleStyle }}>Activities</Typography>
        { activities ?
          <Grid item xs={12} sx={{ ...style }}>
            <Activity id={id} setCategory={setCategory} activities={activities} open={openActivity} setOpen={setOpenActivity} />
          </Grid>
        : null }

        <Typography variant='h5' sx={{ ...titleStyle }}>Meals</Typography>
        <Grid item xs={12}>
        { meals ?
          <Grid item xs={12} sx={{ ...style }}>
            <Meal id={id} setCategory={setCategory} meals={meals} open={openMeal} setOpen={setOpenMeal} />
          </Grid>
        : null }
        </Grid>
        
        <Typography variant='h5' sx={{ ...titleStyle }}>Travels</Typography>
        <Grid fullWidth item xs={12} sx={{ ...style }}>
        { travels ?
          <Grid item xs={12}>
            <Travel id={id} setCategory={setCategory} travels={travels} open={openTravel} setOpen={setOpenTravel} />
          </Grid>
        : null }
        </Grid>

      </Grid>
    </Container>
  );
}