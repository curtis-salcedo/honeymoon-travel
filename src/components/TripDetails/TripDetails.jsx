import React, { useState } from 'react';

// Component Imports
import Meal from '../Meal/Meal';

// Style Imports
import { 
  Container,
  Card,
  CardContent,

} from '@mui/material';

export default function TripDetails({ activeTrip }) {
  const [tripDays, setTripDays] = useState(activeTrip.tripDays)
  // Function to convert the array of dates into an array of objects with the date and a list of activities

  // Send any component the active trip id and the date


  return (
    <main>
      <h1>Trip Details Page</h1>
      <h1>Add Title for the trip and a description if necessary. Edits should be allowed later on</h1>
      <h1>Cards for each day of the trip</h1>
      <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        { tripDays ? tripDays.map((day) => (
          <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            
            <h2>{new Date(day).toLocaleDateString()}</h2>

            <h1>{activeTrip._id}</h1>

            <h1>{activeTrip.name}</h1>

            <Meal id={activeTrip._id} day={day} tripDays={tripDays} />

            <h2>Accomodations Component</h2>

            <h2>Travel Component</h2>

          </CardContent>
        </Card>
        )) : null }
      </Container>
      <h1>Each card should have a date, a list of activities, and a list of meals, accomodations, travel days should be colored differently</h1>
    </main>
  );
}