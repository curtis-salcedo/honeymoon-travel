
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

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
  
  // Potential handleViews function: Address, Map,

  return (
    <Container>
      <Grid container >

        <Typography variant='h5'>Stays</Typography>
        { accommodations ?
          <Grid item xs={12}>
            <Accommodation id={id} setCategory={setCategory} accommodations={accommodations} open={openAccommodation} setOpen={setOpenAccommodation} />
          </Grid>
        : null }

        <Typography variant='h5'>Activities</Typography>
        { activities ?
          <Grid item xs={12}>
            <Activity id={id} setCategory={setCategory} activities={activities} open={openActivity} setOpen={setOpenActivity} />
          </Grid>
        : null }

        <Typography variant='h5'>Meals</Typography>
        <Grid item xs={12}>
        { meals ?
          <Grid item xs={12}>
            <Meal id={id} setCategory={setCategory} meals={meals} open={openMeal} setOpen={setOpenMeal} />
          </Grid>
        : null }
        </Grid>
        
        <Typography variant='h5'>Travels</Typography>
        <Grid fullWidth item xs={12}>
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