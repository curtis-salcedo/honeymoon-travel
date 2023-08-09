import React, { useState } from 'react';

// Component Imports
import AccommodationForm from '../forms/AccommodationForm/AccommodationForm';

// Style Imports
import './Accommodation.css';
import {
  Button,
} from '@mui/material';

export default function Accommodation({ id, day, tripDays }) {
  const [show, setShow] = useState(false)

  const handleShow = (e) => {
    setShow(!show)
  }

  return (
    <div className='AccommodationContainer'>
      add button to set show
      <Button variant="contained" onClick={handleShow}>Show Accommodation Form</Button>
      { show ? <AccommodationForm id={id} day={day} setShow={setShow} /> : null }
    </div>
  );
}