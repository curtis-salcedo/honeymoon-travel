import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Serivce Imports
import { convertDate } from '../../utilities/services/business-service';

import * as AddressesAPI from '../../utilities/api/addresses-api';

// Component Imports
import AccommodationForm from '../forms/AccommodationForm/AccommodationForm';
import Detail from '../Detail/Detail';

// Style Imports
import './Accommodation.css';
import '../DayDetail/DayDetail.css'
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  Card,
  CardActions,
  CardContent,
  Grid,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Accommodation({ id, day, viewAll }) {
  const { activeAccommodations } = useContext(DataContext)
  const [accommodations, setAccommodations] = useState([])
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    setAccommodations(activeAccommodations);
  }, [activeAccommodations, viewAll])

  // Show the accommodation form
  const handleShow = (e) => {
    setShow(!show)
  }

  // Handle any actions when the user clicks on the icon
  const handleClick = (e, id) => {

  }

  const handleEdit = (e, id) => {
    const selected = accommodations.find((a) => a._id === id)
    setSelectedData(selected)
    setShowEdit(!showEdit)
  }

  const getMapLocation = (e, address) => {
    console.log('getMapLocation', address)
    AddressesAPI.getAddress(address)
  }

  return (
      <div className='DayDetailAccordion'>
        <div className='DayDetailButton'>
          <Button variant="contained" onClick={handleShow}>Add Accommodation</Button>
          { show ? <AccommodationForm id={id} day={day} setShow={setShow} /> : null }
        </div>
        
        { viewAll === true ? (
            <div>
            {accommodations.map((accommodation) => (
              
              <Card elevation={3} className='DetailDayCard' key={accommodation._id}>
                  
              <CardContent className='DetailDayCardExpanded'>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>{accommodation.type}</Typography>
                    {accommodation.name && <Typography variant="body1">{accommodation.name}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body1">{accommodation.location}</Typography>
                    <Typography variant="body2">Check-in: { accommodation.checkInTime ? accommodation.checkInTime : 'None' }</Typography>
                    <Typography variant="body2">Check-out: { accommodation.checkOutTime ? accommodation.checkOutTime : 'None' } </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2">Space for more data</Typography>
                  </Grid>
                </Grid>
              </CardContent>
                <CardActions>
                  {/* <Button onClick={(e) => handleEdit(e, accommodation._id)}>Edit</Button> */}
                  <Button >Remove</Button>
                  <Button
                    onClick={(e) => getMapLocation(e, accommodation.address)}
                  >Map</Button>
                  {/* <Tooltip title="Options">
                    <IconButton onClick={() => handleClick(accommodation._id)}>
                    <MoreHorizIcon />
                    </IconButton>
                  </Tooltip> */}
                </CardActions>
                  { showEdit ? <AccommodationForm selectedData={selectedData} id={id} day={day} setShowEdit={setShowEdit} /> : null }

            </Card>
            ))}
            
          </div>



        ) : (
          accommodations.map((accommodation) => {
            const isCheckInDay = convertDate(accommodation.checkInDate) === day;
            const isCheckOutDay = convertDate(accommodation.checkOutDate) === day;
  
            if (isCheckInDay || isCheckOutDay) {
              return (
                <Card elevation={3} className='DetailDayCard' key={accommodation._id}>
                  
                  <CardContent className='DetailDayCardExpanded'>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>{accommodation.type}</Typography>
                        {accommodation.name && <Typography variant="body1">{accommodation.name}</Typography>}
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body1">{accommodation.location}</Typography>
                        {isCheckInDay && <Typography variant="body2">Check-in</Typography>}
                        {isCheckOutDay && <Typography variant="body2">Check-out</Typography>}
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2">{accommodation.checkInTime}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <CardActions>
                    <Button onClick={(e) => handleEdit(e, accommodation._id)} size="small">Edit</Button>
                    {/* <Tooltip title="Options">
                      <IconButton onClick={() => handleClick(accommodation._id)}>
                        <MoreHorizIcon />
                      </IconButton>
                    </Tooltip> */}
                  </CardActions>
                  
                </Card>
              );
            }
            return null;
          })
        )}
      </div>
  );
}