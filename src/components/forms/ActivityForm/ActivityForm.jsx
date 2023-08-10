import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../utilities/DataContext';

// API Imports
import * as activitiesAPI from '../../../utilities/api/activities-api';

// Style Imports
import './ActivityForm.css';
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
  Container,
  FormControlLabel,
  Switch,
} from '@mui/material';

export default function ActivityForm({ id, day, setShow }) {
  const { activeTrip } = useContext(DataContext)
  const [tripId, setTripId] = useState(activeTrip)
  const [accommodationData, setAccommodationData] = useState({
    tripId: activeTrip._id,
    type: '',
    checkInDate: '',
    checkOutDate: '',
    checkInTime: '',
    checkOutTime: '',
    location: '',
    hasWasherDryer: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(name,value, type, checked, newValue)
    setAccommodationData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  
  const handleSubmit = async (e) => {
    console.log('activity data in submit', accommodationData)
    e.preventDefault();
    try {
      // Handle form submission to the backend here
      console.log('activity data in submit', accommodationData)
      await activitiesAPI.createAccommodation(accommodationData);
    } catch (err) {
      console.log('Error at submitting activity', err)
    }
    setShow(false)
  };

  useEffect(() => {
    setTripId(activeTrip._id)
  }, [activeTrip])

  return (
    <main>
    <h1>Accommodation Form</h1>
    <form onSubmit={handleSubmit}>
      <Container>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={accommodationData.type}
                onChange={handleChange}
                required
              >
                <MenuItem value="Hotel">Hotel</MenuItem>
                <MenuItem value="Airbnb">Airbnb</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Check-in Date</div>
            <TextField
              type="date"
              name="checkInDate"
              value={accommodationData.startDate}
              onChange={handleChange}
              fullWidth
              />
            <TextField
              type="time"
              name="checkInTime"
              value={accommodationData.startDate}
              onChange={handleChange}
              fullWidth
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div>Check-Out Date</div>
            <TextField
              type="date"
              name="checkOutDate"
              value={accommodationData.startDate}
              onChange={handleChange}
              fullWidth
              />
            <TextField
              type="time"
              name="checkOutTime"
              value={accommodationData.startDate}
              onChange={handleChange}
              fullWidth
              />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  type='checkbox'
                  name="hasWasherDryer"
                  checked={accommodationData.hasWasherDryer}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Washer/Dryer"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="location"
              type="text"
              name="location"
              value={accommodationData.location}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>

        </Grid>
      </Container>
    </form>
  </main>
  );
}