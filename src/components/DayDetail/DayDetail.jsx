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
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';

export default function DayDetail({ activeDay, activeTrip, setViewAll, viewAll }) {
  const [tripDays, setTripDays] = useState(activeTrip.tripDays)
  const [expanded, setExpanded] = useState(null);
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
  }, [viewAll, activeDay, activeTrip])

  console.log(activeTrip)

  return (
    <>
    { activeTrip && activeTrip.tripDays ?
      <Itinerary activeTrip={activeTrip} activeDay={activeDay} viewAll={viewAll} />
      :
      <div>
        This is a placeholder 
      </div>
    }
    </>
  );
}