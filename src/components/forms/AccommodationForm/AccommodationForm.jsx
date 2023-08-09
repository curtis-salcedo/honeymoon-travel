import React, { useState } from 'react';

// API Imports
import * as accommodationsAPI from '../../../utilities/api/accommodations-api';

// Style Imports
import './AccommodationForm.css';
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

export default function AccommodationForm({ id, day }) {
  const [show, setShow] = useState(false)
  const [accommodationData, setAccommodationData] = useState({
    tripId: id,
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
    console.log('accommodation data in submit', accommodationData)
    e.preventDefault();
    try {
      // Handle form submission to the backend here
      console.log('accommodation data in submit', accommodationData)
      await accommodationsAPI.createAccommodation(accommodationData);
    } catch (err) {
      console.log('Error at submitting meal', err)
    }
    setShow(false)
  };
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
              label="Reservation"
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