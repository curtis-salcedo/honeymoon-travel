import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../../utilities/DataContext';

// Component Imports
import AddressForm from '../AddressForm/AddressForm';

// Service Imports
import { LocalizationProvider, MobileDateTimePicker, TimePicker, DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

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
  const [data, setData] = useState({
    tripId: id,
    date: '',
    type: '',
    isReservation: '',
  });

  useEffect(() => {
    setTripId(activeTrip._id)
  }, [activeTrip])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(name,value, type, checked, newValue)
    setData((prevData) => ({
      ...prevData,
      [name]: newValue,
      tripId: activeTrip._id,
    }));
    console.log('meal data in handleChange', activeTrip._id, id)
  };
  
  const handleSubmit = async (e) => {
    console.log('meal data in submit', data, address)
    e.preventDefault();
    try {
      // Handle form submission to the backend here
      console.log('meal data in submit', data)
      await MealsAPI.createMeal(data, address);
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
  // Dynamically handle the date/time changes
  const handleDateChange = (e, name) => {
    setData((prevData) => ({
      ...prevData,
      [name]: e,
    }));
    console.log('date change data result', data)
  };

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
                value={data.type}
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
                  checked={data.isReservation}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Is this a Reservation"
            />
          </Grid>
          { !data.isReservation ? 
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width:'100%' }}
                label="Time"
                name="date"
                value={data.checkOut}
                onChange={(e) => handleDateChange(e, 'date')}
                // TextFieldComponent={(props) => (
                //   <TextField fullWidth />
                // )}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />
            </LocalizationProvider>
          </Grid>
          :
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
              sx={{ width:'100%' }}
              label="Time"
              name="date"
              value={data.checkOut}
              onChange={(e) => handleDateChange(e, 'date')}
              // TextFieldComponent={(props) => (
              //   <TextField fullWidth />
              // )}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
            />
            </LocalizationProvider>
          </Grid>
          }
          
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
  