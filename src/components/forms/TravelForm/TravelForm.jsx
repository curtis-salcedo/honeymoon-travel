import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../utilities/DataContext';

// API Imports
import * as travelsAPI from '../../../utilities/api/travels-api';

// Style Imports
import './TravelForm.css';
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
  Checkbox,
} from '@mui/material';

export default function TravelForm({ id, day, setShow }) {
  const { activeTrip } = useContext(DataContext)
  const [tripId, setTripId] = useState(activeTrip)
  const [travelData, setTravelData] = useState({
    tripId: activeTrip._id,
    type: '', // This is an ENUM ['Flight', 'Train', 'Cab', 'Bus', 'Ferry']
    startLocation: '', // Eventual Address
    endLocation: '', // Eventual Address
    identifier: '',
    departure: '',
    arrival: '',
    isBooked: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(name,value, type, checked, newValue)
    setTravelData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  
  const handleSubmit = async (e) => {
    console.log('travel data in submit', travelData)
    e.preventDefault();
    try {
      // Handle form submission to the backend here
      console.log('travel data in submit', travelData)
      await travelsAPI.createTravel(travelData);
    } catch (err) {
      console.log('Error at submitting travel data', err)
    }
    setShow(false)
  };

  useEffect(() => {
    setTripId(activeTrip._id)
  }, [activeTrip])

  return (
    <main>
    <h1>Activity Form</h1>
    <form onSubmit={handleSubmit}>
    <Container>
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={travelData.type}
            onChange={handleChange}
            required
          >
            <MenuItem value="Flight">Flight</MenuItem>
            <MenuItem value="Train">Train</MenuItem>
            <MenuItem value="Cab">Cab</MenuItem>
            <MenuItem value="Bus">Bus</MenuItem>
            <MenuItem value="Ferry">Ferry</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          type="text"
          label="Start Location"
          name="startLocation"
          value={travelData.startLocation}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          type="text"
          label="End Location"
          name="endLocation"
          value={travelData.endLocation}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <label>Departure</label>
        <TextField
          type="datetime-local"
          name="departure"
          value={travelData.departure}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <label>Arrival</label>
        <TextField
          type="datetime-local"
          name="arrival"
          value={travelData.arrival}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          type="text"
          label="Identifier"
          name="identifier"
          value={travelData.identifier}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="isBooked"
              checked={travelData.isBooked}
              onChange={handleChange}
            />
          }
          label="Is Booked"
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