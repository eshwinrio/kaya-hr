import React from 'react';
import logo from './assets/logo-full.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <img src={logo} alt="logo" width={192} />
      <Typography variant='subtitle1' sx={{ mt: 2 }}>Waiting to be connected to Auth module @ {process.env['REACT_APP_AUTH_API_DOMAIN']}</Typography>
    </Box>
  );
}

export default App;
