import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import '../css/style.css';
export default function AboutPage() {
  return (
    <Container>
      <Box component='section' sx={{ my: 8 }}>
        <Typography className='abt-header' variant="h3" gutterBottom>Who are we?</Typography>
        <Typography variant="body1" className='abt-content' align='justify' sx={{letterSpacing:{
          xs: '1px',
          md: '1.5px'
        }}} gutterBottom>
          KayaHR is a leading provider of innovative human resources management solutions designed to empower organizations of all sizes to streamline their HR processes and optimize their workforce management. With a mission to revolutionize the HR industry, KayaHR offers a comprehensive suite of tools and services tailored to meet the evolving needs of modern businesses.<br />
        </Typography>
      </Box>

      <Box component='section' sx={{ my: 8 }}>
        <Typography className='abt-header' variant="h3" gutterBottom> Our Mission</Typography>
        <Typography variant="body1" className='abt-content' align='justify'  sx={{letterSpacing:'2px'}} gutterBottom>
          Through the application of groundbreaking HR management solutions, at "KayaHR" we transform into well managed organizations those who want to maximize the results of their human capital. Our mission is to deliver end to end tools and services that ease management of employee information including payroll input, time attendance check, performance appraisals, training & development, compensation and benefits administration, workforce compliance management, self service and analytics reporting. <br />
        </Typography>
      </Box>

      <Box component='section' sx={{ my: 8, height:'auto' }}>
        <Typography className='abt-header' variant="h3" gutterBottom>Testimonials</Typography>
        <Box id='testimonial' sx={{mb:'4'}}>
          <Box className='testimonial-card' sx={{width: {
                xs: '300px',
                md: '400px',
                lg: '400px'
              }, border: '1px solid #000', padding: '6px', borderStyle:"dotted"}}>
            <Typography variant='h5' sx={{mb:"20px", ml:'10px', mt:'10px' }}>Rio Pinto</Typography>
            <Typography variant='text'>
"KayaHR transformed our HR processes with its intuitive design and powerful features, streamlining operations and enhancing team productivity. Highly recommended for any organization!"</Typography>
          </Box>
          <Box className='testimonial-card' 
          sx={{width: {
                xs: '300px',
                md: '400px',
                lg: '400px'
              }, 
          border: '1px solid #000', padding: '6px',borderStyle:"dotted"}}>
            <Typography variant='h5' sx={{mb:"20px", ml:'10px', mt:'10px'  }}>Yash Rudani</Typography>
            <Typography variant='text'>
            "Since implementing KayaHR, our HR workflows have become more efficient and error-free, leading to improved employee satisfaction. A game-changer for HR management!"</Typography>          </Box>
        </Box>
      </Box>
    </Container>
  )
};
