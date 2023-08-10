import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';


// Component Imports
import MealForm from '../forms/MealForm/MealForm';

// API Imports
import * as mealsAPI from '../../utilities/api/meals-api';

// Style Imports
import './Meal.css';
import {
  Button,
  IconButton,
  Tooltip,

} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


export default function Meal({ id, day, tripDays }) {
  // Get the active meals from the data context
  const { activeMeals } = useContext(DataContext)

  const [show, setShow] = useState(false)
  
  useEffect(() => {
    // // Get the meals for each day
    // fetchMeals();
  }, [])

  // Show the meal form
  const handleShow = () => {
    setShow(!show)
  }

  // Show the meal details
  const handleShowDetails = (e, id) => {
    console.log('Here is the meal id needed to find all the details for that meal and edit it.', id)
  }

  const handleClick = (e, id) => {
    console.log('Here is the meal id needed to find all the details for that meal and edit it.', id)
  }

  return (
    <div className='MealContainer'>

      <h3>Meals</h3>

      <Button variant="contained" onClick={handleShow}>Add</Button>
      
      { show ? <MealForm id={id} day={day} setShow={setShow} /> : null }

      {activeMeals.map((meal) => {
        // Check if the date matches the day and display the meal if it matches
        if (meal.date === day) {
          return (
            <div className='ExpandedDetails'>
              <p key={meal._id}>{meal.businessName}</p>
              <p>{meal.isReservation ? 'Reservation' : ''}</p>
              <Button onClick={(e) => handleShowDetails(e, meal._id)}></Button>
              <Tooltip title="Options">
                <MoreHorizIcon icon={MoreHorizIcon} onClick={(e) => handleClick(e, meal._id)} />
              </Tooltip>
            </div>
          );
        }
          // Render nothing if date doesn't match
          return null; 
      })}
  </div>
  );
}