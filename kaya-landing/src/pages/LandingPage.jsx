import React from 'react';
import { Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import banner from '../assets/banner.svg';
import '../css/style.css';

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};
export default function LandingPage() {
  return (
    
    <div id='landing-page'>

      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xlg" sx={{ height: {
        xlg:`calc(100vh - 64px)`,
        md: `calc(90vh - 64px)`,
        sm: `calc(80vh - 64px)` }}}>
        <div id='banner-content'>
          <Typography variant="h3" component="h1" gutterBottom>
            Unlock the Potential of Your Workforce with <span className='khr'>KayaHR</span>.
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Elevate Your HR Management to New Heights.
          </Typography>
        </div>
        <img src={banner} alt="banner" id='banner-img' />
      </Container>
      <Typography variant='h3' align='center' className='landing-header' mb={1} mt={20}>Collaborations</Typography>
      <div class="flex-container">
        <div class="grid-item">
          <img src="https://southstreetburger.com/wp-content/uploads/2021/07/ssb-logo-white-1.png" alt="south street burger" />
        </div>
        <div class="grid-item">
          <img src="https://choiceindianrestaurant.ca/wp-content/uploads/2022/09/IMG-20220914-WA0000-removebg-preview.png" alt="Choice indian restaurants" />
        </div>
        <div class="grid-item">
          <img src="https://www.thegrandmehfil.com/wp-content/uploads/2021/02/Final-logo-01.png" alt="The Mehfil" />
        </div>
        <div class="grid-item">
          <img src="https://mma.prnewswire.com/media/1688892/Clutch_Logo_Red__1.jpg?p=facebook" alt="Clutch" />
        </div>
    </div>
        </ThemeProvider>
        </div>
  );
}
