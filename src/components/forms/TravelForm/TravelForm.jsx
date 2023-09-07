import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../utilities/DataContext';

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
  const [googleMapType, setGoogleMapType] = useState(null);
  const [travelData, setTravelData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(name, value, type, checked, newValue);
    setTravelData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    console.log(travelData)
  };

  console.log('travel data', travelData)
  console.log('arrival location', arrivalLocation) 
  console.log('departure location', departureLocation)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTravelData = {
        tripId: activeTrip._id,
        type: travelData.type,
        departureLocation: departureLocation,
        arrivalLocation: arrivalLocation,
        identifier: travelData.identifier,
        departureDateTime: travelData.departure,
        arrivalDateTime: travelData.arrival,
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
    setGoogleMapType(getGoogleMapType(travelData.type));
  }, [activeTrip, travelData.type, googleMapType, departureLocation, arrivalLocation]);

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
      default:
        return 'geocode';
    }
  }

  console.log('travel data in useEffect', travelData)
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
                  value={travelData.type}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value='Flight'>Flight</MenuItem>
                  <MenuItem value='Train'>Train</MenuItem>
                  <MenuItem value='Cab'>Cab</MenuItem>
                  <MenuItem value='Bus'>Bus</MenuItem>
                  <MenuItem value='Ferry'>Ferry</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='text'
                label='Identifier'
                name='identifier'
                value={travelData.identifier}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

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
              <Typography>Search for arrival location</Typography>
              <AddressForm
                handleSaveAddress={(e) => handleSaveAddress(e, arrivalLocation, false)} 
                setAddress={setArrivalLocation}
                address={arrivalLocation}
                googleMapType={googleMapType}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label>Departure</label>
              <TextField
                type='datetime-local'
                name='departure'
                value={travelData.departure}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label>Arrival</label>
              <TextField
                type='datetime-local'
                name='arrival'
                value={travelData.arrival}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
  );
}
