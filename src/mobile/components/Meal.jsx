import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Service imports
import { getTrips } from '../../utilities/services/trips-service';
import { convertDateToDetail, convertDateToLongDetail } from '../../utilities/services/business-service';

// Component imports
import Detail from './Detail';
import MobileMap from './MobileMap';

// Style imports
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
  Avatar,
  IconButton,
  Collapse,
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function Meal({ id, meals, open, setOpen }) {
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
    const selected = tripData.meals.find((s) => s._id === id);
    if (selected) {
      // Now, selectedActivity contains the object with the matching ID
      console.log("Selected Meal:", selected);
      selected.category = 'meal'
      setData(selected)
      setOpen(true);
    } else {
      console.error("Meal not found with ID:", id);
    }
  }
  const handleMapOpen = (e, address) => {
    setSelectedAddress(address)
    setMapId(address);
    setOpenMap(true);
  };
  const handleWebsite = (e, website) => {
    window.open(website, '_blank')
  }

  console.log(meals)

  return (
    <Box sx={{ height: '100%', width: 'auto', padding:0, margin:0, backgroundColor:'var(--light)' }}>
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
      { meals
        ? meals.map((m) => 
        <Grow
          key={m._id}
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
            elevation={5}
            >
            <CardMedia
              component="img"
              image={m.address.image ? m.address.image : 'https://source.unsplash.com/random'}
              alt="meal image"
              sx={{
                objectFit: 'cover',
                width: '100%',
                height: '180px',
                borderRadius: '1vmin 1vmin 0 0',
              }}
            />
            <CardHeader
              title={m.address.name}
              subheader={m.type}
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
                width: '280px',
              }}
            >
              <Typography variant='body2' color='text.secondary'>
              {convertDateToLongDetail(m.date)}
              </Typography>
              { m.isReservation ? 
                <Typography variant='body2' color='text.secondary'>
                  Reservation made
                </Typography>
                : null }
              <Grid sx={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                { m.address.website ? <Button onClick={(e) => handleWebsite(e, m.address.website)}>Website</Button> : null }
                <Button onClick={(e) => handleMapOpen(e, m.address)}>Map</Button>
                <Button onClick={(e) => handleDetailOpen(e, m._id)} >Details</Button>
              </Grid>
            </Box>
          </Paper>
        </Grow>   
        ) : null }   
      </Grid>
      { open ? <Detail id={id} category='meal' category_id={categoryId} open={open} setOpen={setOpen} data={data} setData={setData} /> : null }
      { openMap ? <MobileMap address={selectedAddress} setAddress={setAddress} openMap={openMap} setOpenMap={setOpenMap} /> : null }
    </Box>
  )
}