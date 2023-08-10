import React, { useState, useEffect } from 'react';

// Component imports
import Meal from '../Meal/Meal';
import Travel from '../Travel/Travel';
import Accommodation from '../Accommodation/Accommodation';
import Activity from '../Activity/Activity';

// Style imports
import './DayDetail.css';
import { 
  Container,
  Card,
  CardContent,
  Button,


} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function DayDetail({ activeDay, activeTrip }) {
  const [tripDays, setTripDays] = useState(activeTrip.tripDays)
  const [expanded, setExpanded] = useState(false);
  const [date, setDate] = useState('');
  const categories = ['Accomodations', 'Activities', 'Meals', 'Travel'];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const convertDate = (dateString) => {
    if ( dateString === '' ) {
      return 'Placeholder inside convertDate function to give the range of the trip'
    }
    const dateObject = new Date(dateString);
    const reformat = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return dateObject.toLocaleDateString(undefined, reformat);
  }
  
  useEffect(() => {
    setTripDays(activeTrip.tripDays)
    setDate(convertDate(activeDay))
  }, [activeTrip, activeDay])

  return (
    <div className='DayDetailContainer'>
      <h3>Day Detail</h3>
        <p>{date}</p>
      <Accordion>
        <AccordionSummary>
          <Typography>Accommodations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is where details for the accommodations of the day go.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Activites</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is where details for the activites of the day go.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
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
        <AccordionSummary>
          <Typography>Travel</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is where details for the travel of the day go.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* { tripDays ? tripDays.map((day, index) => {
          const date = new Date(day);
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayAndMonth = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
          
          return (
            <>
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography sx={{ flexShrink: 0 }}>
                  <p>{dayOfWeek}, {dayAndMonth}</p>
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  <p>{activeTrip.name}</p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>

                <Meal id={activeTrip._id} day={day} tripDays={tripDays} />

                <p>Accomodations</p>
                <Accommodation id={activeTrip._id} day={day} tripDays={tripDays} />
                
                <p>Activities</p>
                <Activity id={activeTrip._id} day={day} tripDays={tripDays} />

                <p>Travels</p>
                <Travel id={activeTrip._id} day={day} tripDays={tripDays} />
              </Typography>
            </AccordionDetails>
            </Accordion>
        </>
          );
        }) : null} */}

    </div>
  );
}