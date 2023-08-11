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
  const { activeData } = useContext(DataContext)
  console.log(activeItem)
  
  useEffect(() => {
    // Get the details for the trip and category id
    
  }, [])

  const handleFilterData = async (id) => {

  }

  // console.log(activeData)



  return (
    <div>
      <Container>

        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Typography>{activeData.type}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography>Check Out {activeData.checkinDate} at {activeData.checkinTime}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Check Out {activeData.checkOutDate} at {activeData.checkOutTime}</Typography>
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