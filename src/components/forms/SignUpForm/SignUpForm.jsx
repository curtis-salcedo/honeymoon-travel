import React, { Component } from 'react';
import { signUp } from '../../../utilities/services/users-service';

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

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {name, email, password} = this.state;
      const formData = {name, email, password};
      // The promise returned by the signUp service
      // method will resolve to the user object included
      // in the payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // An error occurred
      // Probably due to a duplicate email
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <>
        {/* <form autoComplete="off" onSubmit={this.handleSubmit}> */}
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
          }}
          >
            <Box>
              <Typography>Logo goes here</Typography>
              <Typography>Sign up form</Typography>

            </Box>
            <Box
              sx={{
              height: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              width: '90%'
            }}>
              <TextField label="Email" type="email" name="email" value={this.state.email} onChange={this.handleChange} required />

              <TextField label="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange} required />

              <TextField label="Confirm Password" id="outlined-basic" variant="outlined" type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />

              <Button fullWidth type="submit" variant="contained" color="primary" disabled={disable} onClick={this.handleSubmit}>SIGN UP!</Button>
            </Box>
        </Paper>
        <div className="error-message">&nbsp;{this.state.error}</div>
      </>
    );
  }
}