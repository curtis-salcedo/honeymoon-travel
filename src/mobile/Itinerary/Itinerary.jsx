import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

import { convertDateToDetail, convertDateToLongDetail, compare } from '../../utilities/services/business-service';
import { convertDate } from '../../utilities/services/business-service';

// Component imports
import Meal from '../components/Meal';
import Travel from '../components/Travel';
import Accommodation from '../components/Accommodation';
import Activity from '../components/Activity';
import Detail from '../components/Detail'

// Style imports
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
  CardContent,

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


export default function Itinerary({}) {
  const { tripData, activeTrip } = useContext(DataContext)
  const [tripDays, setTripDays] = useState(activeTrip.tripDays)
  const [expanded, setExpanded] = useState(null);
  const [tripRange, setTripRange] = useState([])
  const categories = ['Accomodations', 'Activities', 'Meals', 'Travel'];
  const [daysObject, setDaysObject] = useState([])
  const [open, setOpen] = useState(false);
  const [data, setData] = useState('')

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
        console.log('active trip date', convertDateToDetail(date))
        const dayInfo = {
          name: convertDateToLongDetail(date),
          date: compare(date),
        };
        console.log(console.log(compare(date)))
        // Filter accommodations for the current day
        if (tripData.accommodations) {
          dayInfo.checkIn = tripData.accommodations.filter(
            accommodation => compare(accommodation.checkIn) === compare(date)
          );
          dayInfo.checkOut = tripData.accommodations.filter(
            accommodation => compare(accommodation.checkOut) === compare(date)
          );
        }
        // Filter activities for each day
        if (tripData.activities) {
          dayInfo.activities = tripData.activities.filter(
            activity => compare(activity.date) === compare(date)
          );
        }
        // Filter meals for each day
        if (tripData.meals) {
          dayInfo.meals = tripData.meals.filter(
            meal => compare(meal.date) === compare(date)
          );
        }
        // Filter travels for each day
        if (tripData.travels) {
          // Set departure first
          dayInfo.travelDeparture = tripData.travels.filter(
            travel => compare(travel.departureDateTime) === compare(date)
            );
          
          // Set arrival next
          dayInfo.travelArrival = tripData.travels.filter(
            travel => compare(travel.arrivalDateTime) === compare(date)
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

  // console.log(daysObject)
  // Display the accomodations for that day, if there is a check in and check out on same day, display both
  // Display the activities for that day
  // Display the meals for that day
  // Sort each day by time, potentially highlight conflicting times
  // Get all map place ids and plot them on the map via google

  const handleClick = (e, category, selection) => {
    console.log(selection)
    selection.category = category
    setData(selection)
    setOpen(true)
  }

  return (
  <Container sx={{
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  }}>
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
          border: 'none',
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
            <Button onClick={(e) => handleClick(e,'travel', travel)}>Details</Button>
            <Button onClick={(e) => handleClick(e,'travel', travel)}>Map</Button>
            </ListItem>

            <Divider variant="inset" component="li" />

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
          <ListItemText primary="Meals" secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {meal.address.name} - {meal.type}
              </Typography>
                {meal.isReservation ? 'Reservation' : ''}
            </>
            } />
        </ListItem>
        ))}

        <Divider variant="inset" component="li" />

          { day.checkIn.length > 0 ?
            day.checkIn.map((accommodation, accommodationIndex) => (
              <>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <HotelIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Check In" secondary={`${accommodation.address.name}`} />
              </ListItem>
              </>
            ))
          : null }


          { day.checkOut.length > 0 ?
            day.checkOut.map((accommodation, accommodationIndex) => (
              <>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <HotelIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Check Out" secondary={`${accommodation.address.name}`} />
              </ListItem>
              </>
            ))
          : null }
        </List>
      </Paper>

      )) : null }
    { open ? <Detail open={open} setOpen={setOpen} data={data} setData={setData} /> : null }
  </Container>
  );
}