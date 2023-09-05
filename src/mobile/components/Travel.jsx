import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';
import { MapContext } from '../../utilities/MapContext';

// Service Imports
import * as MapService from '../../utilities/services/maps-service';
import { convertDate, convertDateToDetail } from '../../utilities/services/business-service';

// Component Imports
import Detail from './Detail';
import MobileMap from './MobileMap';

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


export default function Travel({ id, travels, open, setOpen }) {
  const { tripData } = useContext(DataContext)
  const [checked, setChecked] = useState(true);
  const [categoryId, setCategoryId] = useState('')
  const [mapId, setMapId] = useState('')
  const [openMap, setOpenMap] = useState(false);
  const [address, setAddress] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [data, setData] = useState('')

  const handleDetailOpen = (e, id) => {
    setCategoryId(id);
    // Find the activity with the matching ID in tripData.activities
    const selected = tripData.travels.find((s) => s._id === id);
    if (selected) {
      // Now, selectedActivity contains the object with the matching ID
      console.log("Selected Travel:", selected);
      selected.category = 'accommodation'
      setData(selected)
      setOpen(true);
    } else {
      console.error("Travel not found with ID:", id);
    }
  }
  const handleMapOpen = (e, address) => {
    setSelectedAddress(address)
    setMapId(address);
    setOpenMap(true);
  };
  // const handleWebsite = (e, website) => {
  //   window.open(website, '_blank')
  // }

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
          <Grow
            key={t._id}
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
                {/* <a href={t.departureLocation.website}>Website</a> */}
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

                <Grid sx={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                  {/* { t.arrivalLocation.address.website ? <Button onClick={(e) => handleWebsite(e, t.address.website)}>Website</Button> : null } */}
                  <Button onClick={(e) => handleMapOpen(e, t.address)}>Map</Button>
                  <Button onClick={(e) => handleDetailOpen(e, t._id)} >Details</Button>
                </Grid>

              </Box>
            </Paper>
          </Grow>  
          ) : null }   
        </Grid>
        { open ? <Detail id={id} open={open} setOpen={setOpen} data={data} setData={setData} /> : null }
        { openMap ? <MobileMap address={selectedAddress} setAddress={setAddress} openMap={openMap} setOpenMap={setOpenMap} /> : null }
      </Box>
    </Container>
  );  
}