import React from 'react';
import { 
  Button,
  Typography,
  Grid,
  Box,
} from '@mui/material';

export default function AddMenuButton({ text, icon, onClick }) {
  const buttonStyle = {
    width: '90%',
    display: 'flex',
    minHeight: '100px',
    flexDirection: 'row',
    marginBottom: '10px',
    alignSelf: 'center',
  }
  const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  }
  const textStyle = {
    width: '100%',
  }
  const iconStyle = {
    width: '100%',
  }

  return (
    <Button variant="outlined" style={ buttonStyle } onClick={onClick} >
      <Grid style={ layoutStyle }>
        <Typography style={ iconStyle }>
          {icon}
        </Typography>
        <Typography style={ textStyle }>
          {text}
        </Typography>
      </Grid>
    </Button>
  );
}
