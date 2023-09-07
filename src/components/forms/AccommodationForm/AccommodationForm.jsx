import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../utilities/DataContext';
import { MapContext } from '../../../utilities/MapContext';

// Service Imports
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// Form Imports
import AddressForm from '../AddressForm/AddressForm';

// Service Imports
import { convertDate } from '../../../utilities/services/business-service';

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
  Container,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';

export default function AccommodationForm({ selectedData, id, day, setShow, setShowEdit }) {
  const { activeTrip } = useContext(DataContext)
  const [googleMapType, setGoogleMapType] = useState('lodging')
  const [address, setAddress] = useState(null)
  const [tripId, setTripId] = useState(activeTrip)
  const [activeAddress, setActiveAddress] = useState(null)
  const [data, setData] = useState({
    tripId: activeTrip._id,
    type: '',
    checkIn: '',
    checkOut: '',
    hasWasherDryer: false,
  });

  useEffect(() => {
    setTripId(activeTrip._id)
    const handleTest = (selectedData) => {
      if (selectedData) {
        setData((prevData) => ({
          ...prevData,
          tripId: activeTrip._id,
          type: selectedData ? selectedData.type : '',
          // checkInDate: convertDate(selectedData.checkInDate),
          // checkOutDate: convertDate(selectedData.checkOutDate),
          // checkInTime: selectedData.checkInTime,
          // checkOutTime: selectedData.checkOutTime,
          checkIn: selectedData.checkIn,
          checkOut: selectedData.checkOut,
          hasWasherDryer: selectedData.hasWasherDryer,
        })
        )
        console.log('accommodation data in useEffect', data)
      }
    }
    handleTest(selectedData)
  }, [activeTrip, selectedData, activeAddress])

  console.log(data)
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(name, value, type, checked, newValue);
    setData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleDateChange = (e, name) => {
    console.log('name', e)
    console.log('e', e)
    setData((prevData) => ({
      ...prevData,
      [name]: e,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('accommodation data in handleSubmit', data)
    try {
      if ( setShowEdit ) {
        await accommodationsAPI.updateAccommodation(selectedData._id, data);
      } else {
        await accommodationsAPI.createAccommodation(data, address);
      }
    } catch (err) {
      console.log('Error at submitting accommodation', err)
    }
    setShow(false)
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    console.log('address data in handleSaveAddress', address)
    setActiveAddress(address)
  }

  return (
    <div className='form-container'>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Search for location</Typography>
            <AddressForm
              handleSaveAddress={handleSaveAddress} 
              setAddress={setAddress}
              address={address}
              googleMapType={googleMapType}
            />
          </Grid>
          <>
          
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={data.type}
                onChange={handleChange}
                required
              >
                <MenuItem value="Hotel">Hotel</MenuItem>
                <MenuItem value="Airbnb">Airbnb</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                sx={{ width:'100%' }}
                label="Check-In Date and Time"
                name="checkIn"
                value={data.checkIn}
                onChange={(e) => handleDateChange(e, 'checkIn')}
                TextFieldComponent={(props) => (
                  <TextField {...props} fullWidth />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                sx={{ width:'100%' }}
                label="Check-Out Date and Time"
                name="checkOut"
                value={data.checkOut}
                onChange={(e) => handleDateChange(e, 'checkOut')}
                TextFieldComponent={(props) => (
                  <TextField fullWidth />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  type='checkbox'
                  name="hasWasherDryer"
                  checked={data.hasWasherDryer}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Washer/Dryer"
            />
          </Grid>
          { activeTrip ?
          <Grid item xs={12}>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
          : null }
          </>
        </Grid>

      </Container>
  </div>
  );
}