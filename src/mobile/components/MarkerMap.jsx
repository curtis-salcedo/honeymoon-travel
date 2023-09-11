import React, { useState, useEffect, useContext } from 'react';
import { Map, Marker, Overlay, CustomIcon } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers'

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

import HikingIcon from '@mui/icons-material/Hiking';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

export default function MarkerMap({ selected, openMap, setOpenMap }) {
  const [addresses, setAddresses] = useState([]);
  const [ addressList, setAddressList ] = useState([]);

  useState(() => {
    getAddresses();
  }, [openMap]);

  function getAddresses() {
    const obj = {};
    console.log(selected)
    // Get accommodation - checkIn - addresses
    if (selected.checkIn.length > 0) {
      selected.checkIn.forEach((a) => {
        // Get address lat and long
        obj[a.addressId] = a.addressId;
      });
      // Set address Icons for markers
    }
    // Get accommodation - checkOut - addresses
    if (selected.checkOut.length > 0) {
      selected.checkOut.forEach((a) => {
        // Get address lat and long
        obj[a.addressId] = a.addressId;
      });
    }
    // Get activity addresses
    if (selected.activities.length > 0) {
      selected.activities.map((a) => {
        // Get address lat and long
        obj[a.address._id] = [<HikingIcon />, a.type, a.address.latitude, a.address.longitude];

      });
    }
    // Get meal addresses
    if (selected.meals.length > 0) {
      selected.meals.map((a, idx) => {
        // Get address lat and long
        console.log('address a and index', idx)
        obj[a.address._id] = [<LocalDiningIcon />, a.type, a.address.latitude, a.address.longitude];

      });
    }
    setAddressList([...addressList, obj])

  }


  // Handle the modal detail close and reset data
  const handleClose = () => {
    setOpenMap(false);
    setAddresses('');
  };
  // Modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '95vh',
    width: '80vw',
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
  const [center, setCenter] = useState([39.82684649999999, -105.0550565])
  const [zoom, setZoom] = useState(11)
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`

  const maptilerProvider = maptiler(process.env.MAPTILER_API_KEY, 'streets')

  const CustomIcon = ({ label }) => {
    const iconStyle = {
      width: '40px',
      height: '40px',
      backgroundColor: 'red', // Customize the background color
      borderRadius: '50%', // Make it a circle (you can adjust the shape)
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white', // Customize the text color
      fontSize: '16px', // Customize the font size
      fontWeight: 'bold',
    };
  
    return (
      <div style={iconStyle}>
        {label}
      </div>
    );
  };

  return (
    <Box
    open={openMap}
    onClose={handleClose}
    aria-labelledby="parent-modal-title"
    aria-describedby="parent-modal-description"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    }}
  >
    <Box sx={{ ...style, margin: 0, padding: 0, border: 'solid 2px black' }}>
      <Box>
        <Map
          height={300}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          { addressList
            ? addressList.map((address, index) => (
            <Marker
              key={index}
              width={40} // Adjust the width to match the icon's width
              anchor={[address.lat, address.long]}
              color={color}
            >
              {address.icon ? <CustomIcon label={address.icon} /> : null}
            </Marker>
              ))
            : null}
        </Map>
      </Box>
      <Box sx={{ padding: 1, margin: 0, display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <Button fullWidth color="primary" size="small" variant="outlined" outlined onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Box>
  </Box>
  )
}