import React, { useEffect, useState } from 'react';

// Component Imports
import MealForm from '../forms/MealForm/MealForm';

// API Imports
import * as mealsAPI from '../../utilities/api/meals-api';

// Style Imports
import './Meal.css';
import {
  Button,
  Typography,

} from '@mui/material';

export default function Meal({ id, day, tripDays }) {
  const [show, setShow] = useState(false)
  const [activeMeals, setActiveMeals] = useState([])
  
    useEffect(() => {
      // Get the meals for each day
      fetchMeals();
    }, [])

  // Show the meal form
  const handleShow = () => {
    setShow(!show)
  }

  // Show the meal details
  const handleShowDetails = (e, id) => {
    console.log('Here is the meal id needed to find all the details for that meal and edit it.', id)
  }

  const fetchMeals = async () => {
    try {
      const meals = await mealsAPI.getAllMeals(id);
      setActiveMeals(meals)
    } catch (err) {
      console.log('Error at fetching meals', err)
    }
  }

  console.log('activeMeals', activeMeals)

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
            </div>
          );
        }
          // Render nothing if date doesn't match
          return null; 
      })}
  </div>
  );
}