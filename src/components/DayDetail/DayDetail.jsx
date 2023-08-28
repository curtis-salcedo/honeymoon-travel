import React, { useState, useEffect } from 'react';

import { convertDateToLongDetail } from '../../utilities/services/business-service';

// Component imports
import Meal from '../Meal/Meal';
import Travel from '../Travel/Travel';
import Accommodation from '../Accommodation/Accommodation';
import Activity from '../Activity/Activity';
import Itinerary from '../Itinerary/Itinerary';

// Style imports
import './DayDetail.css';
import { 
  Container,
  Button,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';


export default function DayDetail({ activeDay, activeTrip, setViewAll, viewAll }) {
  const [tripDays, setTripDays] = useState(activeTrip.tripDays)
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(true)
  const [showItinerary, setShowItinerary] = useState(false)
  const [date, setDate] = useState('');
  const categories = ['Accomodations', 'Activities', 'Meals', 'Travel'];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleMeals = () => {
    console.log('handleMeals clicked')
  }
  
  useEffect(() => {
    setTripDays(activeTrip.tripDays)
    if (activeDay) {
      setViewAll(false)
    } 
  }, [viewAll, activeDay])

  const handleShowItinerary = () => {
    setShowItinerary(!showItinerary)
    setShowAll(!showAll)
  }


  return (
    <div className='DayDetailContainer'>
      <Container style={{ padding:0, margin:0 }}>

      <Typography>{ viewAll ? 'Viewing all dates' : `${convertDateToLongDetail(activeDay)}`}</Typography>


      <Button onClick={handleShowItinerary}>Itinerary</Button>
      { showItinerary ? 
      <Itinerary activeTrip={activeTrip} />
      : null
      }


      { showAll && 
        <div className="DayDetailContent">
          <Accordion>
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography style={{fontWeight:'bold'}}>Accommodations</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Accommodation viewAll={viewAll}  />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography style={{fontWeight:'bold'}}>Activites</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Activity />

            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography style={{fontWeight:'bold'}}>Meals</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Meal viewAll={viewAll} />

            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography style={{fontWeight:'bold'}}>Travel</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Travel day={activeDay} />

            </AccordionDetails>
          </Accordion>
        </div>
      }
    </Container>
  </div>
  );
}