import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Style Imports
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  
} from '@mui/material';
import { model } from 'mongoose';

export default function AccommodationDetail({ activeItem }) {
  const { tripData } = useContext(DataContext)
  console.log(activeItem)
  
  useEffect(() => {
    // Get the details for the trip and category id
    
  }, [])

  const handleFilterData = async (id) => {

  }

  // console.log(tripData)



  return (
    <div>
      <Container>

        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Typography>{tripData.type}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography>Check Out {tripData.checkinDate} at {tripData.checkinTime}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Check Out {tripData.checkOutDate} at {tripData.checkOutTime}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>{activeItem.hasWasherDryer}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>{activeItem.location}</Typography>
          </Grid>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>

        </Grid>

      </Container>

    </div>
  )
} 