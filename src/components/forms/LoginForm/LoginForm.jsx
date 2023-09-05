import React, { useState } from 'react';
import * as usersService from '../../../utilities/services/users-service';
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
  FormGroup,
  Input,
  TextField,
} from '@mui/material';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <>
      <Paper
        elevation={3}
        container
        sx={{
          height: '75%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderRadius: '3vmin',
          width: '280px',
        }}>
        <Box>
          <Typography>Logo goes here</Typography>
          <Typography>Login form</Typography>
        </Box>
        <Box
          sx={{
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: '90%'
        }}>
          <TextField label="Email" type="text" name="email" value={credentials.email} onChange={handleChange} required />

          <TextField label="Password" type="password" name="password" value={credentials.password} onChange={handleChange} required />

          <Button fullWidth type="submit" variant="contained" color="primary" onClick={handleSubmit}>LOGIN!</Button>
          
        </Box>
        
      </Paper>
      <div className="error-message">&nbsp;{error}</div>
    </>
  );
}