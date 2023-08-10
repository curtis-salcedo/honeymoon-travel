import React, { useState, useEffect } from 'react';

// Component Imports
import ActivityForm from '../forms/ActivityForm/ActivityForm';

// Style Imports
import './Activity.css';
import {
  Button,
} from '@mui/material';


export default function Activity({ id, day, tripDays }) {
  const [show, setShow] = useState(false)

  useEffect(() => {

  }, [])

    // Show the activity form
    const handleShow = (e) => {
      setShow(!show)
    }
  
  return (
    <div className="ActivityFormContainer">
      <h1>Activity Component</h1>
      <Button variant="contained" onClick={handleShow}>Show Accommodation Form</Button>
      { show ? <ActivityForm id={id} day={day} setShow={setShow} /> : null }
    </div>
  );
}