import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../utilities/DataContext';

// Service Imports
import { getTrips } from '../../utilities/services/trips-service';
import { convertDateToDetail } from '../../utilities/services/business-service';
import { getTripById } from '../../utilities/api/trips-api';

// Component imports
import TripDetails from '../../components/TripDetails/TripDetails';

// Form Imports
import TripForm from '../../components/forms/TripForm/TripForm';


// Style imports
import './Landing.css';
import {
  Typography,
  Container,
  Button,
  Box,
  Modal,
  ChildModal

} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Landing({ user }) {
  const { activeTrip, setActiveTrip } = useContext(DataContext)
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false)
  const [userTrips, setUserTrips] = useState([])

  useEffect(() => {
    async function fetchTrips() {
      try {
        const fetchedTrips = await getTrips();
        setUserTrips(fetchedTrips);
      } catch (error) {
        console.error('No Trips created or there was an error fetching trips:', error);
      }
    }
    fetchTrips();
  }, []);

  const handleShow = () => {
    setShow(!show)
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e, id) => {
    try {
      // Wait for the promise to resolve
      const fetchedActiveTrip = await getTripById(id);
      // Set the actual trip object to state
      setActiveTrip(fetchedActiveTrip);
    } catch (error) {
      console.error('Error fetching active trip details:', error);
    }
    setOpen(false);
  }


  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '75vh',
  width: '90vw',
  bgcolor: 'background.paper',
  border: 'var(--dark) solid 2px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: '2vmin',
  padding: '12px',
};

function ChildModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Button onClick={handleOpen}>Add a new trip!</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          {/* <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p> */}
          <TripForm user={user} handleClose={handleClose} />
        </Box>
      </Modal>
    </Container>
  );
}

  return (
    <Container>
      <Typography>
        {user.email}'s Trips
      </Typography>

      <Container>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style }}>
            <h2 id="parent-modal-title">Select a trip to view</h2>

              {userTrips && userTrips.length > 0 ? (
                    userTrips.map((trip) => (
                      <div key={trip._id}>
                        <Button
                          id='side-bar-button'
                          variant="outlined"
                          size="medium"
                          onClick={(e) => handleSubmit(e, trip._id)}
                          fullWidth
                          sx={{
                            height: '8vh',
                          }}
                        >
                          <Typography>
                            {trip.name}

                          <br />

                            {convertDateToDetail(trip.startDate)
                            + ' - ' +
                            convertDateToDetail(trip.endDate)}
                          </Typography>
                        </Button>
                      </div>
                    ))
                  ) : null}
            <p id="parent-modal-description">
              Don't see your trip?
            </p>
            <ChildModal />
          </Box>
        </Modal>
      </Container>
    </Container>
  );
}