import React from 'react';
import {AppBar, Button, Toolbar} from '@mui/material';
import logo from '../assets/logo-full.svg';

export default function Header() {
  return (
  <AppBar position="static" sx={{ bgcolor: "#8155E8", border:"none" }}>
        <Toolbar>
        <img src={logo} alt="logo" width={96} />
          <Button color="inherit" href="#home">Home</Button>
          <Button color="inherit" href="/AboutPage">About</Button>
          <Button color="inherit" href="#pricing">Pricing</Button>
          <Button color="inherit" href="#features">Features</Button>
          <Button color="inherit" href="#login">Login</Button>
        </Toolbar>
      </AppBar>
  )}