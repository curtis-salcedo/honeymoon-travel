import React, { useState, useEffect, useContext } from 'react';
import { MapContext } from '../../utilities/MapContext';
import { DataContext } from '../../utilities/DataContext';

import * as MapsService from '../../utilities/services/maps-service';

// Component imports
import Address from './Address';

// Style imports
import {
  Typography,
  Container,
  Button,
  Box,
  Modal,
  ChildModal,
  Grow,
  Grid,
  Paper,
  CardHeader,
  CardMedia,
} from '@mui/material';

export default function MobileMap({ address, setAddress, openMap, setOpenMap }) {
  // const { address } = useContext(DataContext)
  // const { mapLocation, setMapLocation, findOne } = useContext(MapContext)
  const [mapLocation, setMapLocation] = useState('')
  const [query, setQuery] = useState('')

  console.log(address)

  useEffect(() => {
    // Calculate query directly from the address prop
    const newQuery = address ? `${address.latitude},${address.longitude}` : 'denver';
    setQuery(newQuery);
  }, [openMap, address]);

  // Handle the modal detail close and reset data
  const handleClose = () => {
    setOpenMap(false);
    setAddress('');
    setQuery('')
  };

  // Create the seach Query for Long/Lat from the address
  // const query = mapLocation ? `${mapLocation.latitude},${mapLocation.longitude}` : 'denver';
  const zoom = 'zoom=15'
  const mapId = 'map_id=eb2f3cc6944a4293'

  // Modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '95vh',
    width: '95vw',
    bgcolor: 'background.paper',
    border: 'var(--blue) solid 2px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '2vmin',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  return (
    <Modal
      open={openMap}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
    <Box sx={{ ...style, margin: 0, padding: 0, border: 'solid 2px black' }}>
      <Paper container className='mobile-map'>
        <iframe 
          className='mobile-map-area'
          title='this is a title'
          style={{ border: '0' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC-cmS2g3Y3yti-MmZe9A4TbISPziKMEP4&q=${query}&${zoom}`}>
        </iframe>
      </Paper>
      <Box sx={{padding:1, margin:0, display:'flex',flexGrow:1, flexDirection:'column'}}>
        <Button  fullWidth color="primary" size="small" variant="outlined" outlined>Find Nearby</Button>
        <Box container sx={{padding:1, margin:0, display:'flex',flexGrow:1, flexDirection:'column'}}>
          <Address address={address} />
        </Box>
      <Button fullWidth color="primary" size="small" variant="outlined" outlined onClick={handleClose}>Close</Button>
      </Box>

    </Box>
  </Modal>
  )
}