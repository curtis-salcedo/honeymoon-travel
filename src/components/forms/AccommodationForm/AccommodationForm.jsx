import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../utilities/DataContext';
import { MapContext } from '../../../utilities/MapContext';

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
import { getAddress } from '../../../utilities/api/addresses-api';

export default function AccommodationForm({ selectedData, id, day, setShow, setShowEdit }) {
  const [address, setAddress] = useState(null)
  const { activeTrip } = useContext(DataContext)
  const [tripId, setTripId] = useState(activeTrip)
  const [activeAddress, setActiveAddress] = useState(null)
  const [accommodationData, setAccommodationData] = useState({
    tripId: activeTrip._id,
    type: '',
    name: '',
    checkInDate: '',
    checkOutDate: '',
    checkInTime: '',
    checkOutTime: '',
    hasWasherDryer: false,
  });

  useEffect(() => {
    setTripId(activeTrip._id)
    const handleTest = (selectedData) => {
      if (selectedData) {
        setAccommodationData((prevData) => ({
          ...prevData,
          tripId: activeTrip._id,
          type: selectedData ? selectedData.type : '',
          name: selectedData ? selectedData.name : '',
          checkInDate: convertDate(selectedData.checkInDate),
          checkOutDate: convertDate(selectedData.checkOutDate),
          checkInTime: selectedData.checkInTime,
          checkOutTime: selectedData.checkOutTime,
          hasWasherDryer: selectedData.hasWasherDryer,
        })
        )
        console.log('accommodation data in useEffect', accommodationData)
      }
    }
    handleTest(selectedData)
  }, [activeTrip, selectedData, activeAddress])
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(name,value, type, checked, newValue)
    setAccommodationData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
  
    setAccommodationData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('accommodation data in handleSubmit', accommodationData)
    try {
      if ( setShowEdit ) {
        await accommodationsAPI.updateAccommodation(selectedData._id, accommodationData);
      } else {
        await accommodationsAPI.createAccommodation(accommodationData, address);
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
    <h1>Accommodation Form</h1>
    <form onSubmit={handleSubmit}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Search for location</Typography>
            <AddressForm
              handleSaveAddress={handleSaveAddress} 
              setAddress={setAddress}
              address={address}
            />
          </Grid>
          <>
          
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

          { accommodationData && accommodationData.type === 'Hotel' ?  
            <Grid item xs={12}>
            <FormControl fullWidth>
            <label>Name</label>
            <TextField
            type="text"
            value={accommodationData.name}
            onChange={handleNameChange}
            />
            </FormControl>
            </Grid>
          : null } 

          <Grid item xs={12} sm={6}>
            <div>Check-in</div>
            <TextField
              type="date"
              name="checkInDate"
              value={accommodationData.checkInDate}
              onChange={handleChange}
              fullWidth
              />
            <TextField
              type="time"
              name="checkInTime"
              value={accommodationData.checkInTime}
              onChange={handleChange}
              fullWidth
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div>Check-Out</div>
            <TextField
              type="date"
              name="checkOutDate"
              value={accommodationData.checkOutDate}
              onChange={handleChange}
              fullWidth
              />
            <TextField
              type="time"
              name="checkOutTime"
              value={accommodationData.checkOutTime}
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
              label="Washer/Dryer"
            />
          </Grid>
          { activeTrip ?
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
          : null }
          </>
        </Grid>

      </Container>
    </form>
  </div>
  );
}