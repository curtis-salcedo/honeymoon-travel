import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';
import { MapContext } from '../../utilities/MapContext';
import * as MapService from '../../utilities/services/maps-service';
import { convertDateToLongDetail } from '../../utilities/services/business-service';


// Component Imports
import MealForm from '../forms/MealForm/MealForm';
import AddButton from '../buttons/AddButton';

// Service Imports
import { convertDate } from '../../utilities/services/business-service';

// API Imports
import * as mealsAPI from '../../utilities/api/meals-api';

// Style Imports
import './Meal.css';
import {
  Button,
  Typography,
  Card,
  CardActions,
  Grid,
  Container,
  CardMedia,
  ButtonBase,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';


export default function Meal({ id, day, tripDays, viewAll }) {
  // Get the active meals from the data context
  const { activeMeals } = useContext(DataContext)
  // Set map location if the user clicks on the address
  const { mapLocation, setMapLocation } = useContext(MapContext)
  const [meals, setMeals] = useState([])
  const [show, setShow] = useState(false)
  
  useEffect(() => {
    // // Get the meals for each day
    setMeals(activeMeals)
  }, [activeMeals, viewAll])

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

  const getMapLocation = (e, address) => {
    console.log('getMapLocation', address)
    MapService.getAddressLocation(address, setMapLocation)
  }
  

  return (
    <Container sx={{ padding: 0, margin: 0 }}>
      <div className='add-button'>
        <AddButton
          text='Add Meal'
          primaryColor={`${'var(--dark)'}`}
          secondaryColor={`${'var(--white)'}`}
          onClick={handleShow}
        />
      </div>
    {/* <Button variant="contained" onClick={handleShow}>Add Activity</Button> */}
    { show ? <MealForm id={id} day={day} setShow={setShow} /> : null }
    {meals ? 
      meals.map((m) => (
        <Card id='hotel-card' elevation={0} key={m._id} sx={{padding:1}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container
              direction="column"
              spacing={2}
              sx={{
                backgroundColor:'var(--light)',
                border:'none',
                borderRadius:'1vmin',
                margin:'0',
                height: '250px',
                width: '400px'
              }}
              >
              <Grid item xs>
                <Typography gutterBottom variant="text" component="div">
                  {m.address.name} - {m.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {convertDateToLongDetail(m.date)}
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  <a href={m.address.website}>Website</a>
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  {m.address.phoneNumber}
                </Typography>
              </Grid>
              <Grid item>
                <CardActions>
                  <Button>Remove</Button>
                  <Button
                    onClick={(e) => getMapLocation(e, m.address._id)}
                  >Map</Button>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
              <ButtonBase sx={{ width: 200, height: 'auto' }}>
              { m.address.images ?
                <CardMedia
                  className='hotel-card-media'
                  component="img"
                  src={m.address.images[0]}
                  sx={{
                    width: '200px',
                    height: '150px',
                    borderRadius: '1vmin',
                  }}
                  alt="Image"
                    />
              : <AddIcon 
                  // className='hotel-card-media' 
                  sx={{
                    backgroundColor: 'var(--light)', // Background color
                    borderRadius: '1vmin', // Border radius
                    color: 'var(--your-icon-color)', // Icon color
                    height: '50%',
                    width: '50%',
                  }}
                /> }
              </ButtonBase>
              <Grid item xs>
                <Typography varient="body1" color="text.secondary"
                  sx={{
                    width: '200px',
                    height: '100px',
                  }}>
                  { m.address.name ? 
                    <>
                      {m.address.name}, {m.address.city}, {m.address.state}
                      <br />
                      {m.address.country}, {m.address.zipCode}
                    </>
                  : 'No address recorded' }
                </Typography>
              </Grid>
          </Grid>
        </Grid>
      </Card>
      ))
      :null }
  </Container>
  );
}