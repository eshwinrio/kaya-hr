import logo from './assets/logo-full.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import BrightnessFull from '@mui/icons-material/Brightness4';
import BrightnessHigh from '@mui/icons-material/Brightness7';
import { useAppDispatch, useUiPreferences } from './lib/redux-hooks';
import { setMode } from './lib/redux-slice-ui-preferences';

export default function Home() {

  const dispatch = useAppDispatch();
  const { mode } = useUiPreferences();
  
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <IconButton onClick={() => dispatch(setMode(mode === 'light' ? 'dark' : 'light'))}>
          {mode === 'light' ? <BrightnessFull /> : <BrightnessHigh />}
        </IconButton>
      </Toolbar>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} alt="logo" width={192} />
        <Typography variant='subtitle1' sx={{ mt: 2 }}>Waiting to be connected to Auth module @ {process.env['REACT_APP_AUTH_API_DOMAIN']}</Typography>
      </Box>
    </Box>
  );
}
