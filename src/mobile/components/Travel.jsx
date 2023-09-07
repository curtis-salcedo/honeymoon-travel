import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';
import { MapContext } from '../../utilities/MapContext';

// Service Imports
import * as MapService from '../../utilities/services/maps-service';
import { convertDate, convertDateToDetail } from '../../utilities/services/business-service';
import { convertDateToLongDetail } from '../../utilities/services/business-service';

// Component Imports
import TravelDetail from './Detail';
import MobileMap from './MobileMap';
import Detail from './Detail';

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
  ButtonBase,
  CardMedia,
  CardHeader,

  
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';


export default function Travel({ id, travels, open, setOpen }) {
  const { tripData } = useContext(DataContext)
  const [checked, setChecked] = useState(true);
  const [categoryId, setCategoryId] = useState('')
  const [mapId, setMapId] = useState('')
  const [openMap, setOpenMap] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [data, setData] = useState('')
  
  // Adress stores current address for map
  const [address, setAddress] = useState(null)
  // departureAddress helps display the address for the detail
  const [depatureAddress, setDepartureAddress] = useState('')
  // arrivalAddress helps display the address for the detail
  const [arrivalAddress, setArrivalAddress] = useState('')

  const handleDetailOpen = (e, id, a) => {
    setCategoryId(id);
    // Find the activity with the matching ID in tripData.activities
    const selected = tripData.travels.find((s) => s._id === id);
    if (selected) {
      // Now, selectedActivity contains the object with the matching ID
      console.log("Selected Travel:", selected);
      selected.category = 'travel'
      setData(selected)
      setOpen(true);
    } else {
      console.error("Travel not found with ID:", id);
    }
  }
  const handleMapOpen = (e, address) => {
    console.log('address at map open', address)
    setSelectedAddress(address)
    setMapId(address);
    setOpenMap(true);
  };

  return (
    <Box sx={{ height: '100%', width: 'auto', padding:0, margin:0 }}>
      <Grid sx={{ 
        display: 'flex',
        gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
        gridAutoColumns: "minmax(160px, 2fr)",
        height: '100%',
        overflowX: 'scroll',
        margin: 0,
        padding: 0,
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
            height: '90%',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            }} 
            elevation={3}
            >

            <CardHeader
              title={t.type}
              // subheader={a.type}
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: '280px',
                textAlign: 'center',
              }}
            />

            <Box
              sx={{
                backgroundColor: 'var(--light)',
                border: 'none',
                borderRadius: '1vmin',
                padding: '1rem',
                height: '48%',
                display: 'flex',
                flexDirection: 'column',
                width: '280px',
              }}>
              <Typography variant='body2' color='text.secondary'>
                Departing: {`${convertDateToLongDetail(t.departureDateTime)}`}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {`${t.departureLocation.city}, ${t.departureLocation.state}, ${t.departureLocation.country}`}
              </Typography>
              <Grid sx={{display:'flex',flexDirection:'row',justifyContent:'space-evenly', marginTop:'5%'}}>
                <Button onClick={(e) => handleMapOpen(e, t.departureLocation)}>Map</Button>
                <Button onClick={(e) => handleDetailOpen(e, t._id)}>Details</Button>
              </Grid>
            </Box>

            <Box
              sx={{
                backgroundColor: 'var(--light)',
                border: 'none',
                borderRadius: '1vmin',
                padding: '1rem',
                height: '40%',
                display: 'flex',
                flexDirection: 'column',
                width: '280px',
              }}>
              <Typography variant='body2' color='text.secondary'>
                Arriving: {`${convertDateToLongDetail(t.arrivalDateTime)}`}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {`${t.arrivalLocation.city}, ${t.arrivalLocation.state}, ${t.arrivalLocation.country}`}
              </Typography>
              <Grid sx={{display:'flex',flexDirection:'row',justifyContent:'space-evenly', marginTop:'5%'}}>
                <Button onClick={(e) => handleMapOpen(e, t.arrivalLocation)}>Map</Button>
                <Button onClick={(e) => handleDetailOpen(e, t._id, t.departureLocation)}>Details</Button>
              </Grid>
            </Box>
          </Paper>
        </Grow> 
        ) : null }   
      </Grid>
      { open ? <Detail id={id} open={open} setOpen={setOpen} data={data} setData={setData} /> : null }
      { openMap ? <MobileMap address={selectedAddress} setAddress={setAddress} openMap={openMap} setOpenMap={setOpenMap} /> : null }
    </Box>
  );  
}