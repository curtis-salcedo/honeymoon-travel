
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

        <Typography>Stays</Typography>
        { accommodations ?
          <Grid item xs={12}>
            <Accommodation id={id} accommodations={accommodations} open={open} setOpen={setOpen} />
          </Grid>
        : null }

        <Typography>Activities</Typography>
        { activities ?
          <Grid item xs={12}>
            <Activity id={id} activities={activities} open={open} setOpen={setOpen} />
          </Grid>
        : null }

        <Typography>Meals</Typography>
        <Grid item xs={12}>
        { meals ?
          <Grid item xs={12}>
            <Meal id={id} meals={meals} open={open} setOpen={setOpen} />
          </Grid>
        : null }
        </Grid>
        
        <Typography>Travels</Typography>
        <Grid fullWidth item xs={12}>
        { travels ?
          <Grid item xs={12}>
            <Travel id={id} travels={travels} open={open} setOpen={setOpen} />
          </Grid>
        : null }
        </Grid>

      </Grid>
    </Container>
  );
}