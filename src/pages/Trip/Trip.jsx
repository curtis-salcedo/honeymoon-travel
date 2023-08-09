import React, { useEffect, useState } from 'react';

// Service Imports
import { getTrips } from '../../utilities/services/trips-service';
import { getTripById } from '../../utilities/api/trips-api';

// API Imports
import * as tripsAPI from '../../utilities/api/trips-api';

// Utility Imports

// Page Imports

// Component Imports
import TripForm from '../../components/TripForm/TripForm';
import TripDetails from '../../components/TripDetails/TripDetails';

// Style Imports
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { set } from 'mongoose';

export default function Trip({ user }) {
  const [trips, setTrips] = useState(getTrips)
  const [show, setShow] = useState(false)
  const [activeTrip, setActiveTrip] = useState(null)

  useEffect(() => {
    async function fetchTrips() {
      try {
        const fetchedTrips = await getTrips();
        setTrips(fetchedTrips);
      } catch (error) {
        console.error('No Trips created or there was an error fetching trips:', error);
      }
    }
    fetchTrips();
  }, []);

  const handleShow = () => {
    setShow(!show)
  };

  const handleMore = async (e, id) => {
    try {
      // Wait for the promise to resolve
      const fetchedActiveTrip = await getTripById(id);
      // Set the actual trip object to state
      setActiveTrip(fetchedActiveTrip);
    } catch (error) {
      console.error('Error fetching active trip details:', error);
    }
  };

  console.log(activeTrip)

  return (
    <main>
      <Button onClick={handleShow}>Add New Trip</Button>
      { show ? 
      <TripForm user={user} />
      : null  
      }
    <div>
    { trips && trips.length > 0 ? 
        trips.map((trip) => (
          <div key={trip._id}>
            <Card sx={{ maxWidth: 350 }}>
              <CardContent>
                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                  Here is your trip info:
                </Typography>
                <Typography variant="h5" component="div">
                  {trip.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Starts: {Date(trip.startDate)}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Ends: {Date(trip.endDate)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" onClick={(e) => handleMore(e, trip._id)}>More</Button>
              </CardActions>
            </Card>
          </div>
        ))
        : 
        <div>no trips</div> }
        { activeTrip ?
        <div>
          Active trip
          <TripDetails activeTrip={activeTrip} />
          </div>
          : null }
      </div>
    </main>
    )
  };
  