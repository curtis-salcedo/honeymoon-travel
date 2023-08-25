import React, { useState, useEffect } from 'react';

import { convertDateToLongDetail } from '../../utilities/services/business-service';

// Component imports
import Meal from '../Meal/Meal';
import Travel from '../Travel/Travel';
import Accommodation from '../Accommodation/Accommodation';
import Activity from '../Activity/Activity';

// Style imports
import './Itinerary.css';
import { 
  Container,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';

export default function Itinerary({ activeDay, activeTrip, viewAll }) {
  const [tripDays, setTripDays] = useState(activeTrip.tripDays)
  const [expanded, setExpanded] = useState(null);
  const [tripRange, setTripRange] = useState([])
  const categories = ['Accomodations', 'Activities', 'Meals', 'Travel'];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setTripDays(activeTrip.tripDays)
    // getTripRange(tripDays)
  }, [activeTrip, viewAll])

  const getTripRange = (tripDays) => {
    // Get the trip days and convert the start date and end date to long format
    // Gaurd against empty array
    if (tripDays.length > 0) {
      const start = convertDateToLongDetail(tripDays[0])
      const end = convertDateToLongDetail(tripDays[tripDays.length - 1])
      return `${start} to ${end}`
    }
  }

  return (
  <Container style={{ padding: 0, margin: 0 }}>
    <div className="DayDetailContent">
      <Typography>{ viewAll ? getTripRange(tripDays) : `${convertDateToLongDetail(activeDay)}` }</Typography>
      {/* Render accordion components when there is an actual trip created with tripDays */}
      {categories.map((category, index) => (
        <Accordion
          key={index}
          expanded={expanded === category}
          onChange={handleChange(category)}
        >
          <AccordionSummary
            expandIcon={<KeyboardArrowDown />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <Typography style={{ fontWeight: 'bold' }}>{category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* Render component based on category list to reduce code */}
            {category === 'Accommodations' && <Accommodation id={activeTrip} day={activeDay} viewAll={viewAll} />}
            {category === 'Activities' && <Activity />}
            {category === 'Meals' && <Meal />}
            {category === 'Travel' && <Travel day={activeDay} />}
            {/* Add button related to this category */}
            {/* <Button onClick={handleAddButtonClick}>Add {category}</Button> */}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  </Container>
  );
}