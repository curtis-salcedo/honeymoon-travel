import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Service Imports
import { convertDateToDetail } from '../../utilities/services/business-service';
import { convertDateToLongDetail, convertDateToTime } from '../../utilities/services/business-service';

import { getAccommodationById } from '../../utilities/api/accommodations-api';
import { getActivityById } from '../../utilities/api/activities-api';

// Component imports
import Address from './Address';
import MobileMap from './MobileMap';

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
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HikingIcon from '@mui/icons-material/Hiking';
import Star from '@mui/icons-material/Star'

export default function Detail({ id, open, setOpen, data, setData }) {
  const { tripData } = useContext(DataContext)
  // State to hold the address for the map
  const [address, setAddress] = useState('')
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('')

  useEffect(() => {
    // useEffect to fetch the data for the category item selected
    setCategory(data.category)
    // if (data.address.images && data.address.images.length > 0) {
    //   setImage(data.address.images[0])
    // }
  }, [data.category]);

  // Handle the modal detail open
  const handleOpen = () => {
    setOpen(true);
  };
  // Handle the modal detail close
  const handleClose = () => {
    setOpen(false);
    setData('')
  };
  const handleWebsite = (e, website) => {
    window.open(website, '_blank')
  }

  function Accommodation() {
    return (
      <>
        <CardHeader
          title={data.address.name}
          subheader={data.type}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        />
        <Box
          sx={{
            border: 'none',
            borderRadius: '1vmin',
            padding: '1rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexgrow: 1,
          }}
          fullWidth
        >
          <Grid fullWidth>
            <Typography variant='body2' color='text.secondary'>
            Check-In Details: <br />
            {`${convertDateToLongDetail(data.checkIn)} at ${convertDateToTime(data.checkIn)}`}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
            Check-Out: <br />
            {`${convertDateToLongDetail(data.checkOut)} at ${convertDateToTime(data.checkOut)}`}
            </Typography>
          </Grid>
          <Box sx={{padding:1, margin:0, display:'flex', flexGrow:1, maxHeight:'20%', flexDirection:'column'}}>
          <Grid        
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              margin: 0,
            }} >
          </Grid>
        </Box>
        </Box>
      </>
    )
  }

  function Activity() {
    return (
      <>
        <CardHeader
          title={data.name}
          subheader={data.type}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: '280px',
          }}
        />
        <Box
          sx={{
            border: 'none',
            borderRadius: '1vmin',
            padding: '1rem',
            height: '48%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          fullWidth
        >
          <Grid fullWidth>
            <Typography variant='body1' color='text.secondary'>
              {`${convertDateToLongDetail(data.date)}, ${convertDateToTime(data)}`}
            </Typography>
            <Typography mt={3} variant='body2' color='text.secondary'>
              {data.details}
            </Typography>
          </Grid>
        </Box>
      </>
    )
  }

  function Meal() {
    return (
      <>
        <CardHeader
          title={data.address.name}
          subheader={data.type}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: '280px',
          }}
        />
        <Box
          sx={{
            border: 'none',
            borderRadius: '1vmin',
            padding: '1rem',
            height: '48%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          fullWidth
        >
          <Grid fullWidth>
            <Typography variant='body2' color='text.secondary'>
            {convertDateToLongDetail(data.date)}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              { data.isReservation ? 
                data.time ?
                `There is a reservation made at ${data.time}` 
                : 'There is a reservation made'
                : 'Walk-In' }
            </Typography>
          </Grid>
        </Box>
      </>
    )
  }

  function Travel() {
    return (
      <>
        <CardHeader
          title={data.type}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: '280px',
          }}
        />
        <Box
          sx={{
            border: 'none',
            borderRadius: '1vmin',
            padding: '1rem',
            height: '48%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          fullWidth
        >
          <Typography sx={{textAlign:'center'}} variant='body1' color='text.primary'>Departure</Typography>
          <Typography variant='body2' color='text.secondary'>
            {convertDateToLongDetail(data.departureDateTime)}
          </Typography>
          <Address address={data.departureLocation} />
        </Box>
        <Box
          sx={{
            border: 'none',
            borderRadius: '1vmin',
            padding: '1rem',
            height: '48%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          fullWidth
        >
          <Typography sx={{textAlign:'center'}} variant='body1' color='text.primary'>Arrival</Typography>
          <Typography variant='body2' color='text.secondary'>
            {convertDateToLongDetail(data.arrivalDateTime)}
          </Typography>
          <Address address={data.arrivalLocation} />
        </Box>
      </>
    )
  }

  // Modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '95vh',
    width: '95vw',
    bgcolor: 'background.paper',
    border: 'var(--dark) solid 2px',
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
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
    <Box container sx={{ ...style, margin: 0, padding: 1, border: 'solid 2px black' }}>        
    { image ?
        <CardMedia
          component="img"
          image={image}
          alt="location image"
          sx={{
            objectFit: 'cover',
            width: '100%',
            height: '25%',
            padding: 0,
          }}
        />
        :      
        <CardMedia
          sx={{
            objectFit: 'cover',
            height: '25%',
            width: '100%',
          }}>
          <HikingIcon
            mt={3}
            sx={{
              height: '25%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              margin: 'auto',
              fontSize: '2rem',
            }}
        /></CardMedia>
        }
        <Box 
          container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            height: 'auto',
            padding: 0,
          }}>
          { category === 'accommodation' ? <Accommodation /> : null }
          { category === 'activity' ? <Activity /> : null }
          { category === 'meal' ? <Meal /> : null }
          { category === 'travel' ? <Travel /> : null}
        </Box>
        { data.address ?
        <Box sx={{padding:1, margin:0, display:'flex', flexGrow:1, maxHeight:'20%', flexDirection:'column'}}>
          <Grid        
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              margin: 0,
            }} >
          { category !== 'travel' ?
            <Address address={data.address} />
          : null }
          </Grid>
        </Box>
        : null }
        <Button fullWidth color="primary" size="small" variant="outlined" outlined onClick={handleClose}>Close</Button>
    </Box>
  </Modal>
  )
}
