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
  Container,
} from '@mui/material';

export default function Trip({ user }) {
  const { activeTrip, setActiveTrip } = useContext(DataContext)
  const [allUserTrips, setAllUserTrips] = useState(getTrips)
  const [show, setShow] = useState(false)
  // Change the way Day Detail displays data, either all or by day.
  const [viewAll, setViewAll] = useState(true);
  const [activeDay, setActiveDay] = useState(null)

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
  }, [activeDay, viewAll]);

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
    setActiveDay(convertDate(day))
  };
  
  // Create a function that sets the day detail to display all of the data in the trip.
  const handleViewAll = (e) => {
    console.log(viewAll)
    setViewAll(!viewAll)
    // setActiveDay(null)
  }

  return (
    <div className="TripContainer">
      <Container>
        <p>{user.email}, here are your trips!</p>
        {allUserTrips && allUserTrips.length > 0 ? (
          allUserTrips.map((trip) => (
            <div key={trip._id} className="TripButtonContainer">
              <Button
                id='side-bar-button'
                variant="outlined"
                onClick={handleShow}
                className="NewTripButton"
              >
                Add a new Trip
              </Button>
              {show ? <TripForm user={user} /> : null}
              <Button
                id='side-bar-button'
                variant="outlined"
                size="medium"
                onClick={(e) => handleChoice(e, trip._id)}
                className="TripNameButton"
              >
                {trip.name}
              </Button>
                {activeTrip ? (
                  <div>
                    <TripDetails
                      activeTrip={activeTrip}
                      handleDayDetailClick={handleDayDetailClick}
                      handleViewAll={handleViewAll}
                      viewAll={viewAll}
                    />
                  </div>
                ) : null}
            </div>
          ))
        ) : null}
      </Container>

      <Container>
        <div className="DayDetailContainer">
          <DayDetail
            activeTrip={activeTrip}
            activeDay={activeDay}
            viewAll={viewAll}
            setViewAll={setViewAll}
            />
        </div>
      </Container>

    </div>
  );
};
  