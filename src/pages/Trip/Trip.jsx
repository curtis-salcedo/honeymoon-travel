import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Service Imports
import { getTrips } from '../../utilities/services/trips-service';
import { getTripById } from '../../utilities/api/trips-api';

// API Imports
import * as tripsAPI from '../../utilities/api/trips-api';

// Utility Imports

// Page Imports

// Component Imports
import TripForm from '../../components/forms/TripForm/TripForm';
import TripDetails from '../../components/TripDetails/TripDetails';
import DayDetail from '../../components/DayDetail/DayDetail';

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
import './Trip.css';

export default function Trip({ user }) {
  const [trips, setTrips] = useState(getTrips)
  const [show, setShow] = useState(false)
  const [activeTrip, setActiveTrip] = useState('')
  const [activeDay, setActiveDay] = useState('')

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
  }, [activeDay]);

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

  const handleDayDetailClick = (e, day) => {
    setActiveDay(day)
  }

  console.log(activeTrip)

  return (
    <div className="TripContainer">
      <div className="TripSideBar">
      <p>Your Trips</p>
    { trips && trips.length > 0 ? 
        trips.map((trip) => (
          <div key={trip._id} className="TripSideBarButtonContainer">
              <Button variant="outlined" onClick={handleShow}>New Trip</Button>
              { show ? 
                <TripForm user={user} />
              : null }
              <Button variant="outlined" size="medium" onClick={(e) => handleMore(e, trip._id)}>
                {trip.name}
              </Button>
            <div>
              { activeTrip ?
                <div>
                  <TripDetails activeTrip={activeTrip} handleDayDetailClick={handleDayDetailClick} />
                </div>
              : null }
            </div>
          </div>
        ))
        : null }
        </div>
      <div>
        <DayDetail activeTrip={activeTrip} activeDay={activeDay} />
      </div>
    </div>
    )
  };
  