import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import AccommodationForm from '../forms/AccommodationForm/AccommodationForm';

// Style Imports
import './Accommodation.css';
import {
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Accommodation({ id, day }) {
  const { activeTrip, activeAccommodations } = useContext(DataContext)
  const [accommodations, setAccommodations] = useState([])
  console.log('day', day ? day : 'no day selected')

  const [show, setShow] = useState(false)

  useEffect(() => {
    console.log('active accommodations', activeAccommodations)
    setAccommodations(activeAccommodations)
  }, [activeAccommodations])

  // Show the accommodation form
  const handleShow = (e) => {
    setShow(!show)
  }

  // Show the accommodation details
  const handleShowDetails = (e, id) => {
    console.log('Here is the meal id needed to find all the details for that meal and edit it.', id)
  }

  // Handle any actions when the user clicks on the icon
  const handleClick = (e, id) => {
    console.log('Here is the meal id needed to find all the details for that meal and edit it.', id)
  }

  return (
    <div className='AccommodationContainer'>
      
      <div className='AccommodationContainer'>
      {accommodations.map((accommodation) => {
        const isCheckInDay = accommodation.checkInDate === day;
        const isCheckOutDay = accommodation.checkOutDate === day;

        if (isCheckInDay || isCheckOutDay) {
          return (
            <div className='ExpandedDetails' key={accommodation._id}>
              <p>{accommodation.location}</p>
              {isCheckInDay && <p>Check-in</p>}
              {isCheckOutDay && <p>Check-out</p>}
              <Button onClick={() => handleShowDetails(accommodation._id)}>Details</Button>
              <Tooltip title="Options">
                <IconButton onClick={() => handleClick(accommodation._id)}>
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
            </div>
          );
        }

        return null;
      })}

      <Button variant="contained" onClick={handleShow}>Show Accommodation Form</Button>
      { show ? <AccommodationForm id={id} day={day} setShow={setShow} /> : null }
      </div>
    </div>
  );
}