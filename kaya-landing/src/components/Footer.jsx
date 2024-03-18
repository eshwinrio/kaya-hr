import React from 'react';
import { Grid, Typography, Container } from '@mui/material';
import '../css/style.css' 
export default function Footer() {
  return (
    <Container id='footer-container'>
      <Grid Container>
        <Grid item>
          <Typography variant='h4' sx={{margin:"15px"}}>Links</Typography>
          <Typography variant='h6' sx={{margin:"15px"}}><a href='#home'>Home</a></Typography>
          <Typography variant='h6' sx={{margin:"15px"}}><a href='../pages/AboutPage.jsx'>About</a></Typography>
          <Typography variant='h6' sx={{margin:"15px"}}><a href='...'>Pricing</a></Typography>
          <Typography variant='h6' sx={{margin:"15px"}}><a href='...'>Features</a></Typography>
          <Typography variant='h6' sx={{margin:"15px"}}><a href='...'>Login</a></Typography>
        </Grid>
      </Grid>
    </Container>
  )}