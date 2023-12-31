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
import MarkerMap from '../components/MarkerMap'

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
  CardActions,
  Grow,
  SwipeableDrawer,

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



export default function Itinerary({ viewItinerary }) {
  const { tripData, activeTrip } = useContext(DataContext)
  const [tripDays, setTripDays] = useState(activeTrip.tripDays)
  const [expanded, setExpanded] = useState(null);
  const [tripRange, setTripRange] = useState([])
  const categories = ['Accomodations', 'Activities', 'Meals', 'Travel'];
  const [daysObject, setDaysObject] = useState([])
  const [open, setOpen] = useState(false);
  const [data, setData] = useState('')
  const [openMap, setOpenMap] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setTripDays(activeTrip.tripDays)
    // getTripRange(tripDays)
    sortDataByDate()
  }, [])

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
  const [selected, setSelected] = useState('')
  const handleMap = (e, d) => {
    setSelected(d)
    setOpenMap(!openMap)
  }

  const listStyle = {
    padding:0,
    margin:0
  }

  return (
  <Container sx={{
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
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
        key={index}
        >
          <Paper sx={{
            m: 1,
            backgroundColor: 'var(--white)',
            minHeight: '3vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            alignContent: 'center',
            margin:0,
            padding:1,
            }} 
            elevation={2}
            >
            {day.name}
          </Paper>
          {/* <Button onClick={(e) => handleMap(e, day)}>Map Day</Button> */}
          { openMap ?
          <MarkerMap selected={selected} openMap={openMap} setOpenMap={setOpenMap} />
          : null}
        <List
        sx={{
          border: 'none',
          padding:0,
          margin:0
        }}
        >

        {day.travelDeparture.map((travel, travelIndex) => (
          <>
          <ListItem key={travelIndex} sx={{...listStyle}}>
            <ListItemAvatar >
              <Avatar>
                <AirplanemodeActiveIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Departure"
              secondary={travel.departureLocation.city}
            />
            <Button onClick={(e) => handleClick(e,'travel', travel)}>Details</Button>
            </ListItem>

            <ListItem sx={{...listStyle}}>
            <ListItemAvatar>
              <Avatar>
                <AirplanemodeActiveIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Arrival"
              secondary={travel.arrivalLocation.city}
              />
            <Button onClick={(e) => handleClick(e,'travel', travel)}>Details</Button>
            </ListItem>
          </>
        ))} 

        <Divider variant="inset" component="li" />

        {day.activities.map((activity, activityIndex) => (
          <ListItem sx={{...listStyle}}>
            <ListItemAvatar>
              <Avatar>
                <HikingIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Activiities" secondary={activity.name} />
            <Button onClick={(e) => handleClick(e,'activity', activity)}>Details</Button>
          </ListItem>
        ))}


        <Divider variant="inset" component="li" />


        {day.meals.map((meal, mealIndex) => (
        <ListItem sx={{...listStyle}}>
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
          <Button onClick={(e) => handleClick(e,'meal', meal)}>Details</Button>
        </ListItem>
        ))}


        <Divider variant="inset" component="li" />


          { day.checkIn.length > 0 ?
            day.checkIn.map((accommodation, accommodationIndex) => (
              <>
              <ListItem sx={{...listStyle}}>
                <ListItemAvatar>
                  <Avatar>
                    <HotelIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Check In" secondary={`${accommodation.address.name}`} />
              <Button onClick={(e) => handleClick(e,'accommodation', accommodation)}>Details</Button>
              </ListItem>
              </>
            ))
          : null }


          { day.checkOut.length > 0 ?
            day.checkOut.map((accommodation, accommodationIndex) => (
              <>
              <ListItem sx={{...listStyle}}>
                <ListItemAvatar>
                  <Avatar>
                    <HotelIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Check Out" secondary={`${accommodation.address.name}`} />
                <Button onClick={(e) => handleClick(e,'accommodation', accommodation)}>Details</Button>
              </ListItem>
              </>
            ))
          : null }
        </List>
      </Paper>


      )) : null }
    { open ? <Detail open={open} setOpen={setOpen} data={data} setData={setData} viewItinerary={viewItinerary} /> : null }
  </Container>
  );
}