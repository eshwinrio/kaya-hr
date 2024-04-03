import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import { Avatar, Box, Card, CardContent, Container, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function ContactUsPage() {
  return (
    <Container>
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h2" style={{ textTransform: "uppercase", marginBottom: "10px" }}>
          Contact <span style={{ color: "#6e11e4" }}>Kaya</span>
        </Typography>
        <Typography variant="h4">We are here to help</Typography>
      </Box>

      <Grid2 container spacing={4}>
        <Grid2 xs={12} md={6}>
          <Card variant='outlined'>
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "#6e11e4", mb: 2, width: 64, height: 64 }}>
                  <CallIcon />
                </Avatar>
                <Typography variant="h4" style={{ textTransform: "uppercase" }} fontWeight={600}>Call Us</Typography>
                <Typography variant='body1' fontWeight={400} textAlign='justify'>
                  For inquiries or assistance, We'll be happy to provide you with information and support tailored to your needs.
                </Typography>
                <Link component={RouterLink} to='tel:+12309878765'>+1 (230) 987-8765</Link>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Card variant='outlined'>
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "#6e11e4", mb: 2, width: 64, height: 64 }}>
                  <EmailIcon />
                </Avatar>
                <Typography variant="h4" style={{ textTransform: "uppercase" }} fontWeight={600}>Ask a Question</Typography>
                <Typography variant='body1' fontWeight={400} textAlign='justify'>
                  For inquiries or assistance, We'll be happy to provide you with information and support tailored to your needs.
                </Typography>
                <Link component={RouterLink} to='mailto:kaya@example.com'>kaya@example.com</Link>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};
