import React, { useState } from 'react';
import SignUpForm from '../../components/forms/SignUpForm/SignUpForm';
import LoginForm from '../../components/forms/LoginForm/LoginForm';

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

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <Container sx={{backgroundColor:'gray', height: '100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
        }
        <Button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Already have an account?' : 'Sign Up'}</Button>
    </Container>
  );
}