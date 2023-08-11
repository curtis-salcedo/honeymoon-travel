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
      <form onSubmit={handleSubmit}>
      <Container>
        <Grid container spacing={2}>

          {/* Type */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={activityData.type}
                onChange={handleChange}
                required
              >
                <MenuItem value="Tour">Tour</MenuItem>
                <MenuItem value="Class">Class</MenuItem>
                <MenuItem value="Hike">Hike</MenuItem>
                <MenuItem value="Adventure">Adventure</MenuItem>
                <MenuItem value="Relaxation">Relaxation</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Nightlife">Nightlife</MenuItem>
                <MenuItem value="Workshop">Workshop</MenuItem>
                <MenuItem value="Cultural Event">Cultural Event</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Museum">Museum</MenuItem>
                <MenuItem value="Sightseeing">Sightseeing</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Activity Name */}
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Activity Name"
              name="name"
              value={activityData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Date */}
          {/* Note: You might want to add a Date picker component here */}

          {/* Start Time and End Time */}
          <Grid item xs={12} sm={6}>
            <div>Time</div>
            <label htmlFor="">Start Time</label>
            <TextField
              type="time"
              name="startTime"
              value={activityData.startTime}
              onChange={handleChange}
              fullWidth
              required
            />
            <label htmlFor="">End Time</label>
            <TextField
              type="time"
              name="endTime"
              value={activityData.endTime}
              onChange={handleChange}
              fullWidth
            />
            <label>Date</label>
            <TextField
              type="date"
              name="date"
              value={activityData.arrival}
              onChange={handleChange}
              fullWidth
              required
              />
          </Grid>

          {/* Location */}
          <Grid item xs={12} sm={6}>
            <div>Location</div>
            <TextField
              type="text"
              label="Location"
              name="location"
              value={activityData.location}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Details */}
          <Grid item xs={12} sm={6}>
            <div>Details</div>
            <TextField
              type="text"
              label="Details"
              name="details"
              value={activityData.details}
              onChange={handleChange}
              fullWidth
              multiline
            />
          </Grid>

          {/* Submit Button */}
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