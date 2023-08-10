import React, { useEffect, useState} from 'react';

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



export default function TripDetails({ activeTrip, handleDayDetailClick }) {
  const [tripDays, setTripDays] = useState([])
  const [expanded, setExpanded] = useState(false);

  console.log(activeTrip)

  useEffect(() => {
    setTripDays(activeTrip.tripDays)
  }, [activeTrip])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Function to convert the array of dates into an array of objects with the date and a list of activities

  // Send any component the active trip id and the date

  return (
    <div className='TripDetailsContainer'>
      <div>
      {tripDays ? tripDays.map((day, index) => {
          
          return (
            <>
            <div className='TripDetailsDays'>
              <Button sx={{ width: 200 }} onClick={(e) => handleDayDetailClick(e, day)}>
                <Typography sx={{ flexShrink: 0 }}>
                  <p>Day {index + 1}: {day}</p>
                </Typography>
              </Button>
            </div>

            {/* <Accordion
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
            </Accordion> */}
        </>
          );
        }) : null}

        {/* { tripDays ? tripDays.map((day, idx) => (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Typography sx={{ flexShrink: 0 }}>
              <p>Day {idx + 1}</p>
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
        )) : null } */}
    
        {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ flexShrink: 0 }}>Users</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              You are currently not an owner
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
              varius pulvinar diam eros in elit. Pellentesque convallis laoreet
              laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ flexShrink: 0 }}>
              Advanced settings
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Filtering has been entirely disabled for whole web server
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
              amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ flexShrink: 0 }}>Personal data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
              amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
      </div>
      {/* <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        { tripDays ? tripDays.map((day) => (
          <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            
            <h2>{new Date(day).toLocaleDateString()}</h2>

            <h1>{activeTrip._id}</h1>

            <h1>{activeTrip.name}</h1>

            <h2>Meals</h2>
            <Meal id={activeTrip._id} day={day} tripDays={tripDays} />

            <h2>Accomodations</h2>
            <Accommodation id={activeTrip._id} day={day} tripDays={tripDays} />
            
            <h2>Activities</h2>
            <Activity id={activeTrip._id} day={day} tripDays={tripDays} />

            <h2>Travels</h2>
            <Travel id={activeTrip._id} day={day} tripDays={tripDays} />

          </CardContent>
        </Card>
        )) : null }
      </Container>
      <h1>Each card should have a date, a list of activities, and a list of meals, accomodations, travel days should be colored differently</h1> */}
    </div>
  );
}