import React from 'react';
import { Typography, Container } from '@mui/material';
import Header from '../components/Header';
import banner from '../assets/banner.svg';
import '../css/style.css';

export default function LandingPage() {
  return (
    <div id='landing-page'>
      <Header></Header>
      <Container component="main" maxWidth="xlg" sx={{ padding: 5}} id='home'>
      <img src={banner} alt="banner" width={450} id='banner-img'/>
        <div id='banner-content'>
        <Typography variant="h3" component="h1" gutterBottom>
        Unlock the Potential of Your Workforce with KayaHR
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
        Elevate Your HR Management to New Heights.
        </Typography>
        </div>
      </Container>
    </div>
  );
}
