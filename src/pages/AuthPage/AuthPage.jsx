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
    <Container sx={{height: '100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center', width:'100vw'}}>
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} setShowSignUp={setShowSignUp} />
        }
        <Button style={{color:'var(--secondary)'}} onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Already have an account? Login here' : "Don't have an account? Sign up here"}</Button>
    </Container>
  );
}