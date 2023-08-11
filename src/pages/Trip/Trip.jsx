import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Service Imports
import { getTrips } from '../../utilities/services/trips-service';
import { getTripById } from '../../utilities/api/trips-api';
import { convertDate } from '../../utilities/services/business-service';

// API Imports
import * as tripsAPI from '../../utilities/api/trips-api';

// Utility Imports

// Page Imports

// Component Imports
import TripForm from '../../components/forms/TripForm/TripForm';
import TripDetails from '../../components/TripDetails/TripDetails';
import DayDetail from '../../components/DayDetail/DayDetail';

// Style Imports
import './Trip.css';
import {
  Button,
} from '@mui/material';

export default function Trip({ user }) {
  const { activeTrip, setActiveTrip } = useContext(DataContext)
  const [allUserTrips, setAllUserTrips] = useState(getTrips)
  const [show, setShow] = useState(false)
  // const [activeTrip, setActiveTrip] = useState('')
  const [activeDay, setActiveDay] = useState('')

  useEffect(() => {
    async function fetchTrips() {
      try {
        const fetchedTrips = await getTrips();
        setAllUserTrips(fetchedTrips);
      } catch (error) {
        console.error('No Trips created or there was an error fetching trips:', error);
      }
    }
    fetchTrips();
  }, [activeDay]);

  const handleShow = () => {
    setShow(!show)
  };

  const handleChoice = async (e, id) => {
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
    console.log('day at handle click', day)
    console.log(convertDate(day))
    setActiveDay(convertDate(day))
  }

  return (
    <div className="TripContainer">
      <div className="TripSideBar">
      <p>Your Trips</p>
    { allUserTrips && allUserTrips.length > 0 ? 
        allUserTrips.map((trip) => (
          <div key={trip._id} className="TripSideBarButtonContainer">
              <Button variant="outlined" onClick={handleShow}>New Trip</Button>
              { show ? 
                <TripForm user={user} />
              : null }
              <Button variant="outlined" size="medium" onClick={(e) => handleChoice(e, trip._id)}>
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
  