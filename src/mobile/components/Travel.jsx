import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';
import { MapContext } from '../../utilities/MapContext';

// Service Imports
import * as MapService from '../../utilities/services/maps-service';
import { convertDate, convertDateToDetail } from '../../utilities/services/business-service';

// Component Imports


// Style Imports
import {
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  Grid,
  Container,
  Box,
  Paper,
  FormControlLabel,
  Switch,
  Grow,
  
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
    setChecked(true)
  }, [activeTravels]);

  // Find a specific location on the map
  const getMapLocation = (e, address) => {
    console.log('getMapLocation', address)
    MapService.getAddressLocation(address, setMapLocation)
  }

  // Test Area
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };


  return (
    <Container sx={{ padding: 0, margin: 0 }}>
      <Box sx={{ height: '300px' }}>
      <Grid sx={{ 
        display: 'flex',
        gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
        gridAutoColumns: "minmax(160px, 2fr)",
        height: '100%',
        width: 'auto',
        overflowX: 'scroll',
        }}>
        { travels
          ? travels.map((t) => 
          <React.Fragment key={t._id}>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <Paper sx={{
              m: 1,
              backgroundColor: 'var(--white)',
              height: 'auto',
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              }} 
              elevation={4}
              >

              <Typography variant='title2'>{t.type} { t.identifier ? ` - ${t.identifier}` : '' }</Typography>

              <Box
                sx={{
                  backgroundColor: 'var(--light)',
                  border: 'none',
                  borderRadius: '1vmin',
                  padding: '1rem',
                  height: '48%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '280px',
                }}
              >
                <Typography variant='body2' color='text.secondary'>
                  Departure: <br /> {convertDateToDetail(t.departureDateTime)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                <a href={t.departureLocation.website}>Website</a>
                </Typography>
                {/* <Typography variant='body2' color='text.secondary'>
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
                </Typography> */}
              </Box>
              <Box
                  sx={{
                    backgroundColor: 'var(--light)',
                    border: 'none',
                    borderRadius: '1vmin',
                    padding: '1rem',
                    height: '48%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '280px',
                  }}
                >
                <Typography variant='body2' color='text.secondary'>
                  Arrival: <br /> {convertDateToDetail(t.arrivalDateTime)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  <a href={t.arrivalLocation.website}>Website</a>
                </Typography>
                {/* <Typography variant='body2' color='text.secondary'>
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
                </Typography> */}
              </Box>
            </Paper>
          </Grow>
          {/* <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
            >
            <Typography variant='subtitle1'>
              {t.type} - {t.identifier}
            </Typography>
          </Grow> */}
          </React.Fragment>     
          ) : null }   
        </Grid>
      </Box>
    </Container>
  );  
}