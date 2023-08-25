import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';
import { MapContext } from '../../utilities/MapContext';

// Service Imports
import { convertDate } from '../../utilities/services/business-service';
import { convertDateToLongDetail } from '../../utilities/services/business-service';

import * as MapService from '../../utilities/services/maps-service';

// Component Imports
import TravelForm from '../forms/TravelForm/TravelForm';
import AddButton from '../buttons/AddButton';

// Style Imports
import './Travel.css';
import {
  Button,
  Typography,
  Card,
  CardActions,
  Grid,
  Container,
  Box,

} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';


export default function Travel({ id, day, viewAll }) {
  const { activeTravels } = useContext(DataContext)
  const { mapLocation, setMapLocation } = useContext(MapContext)
  const [show, setShow] = useState(false)
  const [travels, setTravels] = useState([])
  
  useEffect(() => {
    setTravels(activeTravels)
  }, [activeTravels]);

  // Show the travel form
  const handleShow = (e) => {
    setShow(!show)
  }

  // Find a specific location on the map
  const getMapLocation = (e, address) => {
    console.log('getMapLocation', address)
    MapService.getAddressLocation(address, setMapLocation)
  }

  return (
    <Container sx={{ padding: 0, margin: 0 }}>
      <div className='add-button'>
        <AddButton
          text='Add Travel'
          primaryColor={`${'var(--dark)'}`}
          secondaryColor={`${'var(--white)'}`}
          onClick={handleShow}
        />
      </div>
      {show ? <TravelForm id={id} day={day} setShow={setShow} /> : null}
      <Card elevation={0}>
        <Grid container spacing={2}>
          {travels
            ? travels.map((t) => (
                <Grid item key={t._id} xs={12} >
                  <Card elevation={0} sx={{ padding: 1, display: 'flex', margin:'16px', backgroundColor:'var(--light)' }} >
                    <Grid container spacing={2} >
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            backgroundColor: 'var(--white)',
                            border: 'none',
                            borderRadius: '1vmin',
                            padding: '1rem',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          {/* Departure Information */}
                          <Typography variant='subtitle1'>
                            {t.type} - {t.identifier}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            Departure: {t.departureDateTime}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {t.departureLocation.website}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {t.departureLocation.name ? (
                              <>
                                {t.departureLocation.name}, {t.departureLocation.city},{' '}
                                {t.departureLocation.state}
                                <br />
                                {t.departureLocation.country}, {t.departureLocation.zipCode}
                              </>
                            ) : (
                              'No address recorded'
                            )}
                          </Typography>
                          <CardActions>
                          <Button
                              variant='outlined'
                              color='primary'
                              onClick={(e) => getMapLocation(e, t.departureLocation._id)}
                            >Map</Button>
                          </CardActions>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            backgroundColor: 'var(--white)',
                            border: 'none',
                            borderRadius: '1vmin',
                            padding: '1rem',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          {/* Arrival Information */}
                          <Typography variant='subtitle1'>
                            {t.type} - {t.identifier}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            Arrival: {t.arrivalDateTime}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {t.arrivalLocation.website}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {t.arrivalLocation.name ? (
                              <>
                                {t.arrivalLocation.name}, {t.arrivalLocation.city},{' '}
                                {t.arrivalLocation.state}
                                <br />
                                {t.arrivalLocation.country}, {t.arrivalLocation.zipCode}
                              </>
                            ) : (
                              'No address recorded'
                            )}
                          </Typography>
                          <CardActions>
                            <Button
                              variant='outlined'
                              color='primary'
                              onClick={(e) => getMapLocation(e, t.arrivalLocation._id)}
                            >Map</Button>
                          </CardActions>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </Card>
    </Container>
  );
}