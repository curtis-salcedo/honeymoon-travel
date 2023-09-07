import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../utilities/DataContext';

// Service Imports
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// Form Imports
import AddressForm from '../AddressForm/AddressForm';

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
  Typography,

} from '@mui/material';


export default function ActivityForm({ id, day, setShow }) {
  console.log('id here', id)
  const { activeTrip } = useContext(DataContext)
  const [address, setAddress] = useState(null)
  const [activeAddress, setActiveAddress] = useState(null)
  const [tripId, setTripId] = useState(activeTrip)
  const googleMapType = 'geocode'
  const [data, setData] = useState({
    tripId: activeTrip._id,
    name: '',
    type: '',
    date: '',
    startTime: '',
    endTime: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(name,value, type, checked, newValue)
    setData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  
  const handleSubmit = async (e) => {
    console.log('activity data in submit', data)
    e.preventDefault();
    try {
      console.log('activity data in submit', data)
      await activitiesAPI.createActivity(data, address);
    } catch (err) {
      console.log('Error at submitting activity', err)
    }
    setShow(false)
  };

  useEffect(() => {
    setTripId(activeTrip._id)
  }, [activeTrip])

  // Save the address to state
  const handleSaveAddress = (e) => {
    e.preventDefault();
    console.log('address data in handleSaveAddress', address)
    setActiveAddress(address)
  }

  return (
    <div className='form-container'>
      <Container>
        <Grid container spacing={2}>

          {/* Activity Name */}
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Activity Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Type */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={data.type}
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
            <TextField
              type="date"
              name="date"
              value={data.arrival}
              onChange={handleChange}
              fullWidth
              required
              />
            </Grid>
          <Grid item xs={12} sm={6}>
            <label htmlFor="">End Time</label>
            <TextField
              type="time"
              name="endTime"
              value={data.endTime}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Details */}
          <Grid item xs={12}>
            <TextField
              type="textarea"
              label="Details"
              name="details"
              value={data.details}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}      // Set the initial number of rows
              rowsMax={10}  // Set the maximum number of visible rows
              variant="outlined"  // Adding an outline for better visual distinction
            />
          </Grid>

          {/* Submit Button */}

        </Grid>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Container>
  </div>
  );
}