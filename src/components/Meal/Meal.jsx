import React, { useEffect, useState } from 'react';

// Component Imports
import MealForm from '../forms/MealForm/MealForm';

// API Imports
import * as mealsAPI from '../../utilities/api/meals-api';

// Style Imports
import './Meal.css';
import { Button } from '@mui/material';

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
      <h1>Meal Component</h1>
      {activeMeals.map((meal) => {
        // Check if the date matches the day and display the meal if it matches
        if (meal.date === day) {
          return <h1 key={meal._id}>{meal.businessName}</h1>;
        }
          // Render nothing if date doesn't match
          return null; 
      })}
      <Button variant="contained" onClick={handleShow}>Show Meal Form</Button>
      { show ? <MealForm id={id} day={day} setShow={setShow} /> : null }
  </div>
  );
}