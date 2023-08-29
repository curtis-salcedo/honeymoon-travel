import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Service imports
import { getTrips } from '../../utilities/services/trips-service';
import { convertDateToDetail, convertDateToLongDetail } from '../../utilities/services/business-service';


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


export default function Accommodation({ id, meals, accommodations }) {
  const { activeData } = useContext(DataContext)
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    
  }
  , []);

  console.log(meals)

  return (
    <Container sx={{ padding: 0, margin: 0 }}>
      <Box sx={{ height: '400px', width: 'auto', padding:0, margin:0 }}>
        <Grid sx={{ 
          display: 'flex',
          gridAutoFlow: "column",
          gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
          gridAutoColumns: "minmax(160px, 2fr)",
          height: '400px',
          overflowX: 'scroll',
          margin: 0,
          padding: 0,
        }}>
        { accommodations
          ? accommodations.map((a) => 
          <>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <Paper sx={{
              m: 1,
              backgroundColor: 'var(--white)',
              height: '380px',
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              }} 
              elevation={3}
              >

              <Box
                sx={{
                  position: 'relative',
                  margin: 0,
                  padding: 0,
                }}
              >
                <Button
                  sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    backgroundColor: 'var(--blue)',
                    color: 'var(--white)',
                  }}
                >
                  Map
                </Button>
                <CardMedia
                  component="img"
                  image={a.address.images[0]}
                  alt="location image"
                  sx={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '180px',
                  }}
                />
              </Box>

              <CardHeader
                title={a.address.name}
                subheader={a.type}
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
                {`${convertDateToDetail(a.checkInDate)} - ${convertDateToDetail(a.checkOutDate)}`}
                </Typography>

                <Grid>
                  <Button variant='body2' color='text.secondary'>
                    <a href={a.address.website}>Website</a>
                  </Button>
                  <Button
                  // onClick={(e) => getMapLocation(e, m.address._id)}
                  >Map</Button>
                </Grid>
              </Box>
            </Paper>
          </Grow>
          </>     
          ) : null }   
        </Grid>
      </Box>
    </Container>
  )
}