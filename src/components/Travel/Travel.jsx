import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Service Imports
import { convertDate } from '../../utilities/services/business-service';

// Component Imports
import TravelForm from '../forms/TravelForm/TravelForm';
import AddButton from '../buttons/AddButton';

// Style Imports
import './Travel.css';
import {
  Button,
} from '@mui/material';
import { act } from 'react-dom/test-utils';

export default function Travel({ id, day }) {
  const { activeTravels } = useContext(DataContext)
  const [show, setShow] = useState(false)
  
  useEffect(() => {

  }, [activeTravels]);

  // Show the travel form
  const handleShow = (e) => {
    setShow(!show)
  }

  return (
    <div className="accordion-sub-container">
        <div className='add-button'>
          <AddButton
              text='Add Travel'
              primaryColor={`${'var(--dark)'}`}
              secondaryColor={`${'var(--white)'}`}
              onClick={handleShow}
            />
        </div>
      { show ? <TravelForm id={id} day={day} setShow={setShow} /> : null }

      { activeTravels.map((travel) => {
        // Check if the date matches the day and display the travel if it matches
        if (convertDate(travel.departure) === day) {
          return (
            <div key={travel._id}>
              <h3>{travel.identifier}</h3>
            </div>
          )
        }
      })}

    </div>
  );
}