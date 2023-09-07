import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../utilities/DataContext';

// Service Imports
import { LocalizationProvider, MobileDateTimePicker, TimePicker, DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

// Form Imports
import AddressForm from '../AddressForm/AddressForm';

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
  Container,
  Typography,
} from '@mui/material';
import { set } from 'mongoose';

export default function TravelForm({ id, day, setShow }) {
  const { activeTrip } = useContext(DataContext);
  const [tripId, setTripId] = useState(activeTrip);
  const [googleMapType, setGoogleMapType] = useState('');
  const [data, setData] = useState({
    tripId: activeTrip._id,
    type: '', // This is an ENUM ['Flight', 'Train', 'Cab', 'Bus', 'Ferry']
    identifier: '',
    departureLocation: '',
    arrivalLocation: '',
    departureDateTime: '',
    arrivalDateTime: '',
  });
  const [departureLocation, setDepartureLocation] = useState({});
  const [arrivalLocation, setArrivalLocation] = useState({});
  const handleSaveAddress = (e, location, isDeparture) => {
    if (isDeparture) {
      setDepartureLocation(location);
    } else {
      setArrivalLocation(location);
    }
  };
  console.log(googleMapType)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(name, value, type, checked, newValue);
    setData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    console.log(data)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTravelData = {
        tripId: activeTrip._id,
        type: data.type,
        departureLocation: departureLocation,
        arrivalLocation: arrivalLocation,
        identifier: data.identifier,
        departureDateTime: data.departure,
        arrivalDateTime: data.arrival,
      };
      console.log('new travel data', newTravelData);
      await travelsAPI.createTravel(newTravelData);
    } catch (err) {
      console.log('Error at submitting travel data', err);
    }
    setShow(false);
  };

  useEffect(() => {
    setTripId(activeTrip._id);
    setGoogleMapType(getGoogleMapType(data.type));
  }, [activeTrip, data.type, googleMapType, departureLocation, arrivalLocation]);

  const getGoogleMapType = (type) => {
    switch (type) {
      case 'Flight':
        return 'airport';
      case 'Train':
        return 'train_station';
      case 'Cab':
        return 'taxi_stand';
      case 'Bus':
        return 'bus_station';
      case 'Ferry':
        return 'ferry_terminal';
      case 'Other':
        return 'geocode';
      default:
        return '';
    }
  }
  // Dynamically handle the date/time changes
  const handleDateChange = (e, name) => {
    setData((prevData) => ({
      ...prevData,
      [name]: e,
    }));
    console.log('date change data result', data)
  };

  console.log('travel data in useEffect', data)
  console.log('departure location in useEffect', departureLocation)
  console.log('arrival location in useEffect', arrivalLocation)

  return (
    <div className='form-container'>
        <Container>
          <div className='add-button'></div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name='type'
                  value={data.type}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value='Flight'>Flight</MenuItem>
                  <MenuItem value='Train'>Train</MenuItem>
                  <MenuItem value='Cab'>Cab</MenuItem>
                  <MenuItem value='Bus'>Bus</MenuItem>
                  <MenuItem value='Ferry'>Ferry</MenuItem>
                  <MenuItem value='Other'>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='text'
                label='Identifier'
                name='identifier'
                value={data.identifier}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            { googleMapType ?
            <>
            <Grid item xs={12}>
              <Typography>Search for departure location</Typography>
              <AddressForm
                handleSaveAddress={(e) => handleSaveAddress(e, departureLocation, true)} 
                setAddress={setDepartureLocation}
                address={departureLocation}
                googleMapType={googleMapType}
                />
            </Grid>
            <Grid item xs={12}>
              <Typography>Departure</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
                sx={{ width:'100%' }}
                label="Time"
                name="departure"
                value={data.checkOut}
                onChange={(e) => handleDateChange(e, 'departure')}
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

            <Grid item xs={12}>
              <Typography>Search for arrival location</Typography>
              <AddressForm
                handleSaveAddress={(e) => handleSaveAddress(e, arrivalLocation, false)} 
                setAddress={setArrivalLocation}
                address={arrivalLocation}
                googleMapType={googleMapType}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Arrival</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
                sx={{ width:'100%' }}
                label="Time"
                name="arrival"
                value={data.checkOut}
                onChange={(e) => handleDateChange(e, 'arrival')}
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
            <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </> 
        : null }
          </Grid>
        </Container>
      </div>
  );
}
