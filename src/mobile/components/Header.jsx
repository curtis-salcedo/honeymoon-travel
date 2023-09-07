import React, { useState, useEffect, useContext } from 'react';

// Style imports
import {
  Button,
  Typography,
  Card,
  CardActions,
  Grid,
  Container,
  Box,
  Paper,
} from '@mui/material';

export default function Header({ activeTrip }) {
  const [year, setYear] = useState('')

  useEffect(() => {
    // if (activeTrip) {
    //   setYear(activeTrip.startDate.slice(0, 4))
    // }
  }, []);

  return (
    <Container
      sx={{
        margin:0,
        padding:0,
        marginTop: 2,
      }}
    >
      <Paper sx={{
        m: 1,
        backgroundColor: 'var(--white)',
        minHeight: '10vh',
        width: '90vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        margin:0,
        padding:0,
        }} 
        elevation={1}
      >
        <Grid>
          <Typography variant="h5">
          { activeTrip &&
            activeTrip.name
          }
          </Typography>
        </Grid>
      </Paper>
    </Container>
  );
}