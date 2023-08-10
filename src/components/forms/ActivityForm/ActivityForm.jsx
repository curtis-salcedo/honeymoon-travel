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
  const [activityData, setActivityData] = useState({
    tripId: activeTrip._id,
    name: '',
    type: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(name,value, type, checked, newValue)
    setActivityData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  
  const handleSubmit = async (e) => {
    console.log('activity data in submit', activityData)
    e.preventDefault();
    try {
      // Handle form submission to the backend here
      console.log('activity data in submit', activityData)
      await activitiesAPI.createActivity(activityData);
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
    <h1>Activity Form</h1>
    <form onSubmit={handleSubmit}>
      <Container>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={activityData.type}
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
              value={activityData.name}
              onChange={handleChange}
              fullWidth
              />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Type</div>
            <TextField
              type="text"
              name="type"
              value={activityData.type}
              onChange={handleChange}
              fullWidth
              />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Time</div>
            <TextField
              type="time"
              name="startTime"
              value={activityData.startTime}
              onChange={handleChange}
              fullWidth
              />
            <TextField
              type="time"
              name="endTime"
              value={activityData.endTime}
              onChange={handleChange}
              fullWidth
              />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Location</div>
            <TextField
              type="text"
              name="location"
              value={activityData.location}
              onChange={handleChange}
              fullWidth
              />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>Details</div>
            <TextField
              type="textarea"
              name="details"
              value={activityData.details}
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