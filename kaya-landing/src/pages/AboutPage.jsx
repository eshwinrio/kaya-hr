import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { alpha } from '@mui/material/styles';
import GraphicText from '../components/GraphicText';
import { useMaterialTheme } from '../lib/material-theme';


export default function AboutPage() {
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
            About <GraphicText>Kaya</GraphicText>
          </Typography>
          <Typography variant="h4">Honestly... it came out of nowhere</Typography>
        </Container>
      </Box>

      <Container>
        <Box component='section' sx={{ my: 8 }}>
          <Toolbar disableGutters>
            <Typography variant="h4">Who are <b>we</b>?</Typography>
          </Toolbar>
          <Typography variant="body1" align='justify' letterSpacing={1.5} gutterBottom>
            KayaHR is a leading provider of innovative human resources management solutions designed to empower organizations of all sizes to streamline their HR processes and optimize their workforce management. With a mission to revolutionize the HR industry, KayaHR offers a comprehensive suite of tools and services tailored to meet the evolving needs of modern businesses.<br />
          </Typography>
        </Box>

        <Box component='section' sx={{ my: 8 }}>
          <Toolbar disableGutters>
            <Typography variant="h4">Our <b>Mission</b></Typography>
          </Toolbar>
          <Typography variant="body1" align='justify' sx={{ letterSpacing: '2px' }} gutterBottom>
            Through the application of groundbreaking HR management solutions, at "KayaHR" we transform into well managed organizations those who want to maximize the results of their human capital. Our mission is to deliver end to end tools and services that ease management of employee information including payroll input, time attendance check, performance appraisals, training & development, compensation and benefits administration, workforce compliance management, self service and analytics reporting. <br />
          </Typography>
        </Box>

        <Box component='section'>
          <Toolbar disableGutters>
            <Typography variant="h4">Testimonials</Typography>
          </Toolbar>
          <Grid2 container spacing={2}>
            {[
              {
                name: "Prit Patel",
                avatarUrl: "",
                testimony: "KayaHR transformed our HR processes with its intuitive design and powerful features, streamlining operations and enhancing team productivity. Highly recommended for any organization!"
              },
              {
                name: "Yash Rudani",
                avatarUrl: "",
                testimony: "Since implementing KayaHR, our HR workflows have become more efficient and error-free, leading to improved employee satisfaction. A game-changer for HR management!"
              }
            ].map((item) => (
              <Grid2 xs={12} md={6} lg={4}>
                <Card variant='outlined' sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent>
                    <Avatar sx={{ width: 64, height: 64, mb: 2 }} src={item.avatarUrl} alt={item.name} />
                    <Typography variant='h6' color='primary' fontWeight={600}>{item.name}</Typography>
                    <Typography variant='body2' color='primary' sx={{ mb: 2 }}>Managing Director</Typography>
                    <Typography paragraph>&quot;{item.testimony}&quot;</Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Container>
    </>
  )
};
