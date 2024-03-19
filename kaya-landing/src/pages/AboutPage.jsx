import React from 'react';
import { Typography, Skeleton, Container, Box } from '@mui/material';
import Header from '../components/Header';
import '../css/style.css';

export default function AboutPage() {
  return (
    <Container>
      <Box component='section' sx={{ my: 8 }}>
        <Typography className='abt-header' variant="h3" gutterBottom>Who are we?</Typography>
        <Typography variant="body1" align='justify' gutterBottom>
          KayaHR is a leading provider of innovative human resources management solutions designed to empower organizations of all sizes to streamline their HR processes and optimize their workforce management. With a mission to revolutionize the HR industry, KayaHR offers a comprehensive suite of tools and services tailored to meet the evolving needs of modern businesses.<br />
        </Typography>
      </Box>

      <Box component='section' sx={{ my: 8 }}>
        <Typography className='abt-header' variant="h3" gutterBottom> Our Mission</Typography>
        <Typography variant="body1" align='justify' gutterBottom>
          Through the application of groundbreaking HR management solutions, at "KayaHR" we transform into well managed organizations those who want to maximize the results of their human capital. Our mission is to deliver end to end tools and services that ease management of employee information including payroll input, time attendance check, performance appraisals, training & development, compensation and benefits administration, workforce compliance management, self service and analytics reporting. <br />
        </Typography>
      </Box>

      <Box component='section' sx={{ my: 8 }}>
        <Typography className='abt-header' variant="h3" gutterBottom>Customer Testimonials</Typography>
        <div id='testimonial'>
          <div className='testimonial-card'>
            <Skeleton variant="text" width={210} sx={{ fontSize: '1rem' }} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </div>
          <div className='testimonial-card'>
            <Skeleton variant="text" width={210} sx={{ fontSize: '1rem' }} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </div>
          <div className='testimonial-card'>
            <Skeleton variant="text" width={210} sx={{ fontSize: '1rem' }} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </div>
        </div>
      </Box>
    </Container>
  )
};
