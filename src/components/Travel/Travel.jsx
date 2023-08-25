import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Service Imports
import { convertDate } from '../../utilities/services/business-service';
import { convertDateToLongDetail } from '../../utilities/services/business-service';

// Component Imports
import TravelForm from '../forms/TravelForm/TravelForm';
import AddButton from '../buttons/AddButton';

// Style Imports
import './Travel.css';
import {
  Button,
  Typography,
  Card,
  CardActions,
  Grid,
  Container,
  CardMedia,
  ButtonBase,

} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';


export default function Travel({ id, day, viewAll }) {
  const { activeTravels } = useContext(DataContext)
  const [show, setShow] = useState(false)
  const [travels, setTravels] = useState([])
  
  useEffect(() => {
    setTravels(activeTravels)
  }, [activeTravels]);

  // Show the travel form
  const handleShow = (e) => {
    setShow(!show)
  }

  console.log(activeTravels)

  return (
    <Container sx={{ padding: 0, margin: 0 }}>
      <div className='add-button'>
        <AddButton
            text='Add Travel'
            primaryColor={`${'var(--dark)'}`}
            secondaryColor={`${'var(--white)'}`}
            onClick={handleShow}
        />
      </div>
      { show ? <TravelForm id={id} day={day} setShow={setShow} /> : null }
    {travels ? 
      travels.map((t) => (
      <Card id='hotel-card' elevation={0} key={t._id} sx={{padding:1}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container
            direction="column"
            spacing={2}
            sx={{
              backgroundColor:'var(--light)',
              border:'none',
              borderRadius:'1vmin',
              margin:'0',
              height: '250px',
              width: '400px'
            }}
            >
            <Grid item xs>
              <Typography gutterBottom variant="text" component="div">
                {t.type} - {t.identifier}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Departure:
                {convertDateToLongDetail(t.departure)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Arrival:
                {convertDateToLongDetail(t.arrival)}
              </Typography>
              <Typography variant="body3" color="text.secondary">
                Additional details could go here?
              </Typography>
            </Grid>
            <Grid item>
              <CardActions>
                <Button>Remove</Button>
                <Button
                  // onClick={(e) => getMapLocation(e, m.address)}
                >Map</Button>
              </CardActions>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
            <ButtonBase sx={{ width: 200, height: 'auto' }}>
            {/* { t.address.images ?
              <CardMedia
                className='hotel-card-media'
                component="img"
                src={m.address.images[0]}
                sx={{
                  width: '200px',
                  height: '150px',
                  borderRadius: '1vmin',
                }}
                alt="Image"
                  />
            :  */}
            <AddIcon 
                // className='hotel-card-media' 
                sx={{
                  backgroundColor: 'var(--light)', // Background color
                  borderRadius: '1vmin', // Border radius
                  color: 'var(--your-icon-color)', // Icon color
                  height: '50%',
                  width: '50%',
                }}
              /> 
            {/* } */}
            </ButtonBase>
            <Grid item xs>
              {/* <Typography varient="body1" color="text.secondary"
                sx={{
                  width: '200px',
                  height: '100px',
                }}>
                { m.address.name ? 
                  <>
                    {m.address.name}, {m.address.city}, {m.address.state}
                    <br />
                    {m.address.country}, {m.address.zipCode}
                  </>
                : 'No address recorded' }
              </Typography> */}
            </Grid>
        </Grid>
      </Grid>
    </Card>
    ))
    :null }
    </Container>
  );
}