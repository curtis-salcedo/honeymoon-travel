import React from 'react';
import { Button, Typography } from '@mui/material';

export default function DayButton({ text, primaryColor, secondaryColor, onClick }) {
  const buttonStyle = {
    backgroundColor: primaryColor,
    color: secondaryColor,
    border: 'none',
    width: '100%',
    minHeight: '40px',
    marginBottom: '10px',
  }
  
  const textStyle = {
    width: '100%',
    textAlign: 'left',
    paddingLeft: '10px',
  }

  return (
    <Button style={ buttonStyle } onClick={onClick} >
      <Typography style={ textStyle }>
        {text}
      </Typography>
    </Button>
  );
}
