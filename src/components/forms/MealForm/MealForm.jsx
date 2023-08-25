import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../../utilities/DataContext';

// Component Imports
import AddressForm from '../AddressForm/AddressForm';

// Service Imports
import * as MapService from '../../../utilities/services/maps-service';

// API Imports
import * as MealsAPI from '../../../utilities/api/meals-api';

// Utility Imports

// Page Imports

// Style Imports
import './MealForm.css';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Container,
  FormControlLabel,
  Switch,
  Typography,

} from '@mui/material';

export default function MealForm({ id, day, setShow }) {
  const { activeTrip } = useContext(DataContext)
  const [googleMapType, setGoogleMapType] = useState('restaurant')
  const [address, setAddress] = useState(null)
  const [tripId, setTripId] = useState(activeTrip)
  const [activeAddress, setActiveAddress] = useState(null)
  const [mealData, setMealData] = useState({
    tripId: id,
    date: '',
    type: '',
    isReservation: false,
    time: '',
  });

  useEffect(() => {
    setTripId(activeTrip._id)
  }, [activeTrip])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(name,value, type, checked, newValue)
    setMealData((prevData) => ({
      ...prevData,
      [name]: newValue,
      tripId: activeTrip._id,
    }));
    console.log('meal data in handleChange', activeTrip._id, id)
  };
  
  const handleSubmit = async (e) => {
    console.log('meal data in submit', mealData, address)
    e.preventDefault();
    try {
      // Handle form submission to the backend here
      console.log('meal data in submit', mealData)
      await MealsAPI.createMeal(mealData, address);
    } catch (err) {
      console.log('Error at submitting meal', err)
    }
    setShow(false)
  };

    // Save the address to state
    const handleSaveAddress = (e) => {
      e.preventDefault();
      console.log('address data in handleSaveAddress', address)
      setActiveAddress(address)
    }

  return (
    <main>
    <form onSubmit={handleSubmit}>
      <Container>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Typography>Search for location</Typography>
            <AddressForm
              handleSaveAddress={handleSaveAddress} 
              setAddress={setAddress}
              address={address}
              googleMapType={googleMapType}
              fullWidth
            />
          </Grid>

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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  name="date"
                  value={mealData.arrival}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="time"
                  name="time"
                  value={mealData.time}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
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
  