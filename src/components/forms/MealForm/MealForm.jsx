import React, { useEffect, useState } from 'react';

// Service Imports

// API Imports
import * as mealsAPI from '../../../utilities/api/meals-api';

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
  Container,
  FormControlLabel,
  Switch,
} from '@mui/material';

export default function MealForm({ id, day, setShow }) {
  const [mealData, setMealData] = useState({
    tripId: id,
    date: day,
    type: '',
    isReservation: false,
    businessName: '',
    phone: '',
    email: '',
    instagram: '',
    googleMapsLink: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(name,value, type, checked, newValue)
    setMealData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  
  const handleSubmit = async (e) => {
    console.log('meal data in submit', mealData)
    e.preventDefault();
    try {
      // Handle form submission to the backend here
      console.log('meal data in submit', mealData)
      await mealsAPI.createMeal(mealData);
    } catch (err) {
      console.log('Error at submitting meal', err)
    }
    setShow(false)
  };

    return (
      <main>
      <h1>Meal Form</h1>
      <form onSubmit={handleSubmit}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={mealData.type}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Breakfast">Breakfast</MenuItem>
                  <MenuItem value="Lunch">Lunch</MenuItem>
                  <MenuItem value="Dinner">Dinner</MenuItem>
                  <MenuItem value="Libations">Libations</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    type='checkbox'
                    name="isReservation"
                    checked={mealData.isReservation}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Reservation"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Business Name"
                type="text"
                name="businessName"
                value={mealData.businessName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                type="text"
                name="phone"
                value={mealData.phone}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={mealData.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            {/* Add more fields as needed */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Container>
      </form>
    </main>
    )
  };
  