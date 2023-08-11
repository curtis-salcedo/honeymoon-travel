import React, { useEffect, useState} from 'react';

// Service Imports
import { convertDate } from '../../utilities/services/business-service';

// Component Imports
import Accommodation from '../Accommodation/Accommodation';
import Activity from '../Activity/Activity';
import Meal from '../Meal/Meal';
import Travel from '../Travel/Travel';


// Style Imports
import './TripDetails.css';
import { 
  Button,
  Typography,
} from '@mui/material';

export default function TripDetails({ activeTrip, handleDayDetailClick, handleViewAll }) {
  const [tripDays, setTripDays] = useState([])
  const [expanded, setExpanded] = useState(false);
  // Highlight the selected day
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    setTripDays(activeTrip.tripDays)
  }, [activeTrip, activeTrip.tripDays])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDaySelected = (e, dayId) => {
    console.log('handleDaySelected dayId', dayId)
    setSelectedDay(convertDate(dayId))
    handleDayDetailClick(e, dayId)
  };
  // Function to convert the array of dates into an array of objects with the date and a list of activities

  // Send any component the active trip id and the date

  return (
    <div className='TripDetailsContainer'>
    <div>
      <div className='TripDetailsDays' >
      { activeTrip && activeTrip.tripDays ?
        <Button
          id='side-bar-button'
          variant="outlined"
          color="primary"
          onClick={handleViewAll}
          className="ViewAllButton">
          <Typography variant="body1">
            View All
          </Typography></Button>
      : null }
      {activeTrip && activeTrip.tripDays ? 
        activeTrip.tripDays.map((day, index) => (
            <Button
              key={day._id}
              id='side-bar-button'
              varient='outlined'
              size="medium"
              sx={{
                backgroundColor: selectedDay === convertDate(day) ? 'lightblue' : 'inherit',
                border: 'inherit'
              }}
              onClick={(e) => handleDaySelected(e, day)}
            >
              <Typography variant="body1">
                {day}
              </Typography>
            </Button>
        ))
        : null}
      </div>
    </div>
  </div>
  );
}