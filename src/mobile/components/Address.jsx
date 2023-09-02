import React, { useState, useEffect } from 'react';

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
import Star from '@mui/icons-material/Star'
import StarHalf from '@mui/icons-material/StarHalf'

export default function Address({ address }) {
  const rating = (address.rating ? parseFloat(address.rating) : 0)
  // Function to determine amount of stars and half stars
  const handleWebsite = (e, website) => {
    window.open(website, '_blank')
  }
  function StarRating() {
    const fullStars = parseInt(rating);
    const halfStar = rating - fullStars >= 0.1;
    
    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <Star key={index} sx={{ color: 'primary.main', marginRight: '4px' }} />
          ))}
        {halfStar && (
          <StarHalf sx={{ color: 'primary.main', marginRight: '4px' }} />
          )}
      </>
    );
  }

  return (
    <Grid container xs={12}>
      <Grid item xs={6} sx={{display:'flex', flexGrow:1, flexDirection:'column', justifyContent:'center'}} >
        <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', maxHeight: '2.5em', textOverflow: 'ellipsis' }}>
          {`${address && address.name ? address.name : ''}`}
        </Typography>
        <Typography variant="body2" color='text.secondary'>
          {`${address.addressNumber} ${address.streetName}`}
        </Typography>
        <Typography variant="body2" color='text.secondary'>
          {`${address.city}, ${address.state} ${address.zipCode}`}
        </Typography>
        <Typography variant="body2" color='text.secondary'>
          {`${address.country}`}
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignSelf:'center'}}>
        { address.website ? <Button xs={6} color="primary" size="small" variant="outlined" outlined onClick={(e) => handleWebsite(e, address.website)}>Website</Button> : null }
        <Grid mt={1} item xs={12}>
        { address && address.rating ?
        <>
          <StarRating />
          <Typography variant="body2" color='text.secondary'>
            {`(${address.rating})`}
          </Typography>
        </>
          : '' }
        </Grid>
      </Grid>
    </Grid>
  );
}