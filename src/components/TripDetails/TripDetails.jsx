import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Service Imports
import { convertDate } from '../../utilities/services/business-service';
import { convertDateToDetail } from '../../utilities/services/business-service';

// Component Imports
import Accommodation from '../Accommodation/Accommodation';
import Activity from '../Activity/Activity';
import Meal from '../Meal/Meal';
import Travel from '../Travel/Travel';
import DayButton from '../buttons/DayButton';


// Style Imports
import './TripDetails.css';
import { 
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TripDetails({ activeTrip, handleDayDetailClick, handleViewAll, viewAll, activeDay }) {
  const { tripData } = useContext(DataContext)
  const [tripDays, setTripDays] = useState([])
  const [expanded, setExpanded] = useState(false);
  // Highlight the selected day
  const [selectedDay, setSelectedDay] = useState(null);
  const [trip, setTrip] = useState({})

  useEffect(() => {
    setTripDays(activeTrip.tripDays)
  }, [activeTrip, activeTrip.tripDays])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDaySelected = (e, dayId) => {
    setSelectedDay(dayId)
    handleDayDetailClick(e, dayId)
  };

  const handleExpandItinerary = () => {
    
    
  }

  const handleExpandBudget = () => {

  }


  // Function to convert the array of dates into an array of objects with the date and a list of activities

  // Send any component the active trip id and the date

  return (
    <div className='TripDetailsContainer'>
      {/* <div className='TripDetailsDays' > */}
      <Container style={{ padding:0, marginTop:50 }}>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={handleExpandItinerary}
          >
          <Typography style={{fontWeight:'bold'}}>
            Itinerary
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className='TripDetailButtons'>

              <DayButton
                text='View All'
                primaryColor={'white'}
                secondaryColor={`${'var(--dark)'}`}
                onClick={handleViewAll}
              />

            {activeTrip && activeTrip.tripDays ? 
              activeTrip.tripDays.map((day, index) => (
                <DayButton
                  key={day._id || index}
                  text={convertDateToDetail(day)}
                  primaryColor='white'
                  secondaryColor={`${'var(--dark)'}`}
                  onClick={(e) => handleDaySelected(e, day)}
                >
                </DayButton>
              ))
              : null}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={handleExpandBudget}
          >
        <Typography style={{fontWeight:'bold'}}>Overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Feature to be added in the future with Explore, Notes, Places to visit</Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={handleExpandBudget}
          >
        <Typography style={{fontWeight:'bold'}}>Budget</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Feature to be added in the future where you can set budget, review costs of trip, etc.</Typography>
        </AccordionDetails>
      </Accordion>
      </>
    </Container>
  </div>
  );
}