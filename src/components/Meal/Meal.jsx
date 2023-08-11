import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';


// Component Imports
import MealForm from '../forms/MealForm/MealForm';

// Service Imports
import { convertDate } from '../../utilities/services/business-service';

// API Imports
import * as mealsAPI from '../../utilities/api/meals-api';

// Style Imports
import './Meal.css';
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  Card,
  CardActions,
  CardContent,

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
    <Typography variant="h6">Meal Component</Typography>

    <Button variant="contained" onClick={handleShow}>Add</Button>

    {show ? <MealForm id={id} day={day} setShow={setShow} /> : null}

    {activeMeals.map((meal) => {
      if (convertDate(meal.date) === day) {
        return (
          <Card key={meal._id} className='ExpandedDetails'>
            <CardContent>
              <Typography variant="body1">{meal.businessName}</Typography>
              {meal.isReservation && <Typography variant="body2">Reservation</Typography>}
            </CardContent>
            <CardActions>
              <Button onClick={(e) => handleShowDetails(e, meal._id)} size="small">Details</Button>
              <Tooltip title="Options">
                <IconButton onClick={(e) => handleClick(e, meal._id)}>
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        );
      }
      return null;
    })}
  </div>
  );
}