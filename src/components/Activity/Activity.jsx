import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';
import { MapContext } from '../../utilities/MapContext';

// Service Imports
import { convertDate } from '../../utilities/services/business-service';
import { getMapLocation } from '../../utilities/services/maps-service';
import { convertDateToDetail } from '../../utilities/services/business-service';
import * as MapService from '../../utilities/services/maps-service';

// Component Imports
import ActivityForm from '../forms/ActivityForm/ActivityForm';
import AddButton from '../buttons/AddButton';

// Style Imports
import './Activity.css';
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
import AddIcon from '@mui/icons-material/Add';



export default function Activity({ id, day, viewAll }) {
  // Pull active activities from the data context file
  const { activeActivities } = useContext(DataContext)
  // Set map location if the user clicks on the address
  const { mapLocation, setMapLocation } = useContext(MapContext)
  // Set state of activities to iterate through
  const [activities, setActivities] = useState([])

  // Set the state for the activity form to be shown or not
  const [show, setShow] = useState(false)

  useEffect(() => {
    setActivities(activeActivities);
  }, [activeActivities, viewAll])

  // Show the activity form
  const handleShow = (e) => {
    setShow(!show)
  }

  const getMapLocation = (e, address) => {
    console.log('getMapLocation', address)
    MapService.getAddressLocation(address, setMapLocation)
  }
  
  return (
    <Container>
      <div className='add-button'>
        <AddButton
          text='Add Activity'
          primaryColor={`${'var(--dark)'}`}
          secondaryColor={`${'var(--white)'}`}
          onClick={handleShow}
        />
      </div>
      { show ? <ActivityForm id={id} day={day} setShow={setShow} /> : null }
      {activities ? 
        activities.map((a) => (
          <Card id='hotel-card' elevation={0} key={a._id}>
          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={12} sm container>
              <Grid
                item
                container
                xs={12}
                direction="column"
                spacing={2}
                sx={{
                  padding: 2,
                  backgroundColor:'var(--light)',
                  border:'none',
                  borderRadius:'1vmin',
                  width: '425px',
                  height: '250px',
                }}
                >

                <Grid item xs>
                  <Typography gutterBottom variant="text" component="div">
                    {a.name} - {a.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {convertDateToDetail(a.date)} - {a.startTime}
                  </Typography>
                  <Typography variant="body3" color="text.secondary">
                    {a.details}
                  </Typography>
                </Grid>

                <Grid item>
                  <CardActions>
                    <Button>Remove</Button>
                    <Button
                      onClick={(e) => getMapLocation(e, a.address)}
                    >Map</Button>
                  </CardActions>
                </Grid>

              </Grid>
            </Grid>

            <Grid 
              container
              direction="column"
              justifyContent="space-between"
              sx={{
                width: '250px', // Adjust the width as needed
                height: '250px', // Adjust the height as needed
                padding: '8px', // Add spacing as needed>
              }}>

                <ButtonBase sx={{ width: 250, height: 150 }}>
                { a.address.images > 0 ?
                  <CardMedia
                    className='card-media'
                    component="img"
                    src={a.address.images[0]}
                    alt="Image"
                      />
                : <AddIcon 
                    // className='hotel-card-media' 
                    sx={{
                      backgroundColor: 'var(--light)', // Background color
                      borderRadius: '1vmin', // Border radius
                      color: 'var(--your-icon-color)', // Icon color
                    }}
                  /> }
                </ButtonBase>

                <Grid item xs>
                  <Typography varient="body2" color="text.secondary" >
                    {a.address.name}, {a.address.city}, {a.address.state}
                    <br />
                    {a.address.country}, {a.address.zipCode}
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