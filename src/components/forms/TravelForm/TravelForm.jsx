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
    cost: '',
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
    console.log('travelData in submit', travelData)
    e.preventDefault();
    try {
      // Handle form submission to the backend here
      console.log('travelData in submit', travelData)
      await travelsAPI.createTravel(travelData);
    } catch (err) {
      console.log('Error at submitting travelData', err)
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
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={travelData.type}
                onChange={handleChange}
                required
              >
                <MenuItem value="Hotel">Hotel</MenuItem>
                <MenuItem value="Airbnb">Airbnb</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Activity Name</div>
            <TextField
              type="text"
              name="name"
              value={travelData.name}
              onChange={handleChange}
              fullWidth
              />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Type</div>
            <TextField
              type="text"
              name="type"
              value={travelData.type}
              onChange={handleChange}
              fullWidth
              />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Time</div>
            <TextField
              type="time"
              name="startTime"
              value={travelData.startTime}
              onChange={handleChange}
              fullWidth
              />
            <TextField
              type="time"
              name="endTime"
              value={travelData.endTime}
              onChange={handleChange}
              fullWidth
              />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Location</div>
            <TextField
              type="text"
              name="location"
              value={travelData.location}
              onChange={handleChange}
              fullWidth
              />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Details</div>
            <TextField
              type="textarea"
              name="details"
              value={travelData.details}
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