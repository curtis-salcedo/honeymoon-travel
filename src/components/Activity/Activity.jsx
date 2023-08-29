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

      { activities ? 
        activities.map((a) => (
        <Card id='hotel-card' elevation={0} key={a._id} sx={{padding:1}}>
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
                      onClick={(e) => getMapLocation(e, a.address._id)}
                    >Map</Button>
                  </CardActions>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <ButtonBase sx={{ width: 200, height: 'auto' }}>
              { a.address.images ?
                <CardMedia
                  className='hotel-card-media'
                  component="img"
                  src={a.address.images[0]}
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
                  { a.address.name ? 
                    <>
                      {a.address.name}, {a.address.city}, {a.address.state}
                      <br />
                      {a.address.country}, {a.address.zipCode}
                    </>
                  : 'No address recorded' }
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        ))
        : null }
    </Container>
  );
}