import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

import { convertDateToLongDetail } from '../../utilities/services/business-service';
import { convertDate } from '../../utilities/services/business-service';

// Component imports
import Meal from '../Meal/Meal';
import Travel from '../Travel/Travel';
import Accommodation from '../Accommodation/Accommodation';
import Activity from '../Activity/Activity';

// Style imports
import './Itinerary.css';
import { 
  Container,
  Button,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Box,
  Card,

} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import HikingIcon from '@mui/icons-material/Hiking';
import {
  KeyboardArrowRight,
  KeyboardArrowDown,

} from '@mui/icons-material';


export default function Itinerary({ activeTrip }) {
  const [tripDays, setTripDays] = useState(activeTrip.tripDays)
  const [expanded, setExpanded] = useState(null);
  const [tripRange, setTripRange] = useState([])
  const categories = ['Accomodations', 'Activities', 'Meals', 'Travel'];
  const { allData, activeAccommodations, activeMeals, activeActivities, activeTravels } = useContext(DataContext)
  const [daysObject, setDaysObject] = useState([])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setTripDays(activeTrip.tripDays)
    // getTripRange(tripDays)
    sortDataByDate()
  }, [])

  const getTripRange = (tripDays) => {
    // Get the trip days and convert the start date and end date to long format
    // Gaurd against empty array
    if (tripDays.length > 0) {
      const start = convertDateToLongDetail(tripDays[0])
      const end = convertDateToLongDetail(tripDays[tripDays.length - 1])
      return `${start} to ${end}`
    }
  }

  // Show a breakdown by day
  async function sortDataByDate() {
    try {
      // Initialize daysObject
      const daysObject = [];
      // For each day in tripDays
      activeTrip.tripDays.forEach((date, index) => {
        // Create an object for the current day
        const dayInfo = {
          name: convertDateToLongDetail(date),
          date: date,
        };
        // Filter accommodations for the current day
        if (activeAccommodations) {
          dayInfo.checkIn = activeAccommodations.filter(
            accommodation => accommodation.checkInDate === date
          );
          dayInfo.checkOut = activeAccommodations.filter(
            accommodation => accommodation.checkOutDate === date
          );
        }
        // Filter activities for each day
        if (activeActivities) {
          dayInfo.activities = activeActivities.filter(
            activity => activity.date === date
          );
        }
        // Filter meals for each day
        if (activeMeals) {
          dayInfo.meals = activeMeals.filter(
            meal => meal.date === date
          );
        }
        // Filter travels for each day
        if (activeTravels) {
          // Set departure first
          dayInfo.travelDeparture = activeTravels.filter(
            travel => travel.departureDateTime.slice(0,9) === date.slice(0,9)
          );
          // Set arrival next
          dayInfo.travelArrival = activeTravels.filter(
            travel => travel.arrivalDateTime.slice(0,9) === date.slice(0,9)
          );
        }

        // Push the day's info to the daysObject
        daysObject.push(dayInfo);
      });
      setDaysObject(daysObject)
    } catch (err) {
      console.log(err);
    }
  }
  console.log(daysObject)
  // Display the accomodations for that day, if there is a check in and check out on same day, display both
  // Display the activities for that day
  // Display the meals for that day
  // Sort each day by time, potentially highlight conflicting times
  // Get all map place ids and plot them on the map via google

  return (
  <Container>
    <Button onClick={sortDataByDate}>Refresh</Button>
    { daysObject ? 
      daysObject.map((day, index) => (
      <Paper
        elevation={2}
        sx={{
          padding: 2,
          margin: 2,
          backgroundColor: 'var(--light)',
        }}
        >
        {day.name}
        <List
        sx={{
          width: '750px',
          maxWidth: '100%',
        }}
        >

        {day.travelDeparture.map((travel, travelIndex) => (
          <>
          <ListItem key={travelIndex}>
            <ListItemAvatar>
              <Avatar>
                <AirplanemodeActiveIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Departure"
              secondary={travel.departureLocation.city}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AirplanemodeActiveIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Arrival"
              secondary={travel.arrivalLocation.city}
            />
          </ListItem>
          </>
        ))} 
        <Divider variant="inset" component="li" />

        {day.activities.map((activity, activityIndex) => (
          <ListItem>
          <ListItemAvatar>
            <Avatar>
              <HikingIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Activiities" secondary={activity.name} />
        </ListItem>
        ))}

        <Divider variant="inset" component="li" />

        {day.meals.map((meal, mealIndex) => (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalDiningIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Meals" secondary={meal.type} />
        </ListItem>
        ))}

        <Divider variant="inset" component="li" />

        {day.checkIn.map((accommodation, accommodationIndex) => (
          <ListItem>
          <ListItemAvatar>
            <Avatar>
              <HotelIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="CheckIn" secondary={accommodation.type} />
        </ListItem>
        ))}

        {day.checkOut.map((accommodation, accommodationIndex) => (
          <ListItem>
          <ListItemAvatar>
            <Avatar>
              <HotelIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="CheckOut" secondary={accommodation.type} />
        </ListItem>
        ))}

        </List>
      </Paper>

      )) : null }
  </Container>
  );
}