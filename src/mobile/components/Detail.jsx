import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Service Imports
import { convertDateToDetail } from '../../utilities/services/business-service';
import { convertDateToLongDetail } from '../../utilities/services/business-service';
import { getAccommodationById } from '../../utilities/api/accommodations-api';

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
import Star from '@mui/icons-material/Star'

export default function Detail({ id, category, category_id, open, setOpen }) {
  const { activeTrip } = useContext(DataContext)
  // State to hold the address for the map
  const [address, setAddress] = useState('')
  const [data, setData] = useState('')

  useEffect(() => {
    // useEffect to fetch the data for the category item selected
    fetchData();

  }, [category]);

  console.log(data)

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

  function AddressDisplay() {
    // Function to determine amount of stars
    const rating = Number(data.address.rating)
    return (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="body2" color='text.secondary'>
            {`${data.address.name ? data.address.name : ''}`}
          </Typography>
          <Typography variant="body2" color='text.secondary'>
            {`${data.address.addressNumber} ${data.address.streetName}`}
          </Typography>
          <Typography variant="body2" color='text.secondary'>
            {`${data.address.city}, ${data.address.state} ${data.address.zipCode}`}
          </Typography>
          <Typography variant="body2" color='text.secondary'>
            {`${data.address.country}`}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        {[...Array(data.address.rating)].map((_, index) => (
          <Star key={index} sx={{ color: 'primary.main', marginRight: '4px' }} />
        ))}
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
          {rating}
        </Typography>
        <Typography>

        </Typography>
      </Grid>
      </Grid>
    );
  }

  console.log(data)
  

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

  // Modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '90vh',
    width: '90vw',
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
      <h2 id="parent-modal-title">Modal Detail View</h2>

      { data && category === 'accommodation' ? 
      <>
        <Accommodation />
        <AddressDisplay />
      </>
      : null }

      <Button fullWidth onClick={handleClose}>Cancel</Button>

    </Box>
  </Modal>
  )
}
