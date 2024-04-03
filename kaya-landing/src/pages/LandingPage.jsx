import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { alpha } from '@mui/material/styles';
import React from 'react';
import banner from '../assets/banner.svg';
import GraphicText from '../components/GraphicText';
import { useMaterialTheme } from '../lib/material-theme';


export default function LandingPage() {
  const theme = useMaterialTheme();
  return (
    <>
      <Box sx={{
        height: '100vh',
        background: `linear-gradient(
          0deg,
          ${alpha(theme.palette.grey[100], 0.0)} 0%,
          ${alpha(theme.palette.grey[300], 0.6)} 50%,
          ${alpha(theme.palette.primary.main, 0.0)} 100%
        )`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Container>
          <Grid2 container spacing={2}>
            <Grid2 xs={12} md={6}>
              <Typography variant="h3" component="h1" gutterBottom>
                Unlock the Potential of Your Workforce with <GraphicText sx={{ fontWeight: 'bold' }}>KayaHR</GraphicText>.
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                Elevate Your HR Management to New Heights.
              </Typography>
            </Grid2>
            <Grid2 xs={12} md={6}>
              <img src={banner} alt="banner" width={600} style={{ maxWidth: '100%' }} />
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      <section>
        <Container>
          <Toolbar disableGutters sx={{ mb: 2 }}>
            <Typography variant='h4'>Our Partners</Typography>
          </Toolbar>
          <Grid2 container spacing={2}>
            <Grid2 item xs={6} sm={3}>
              <img src="https://southstreetburger.com/wp-content/uploads/2021/07/ssb-logo-white-1.png" alt="South Street Burger logo" width="100%" height="auto" loading="lazy" decoding="async" />
            </Grid2>
            <Grid2 item xs={6} sm={3}>
              <img src="https://choiceindianrestaurant.ca/wp-content/uploads/2022/09/IMG-20220914-WA0000-removebg-preview.png" alt="Choice Indian Restaurants logo" width="100%" height="auto" loading="lazy" decoding="async" />
            </Grid2>
            <Grid2 item xs={6} sm={3}>
              <img src="https://www.thegrandmehfil.com/wp-content/uploads/2021/02/Final-logo-01.png" alt="The Mehfil logo" width="100%" height="auto" loading="lazy" decoding="async" />
            </Grid2>
            <Grid2 item xs={6} sm={3}>
              <img src="https://mma.prnewswire.com/media/1688892/Clutch_Logo_Red__1.jpg?p=facebook" alt="Clutch logo" width="100%" height="auto" loading="lazy" decoding="async" />
            </Grid2>
          </Grid2>
        </Container>
      </section>
    </>
  );
}
