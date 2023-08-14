import React, { useState, useEffect } from 'react';

// Component imports
import Meal from '../Meal/Meal';
import Travel from '../Travel/Travel';
import Accommodation from '../Accommodation/Accommodation';
import Activity from '../Activity/Activity';

// Style imports
import './DayDetail.css';
import { 

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

  return (
    <div className='DayDetailContainer'>

      <Typography>{ viewAll ? 'Viewing all dates' : `Viewing ${activeDay}`}</Typography>
      {/* <div> */}

      { viewAll ? 
        <div className="DayDetailContent">
          <Accordion>
            <AccordionSummary
            expandIcon={<KeyboardArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography>Accommodations - All</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Accommodation viewAll={viewAll}  />
              <Typography>
                This is where details for the accommodations of the day go.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography>Activites</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Activity />
              <Typography>
                This is where details for the activites of the day go.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography>Meals</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Meal viewAll={viewAll} />
              <Typography>
                This is where details for the meal of the day go.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography>Travel</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Travel day={activeDay} />
              <Typography>
                This is where details for the travel of the day go.
              </Typography>
            </AccordionDetails>
          </Accordion>
          </div>
:
          <div className="DayDetailContent">
        <Accordion>
          <AccordionSummary
            expandIcon={<KeyboardArrowDown />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>Accommodations - Daily</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Accommodation day={activeDay} viewAll={viewAll}  />
            <Typography>
              This is where details for the accommodations of the day go.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<KeyboardArrowDown />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>Activites</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Activity day={activeDay} />
            <Typography>
              This is where details for the activites of the day go.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<KeyboardArrowDown />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>Meals</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Meal id={activeTrip._id} day={activeDay} tripDays={tripDays} />
            <Typography>
              This is where details for the meal of the day go.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<KeyboardArrowDown />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>Travel</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Travel day={activeDay} />
            <Typography>
              This is where details for the travel of the day go.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      }
      </div>
  );
}