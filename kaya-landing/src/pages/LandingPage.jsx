import React from 'react';
import { Typography, Container } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/style.css';

export default function LandingPage() {
  return (
    <div>
      <Header></Header>
      <Container component="main" maxWidth="md" id='landing-container' height='100vh'>
        <Typography variant="h3" component="h1" sx={{ mt: 45}} gutterBottom>
        Unlock the Potential of Your Workforce with KayaHR
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
        Elevate Your HR Management to New Heights.
        </Typography>
        
      </Container>
      <Footer></Footer>
    </div>
  );
}
