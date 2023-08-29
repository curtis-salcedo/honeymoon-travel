
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Component imports
import Accommodation from '../../components/Accommodation/Accommodation';
import Activity from '../../components/Activity/Activity';
import Meal from '../../components/Meal/Meal';
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
  const {activeData} = useContext(DataContext)
  const [accommodations, setAccommodations] = useState([])
  const [activities, setActivities] = useState([])
  const [meals, setMeals] = useState([])
  const [travels, setTravels] = useState([])

  useEffect(() => {
    setAccommodations(activeData.activeAccommodation)
    setActivities(activeData.activeActivity)
    setMeals(activeData.activeMeal)
    setTravels(activeData.activeTrip)
  }, [activeData, id]);

  console.log(activeData)

  // Potential handleViews function: Address, Map,

  return (
    <Container>
      <h1>Mobile Trip</h1>
      <Grid container >

        { accommodations ?
          <Grid item xs={12}>
            <Accommodation id={id} />
          </Grid>
        : null }


        { activities ?
          <Grid item xs={12}>
            <Activity id={id} />
          </Grid>
        : null }

        { meals ?
          <Grid item xs={12}>
            <Meal id={id} />
          </Grid>
        : null }
        <Typography>Travel Information</Typography>
        { travels ?
          <Grid fullWidth item xs={12}>
            <Travel id={id} />
          </Grid>
        : null }

      </Grid>
    </Container>
  );
}