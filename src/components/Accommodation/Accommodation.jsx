import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../utilities/DataContext';
import { MapContext } from '../../utilities/MapContext';

// Serivce Imports
import { convertDate } from '../../utilities/services/business-service';

import * as MapService from '../../utilities/services/maps-service';

// Component Imports
import AccommodationForm from '../forms/AccommodationForm/AccommodationForm';
import AddButton from '../buttons/AddButton';
import Detail from '../Detail/Detail';

// Style Imports
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

export default function Accommodation({ id, day, viewAll }) {
  const { activeAccommodations } = useContext(DataContext)
  const { mapLocation, setMapLocation } = useContext(MapContext)
  const [accommodations, setAccommodations] = useState([])
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    setAccommodations(activeAccommodations);
  }, [activeAccommodations, viewAll])

  // Show the accommodation form
  const handleShow = (e) => {
    setShow(!show)
  }

  // Handle any actions when the user clicks on the icon
  const handleClick = (e, id) => {

  }

  const handleEdit = (e, id) => {
    const selected = accommodations.find((a) => a._id === id)
    setSelectedData(selected)
    setShowEdit(!showEdit)
  }
  
  const getMapLocation = (e, address) => {
    console.log('getMapLocation', address)
    MapService.getAddressLocation(address, setMapLocation)
  }

  console.log('accommodations', accommodations)

  return (
      <div className='DayDetailAccordion'>
        <Container>
        <div className='DayDetailButton'>
          <AddButton
              text='Add Stay'
              primaryColor={`${'var(--dark)'}`}
              secondaryColor={`${'var(--white)'}`}
              onClick={handleShow}
            />
          {/* <Button variant="contained" onClick={handleShow}>Add Accommodation</Button> */}
          { show ? <AccommodationForm id={id} day={day} setShow={setShow} /> : null }
        </div>
        
        { viewAll === true ? (
          <>
            {accommodations.map((accommodation) => (
              <Card id='hotel-card' elevation={0} key={accommodation._id} sx={{padding:1}}>
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
                        minHeight: '200px',
                      }}
                      >
                      <Grid item xs>
                        <Typography gutterBottom variant="text" component="div">
                          {accommodation.name} - {accommodation.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Check-in: { accommodation.checkInDate ? accommodation.checkInDate : '' }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Check-out: { accommodation.checkOutDate ? accommodation.checkOutDate : '' }
                        </Typography>
                      </Grid>
                      <Grid item>
                        <CardActions>
                          <Button>Remove</Button>
                          <Button
                            onClick={(e) => getMapLocation(e, accommodation.address)}
                          >Map</Button>
                        </CardActions>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <ButtonBase sx={{ width: 250, height: 150 }}>
                    <CardMedia
                      className='hotel-card-media'
                      component="img"
                      src={accommodation.address.images[0]}
                      alt="Image"
                      />
                    </ButtonBase>
                    <Grid item xs={12} sm container>
                      <Typography varient="body2" color="text.secondary" sx={{fontSize:'0.75rem'}}>
                        {accommodation.address.name}, {accommodation.address.city}, {accommodation.address.state}
                        <br />
                        {accommodation.address.country}, {accommodation.address.zipCode}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </>
        ) : (
          accommodations.map((accommodation) => {
            const isCheckInDay = convertDate(accommodation.checkInDate) === day;
            const isCheckOutDay = convertDate(accommodation.checkOutDate) === day;
  
            if (isCheckInDay || isCheckOutDay) {
              return (
                <Card id='hotel-card' elevation={0} key={accommodation._id} sx={{padding:1}}>
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
                      }}
                      >
                      <Grid item xs>
                        <Typography gutterBottom variant="h6" component="div">
                          {accommodation.name} - {accommodation.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Check-in: { accommodation.checkInDate ? accommodation.checkInDate : '' }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Check-out: { accommodation.checkOutDate ? accommodation.checkOutDate : '' }
                        </Typography>
                      </Grid>
                      <Grid item>
                        <CardActions>
                          <Button>Remove</Button>
                          <Button
                            onClick={(e) => getMapLocation(e, accommodation.address)}
                          >Map</Button>
                        </CardActions>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                      <ButtonBase sx={{ width: 250, height: 150 }}>
                      <CardMedia
                        className='hotel-card-media'
                        component="img"
                        src={accommodation.address.images[0]}
                        alt="Image"
                        />
                      </ButtonBase>
                  </Grid>
                </Grid>
              </Card>
              );
            }
            return null;
          })
        )}
        </Container>
      </div>
  );
}