
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
  const {activeData} = useContext(DataContext)
  const [accommodations, setAccommodations] = useState([])
  const [activities, setActivities] = useState([])
  const [meals, setMeals] = useState([])
  const [travels, setTravels] = useState([])

  useEffect(() => {
    setAccommodations(activeData.activeAccommodations)
    setActivities(activeData.activeActivities)
    setMeals(activeData.activeMeals)
    setTravels(activeData.activeTrip)
  }, [activeData, id]);

  console.log(activeData)

  // Potential handleViews function: Address, Map,

  return (
    <Container>
      <Grid container >

        <Typography>Stays</Typography>
        { accommodations ?
          <Grid item xs={12}>
            <Accommodation id={id} accommodations={accommodations}/>
          </Grid>
        : null }

        <Typography>Activities</Typography>
        { activities ?
          <Grid item xs={12}>
            <Activity id={id} activities={activities}/>
          </Grid>
        : null }

        <Typography>Meals</Typography>
        <Grid item xs={12}>
        { meals ?
            <Meal id={id} meals={meals} />
        : null }
        </Grid>
        
        <Typography>Travels</Typography>
        <Grid fullWidth item xs={12}>
        { travels ?
          <Travel id={id} travels={travels} />
        : null }
        </Grid>

      </Grid>
    </Container>
  );
}