import logo from './assets/logo-full.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Home() {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pt: 16 }}>
      <img src={logo} alt="logo" width={192} />
      <Typography variant='subtitle1' sx={{ mt: 2 }}>Waiting to be connected to Auth module @ {process.env['REACT_APP_AUTH_API_DOMAIN']}</Typography>
    </Box>
  );
}
