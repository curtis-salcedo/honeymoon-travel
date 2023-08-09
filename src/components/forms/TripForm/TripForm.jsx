import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Service Imports

// API Imports
import * as tripsAPI from '../../../utilities/api/trips-api';

// Utility Imports

// Page Imports

// Style Imports
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

export default function TripForm({ user }) {
  const [tripData, setTripData] = useState({
    user: user._id,
    name: '',
    startDate: '',
    endDate: '',
    tripDays: [],
    travelDays: '',
    nonTravelDays: '',
  });

  const [tripDays, setTripDays] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    getTripDates(tripData.startDate, tripData.endDate)
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTripData((prevData) => ({
      ...prevData,
      tripDays: tripDays,
    }));
    try {
      // Handle form submission to the backend here
      console.log('trip data in submit', tripData)
      await tripsAPI.createTrip(tripData);
    } catch (err) {
      console.log('Error at submitting trip', err)
    }
  };

  const getTripDates = (start, end) => {
    // Get the dates between the start and end dates and set the state for travel and non-travel days
    const startDate = new Date(start);
    const endDate = new Date(end);
    const one_day =  (1000 * 60 * 60 * 24);
    let trip_length;
    trip_length = Math.round((endDate.getTime() - startDate.getTime()) / one_day);

    // If trip_length is 0 or below or NaN, set it to 0
    if ( isNaN(trip_length) || trip_length <= 0 ) {
      trip_length = 0;
    }

    // Set up an array for days of trip
    const tripArray = [];

    // Loop through the trip_length and add the days to the tripArray
    for (let i = 0; i <= trip_length; i++) {
      const tripStart = new Date(startDate.getTime() + i * one_day);
      tripArray.push(tripStart.toISOString().split('T')[0]);
    }
    
    // Set tripArray to days of trip state
    setTripDays(tripArray);
    setTripData((prevData) => ({
      ...prevData,
      tripDays: tripArray,
      nonTravelDays: tripArray,
    }));
  };

  // useEffect to refresh screen when start and end dates are entered
  useEffect(() => {
    // Refresh screen when start and end dates are entered
    if (tripData.startDate && tripData.endDate) {
      getTripDates(tripData.startDate, tripData.endDate);
    }
  }, [tripData.startDate, tripData.endDate]);

    return (
      <main>
        <form onSubmit={handleSubmit}>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Trip Name"
              type="text"
              name="name"
              value={tripData.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Start Date</div>
            <TextField
              type="date"
              name="startDate"
              value={tripData.startDate}
              onChange={handleChange}
              fullWidth
              />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>End Date</div>
            <TextField
              type="date"
              name="endDate"
              value={tripData.endDate}
              onChange={handleChange}
              fullWidth
              />
          </Grid>

          <Grid item xs={12}>
            <div>Trip Length is {tripDays.length} days</div>
            { tripDays.map((day) => (
              <Card key={day} sx={{ minWidth: 275 }}>
                <CardContent>
                  <div>{day}</div>
                </CardContent>
              </Card>
            ))}
          </Grid>
          
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </main>
    )
  };
  