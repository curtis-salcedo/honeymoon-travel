import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../utilities/DataContext';
import { MapContext } from '../../utilities/MapContext';

// Serivce Imports
import { convertDate, convertDateToLongDetail } from '../../utilities/services/business-service';

import * as MapService from '../../utilities/services/maps-service';

// Component Imports
import AccommodationForm from '../forms/AccommodationForm/AccommodationForm';
import AddButton from '../buttons/AddButton';
import Detail from '../Detail/Detail';

// Style Imports
import './../../index.css';
import './Accommodation.css';
import '../DayDetail/DayDetail.css'
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  Card,
  CardActions,
  CardContent,
  Grid,
  Container,
  CardMedia,
  Paper,
  ButtonBase,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';

export default function Accommodation({ id, day, viewAll }) {
  const { activeAccommodations } = useContext(DataContext)
  const { mapLocation, setMapLocation } = useContext(MapContext)
  const [accommodations, setAccommodations] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    setAccommodations(activeAccommodations);
  }, [activeAccommodations, viewAll])

  // Show the accommodation form
  const handleShow = (e) => {
    setShow(!show)
  }
  
  // Find a specific location on the map
  const getMapLocation = (e, address) => {
    console.log('getMapLocation', address)
    MapService.getAddressLocation(address, setMapLocation)
  }

  return (
    <Container >
      <div className='add-button'>
        <AddButton
            text='Add Stay'
            primaryColor={`${'var(--dark)'}`}
            secondaryColor={`${'var(--white)'}`}
            onClick={handleShow}
          />
        {/* <Button variant="contained" onClick={handleShow}>Add Accommodation</Button> */}
        { show ? <AccommodationForm id={id} day={day} setShow={setShow} /> : null }
      </div>
      {accommodations ? 
        accommodations.map((a) => (
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
                    {a.address.name} - {a.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Check-in: { a.checkInDate ? convertDateToLongDetail(a.checkInDate) : '' }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Check-out: { a.checkOutDate ? convertDateToLongDetail(a.checkOutDate) : '' }
                  </Typography>
              </Grid>
              <Grid item>
                <CardActions>
                  <Button>Remove</Button>
                  <Button
                    // onClick={(e) => getMapLocation(e, m.address)}
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
      :null }
    </Container>
  );
}