import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { alpha } from '@mui/material/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import GraphicText from '../components/GraphicText';
import { useMaterialTheme } from '../lib/material-theme';

export default function ContactUsPage() {
  const theme = useMaterialTheme();
  return (
    <>
      <Box sx={{
        textAlign: "center",
        py: 16,
        background: `linear-gradient(
          0deg,
          ${alpha(theme.palette.primary.main, 0.0)} 0%,
          ${alpha(theme.palette.grey[300], 0.6)} 50%,
          ${alpha(theme.palette.primary.main, 0.0)} 100%
        )`,
      }}>
        <Container>
          <Typography variant="h2" fontWeight={700} style={{ marginBottom: "10px" }}>
            Contact <GraphicText>Kaya</GraphicText>
          </Typography>
          <Typography variant="h4">We are here to help</Typography>
        </Container>
      </Box>

      <Container>
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
    </>
  );
};
