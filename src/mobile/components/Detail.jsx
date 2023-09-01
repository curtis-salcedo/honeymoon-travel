import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Service Imports
import { convertDateToDetail } from '../../utilities/services/business-service';
import { convertDateToLongDetail } from '../../utilities/services/business-service';
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

export default function Detail({ id, category, category_id, open, setOpen, data, setData }) {
  const { activeTrip } = useContext(DataContext)
  // State to hold the address for the map
  const [address, setAddress] = useState('')

  useEffect(() => {
    // useEffect to fetch the data for the category item selected
    fetchData();

  }, [category]);

  const fetchData = async () => {
    if (category === 'accommodation') {
      // Fetch the accommodation data by the category_id
      try {
        const d = await getAccommodationById(category_id);
        setData(d)
        setAddress(d.address)
      } catch (error) {
        console.error('Error fetching accommodation:', error);
      }
    }
  }

  // Handle the modal detail open
  const handleOpen = () => {
    setOpen(true);
  };
  // Handle the modal detail close
  const handleClose = () => {
    setOpen(false);
    setData('')
  };

  function Accommodation() {
    return (
      <>
          <CardMedia
            component="img"
            image={data.address ? data.address.images[0] : ''}
            alt="location image"
            sx={{
              objectFit: 'cover',
              width: '100%',
              height: '180px',
            }}
          />

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
            backgroundColor: 'var(--light)',
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
            Check-In: {convertDateToLongDetail(data.checkInDate)} { data.CheckInTime ? data.CheckInTime : '' }
            </Typography>
            <Typography variant='body2' color='text.secondary'>
            Check-Out: {convertDateToLongDetail(data.checkOutDate)} { data.CheckInTime ? data.CheckOutTime : '' }
            </Typography>
          </Grid>
        </Box>
      </>
    )
  }

  function Activity() {
    return (
      <>
      <CardMedia
        sx={{
          objectFit: 'cover',
          height: '200px',
          width: '100%',
        }}
      >
        <HikingIcon
          mt={3}
          sx={{
            height: '180px',
            width: '200px',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            margin: 'auto',
            fontSize: '2rem', // Adjust the icon size as needed
          }}
        />
      </CardMedia>

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
            backgroundColor: 'var(--light)',
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
              {`${convertDateToLongDetail(data.date)}, ${data.startTime}`}
            </Typography>
            <Typography mt={3} variant='body2' color='text.secondary'>
              {data.details}
            </Typography>
          </Grid>
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
    <Box sx={{ ...style, margin: 0, padding: 1, border: 'solid 2px black' }}>
      { data && category === 'accommodation' ? 
      <>
        <Accommodation />
        <Address address={data.address} />
      </>
      : null }
      { data && category === 'activity' ? 
      <>
        <Activity />
        <Address address={data.address} />
      </>
      : null }



      <Button fullWidth onClick={handleClose}>Close</Button>

    </Box>
  </Modal>
  )
}
