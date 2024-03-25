import React from 'react';
import { Typography, Container } from '@mui/material';
import banner from '../assets/banner.svg';
import '../css/style.css';


export default function LandingPage() {
  return (
    <div id='landing-page'>
      <Container component="main" maxWidth="xlg" sx={{ height: `calc(100vh - 64px)`, padding: 5 }}>
        <div id='banner-content'>
          <Typography variant="h3" component="h1" gutterBottom>
            Unlock the Potential of Your Workforce with <span className='khr'>KayaHR</span>.
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Elevate Your HR Management to New Heights.
          </Typography>
        </div>
        <img src={banner} alt="banner" width={450} id='banner-img' />
      </Container>
      <Typography variant='h3' align='center' className='landing-header' mb={1} mt={20}>Collaborations</Typography>
      <div class="flex-container">
        <div class="grid-item">
          <img src="https://southstreetburger.com/wp-content/uploads/2021/07/ssb-logo-white-1.png" alt="" srcset="" />
        </div>
        <div class="grid-item">
          <img src="https://choiceindianrestaurant.ca/wp-content/uploads/2022/09/IMG-20220914-WA0000-removebg-preview.png" alt="" srcset="" />
        </div>
        <div class="grid-item">
          <img src="https://www.thegrandmehfil.com/wp-content/uploads/2021/02/Final-logo-01.png" alt="" srcset="" />
        </div>
        <div class="grid-item">
          <img src="https://mma.prnewswire.com/media/1688892/Clutch_Logo_Red__1.jpg?p=facebook" alt="" srcset="" />
        </div>

      </div><hr></hr>
      <Typography align='center'>&copy; Made with love 	&hearts;</Typography>
    </div>
  );
}
