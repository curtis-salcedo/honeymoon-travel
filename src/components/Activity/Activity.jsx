import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Service Imports
import { convertDate } from '../../utilities/services/business-service';

// Component Imports
import ActivityForm from '../forms/ActivityForm/ActivityForm';

// Style Imports
import './Activity.css';
import {
  Button,
} from '@mui/material';


export default function Activity({ id, day, tripDays }) {
  const { activeActivities } = useContext(DataContext)
  const [show, setShow] = useState(false)

  useEffect(() => {

  }, [])

  // Show the activity form
  const handleShow = (e) => {
    setShow(!show)
  }
  
  return (
    <div className="ActivityContainer">
      <h1>Activity Component</h1>

      <Button variant="contained" onClick={handleShow}>Show Activity Form</Button>

      { show ? <ActivityForm id={id} day={day} setShow={setShow} /> : null }

      { activeActivities.map((activity) => {
        // Check if the date matches the day and display the activity if it matches
        if (convertDate(activity.date) === day) {
          return (
            <div key={activity._id}>
              <h3>{activity.name}</h3>
            </div>
          )
        } return 'No activites to display';
      })}
    </div>
  );
}