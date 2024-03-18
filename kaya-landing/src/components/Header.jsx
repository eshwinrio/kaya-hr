import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
  <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        KayaHR
          </Typography>
          <Button color="inherit" href="#home">Home</Button>
          <Button color="inherit" href="../pages/AboutPage.jsx">About</Button>
          <Button color="inherit" href="#pricing">Pricing</Button>
          <Button color="inherit" href="#features">Features</Button>
          <Button color="inherit" href="#login">Login</Button>
        </Toolbar>
      </AppBar>
  )}