import React from 'react';
import { Button, Typography } from '@mui/material';

export default function AddButton({ text, primaryColor, secondaryColor, onClick }) {
  const buttonStyle = {
    backgroundColor: primaryColor,
    color: secondaryColor,
    border: 'none',
    width: '150px',
    minHeight: '40px',
    marginBottom: '10px',
    textAlign: 'center',
    alignSelf: 'center'
  }
  
  const textStyle = {
    width: '100%',
  }

  return (
    <Button style={ buttonStyle } onClick={onClick} >
      <Typography style={ textStyle }>
        {text}
      </Typography>
    </Button>
  );
}
