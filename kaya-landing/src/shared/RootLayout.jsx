import MenuIcon from '@mui/icons-material/Menu';
import TerminalIcon from '@mui/icons-material/Terminal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { ThemeProvider } from '@mui/material/styles';
import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useState } from 'react';
import { Outlet } from "react-router";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-full.svg';
import AppBar from '../components/AppBar';
import { useMaterialTheme } from "../lib/material-theme";

export default function Layout() {
  const materialTheme = useMaterialTheme();
  const navigate = useNavigate();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const open = Boolean(menuAnchorEl);

  const handleClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const redirectAndClose = (path) => {
    navigate(path);
    setMenuAnchorEl(null);
  };

  return (
    <ThemeProvider theme={materialTheme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img src={logo} alt="logo" width={84} />
          <Stack direction='row' display={{ xs: 'none', md: 'flex' }}>
            <Button color="inherit" href="/">Home</Button>
            <Button color="inherit" href="/about">About</Button>
            <Button color="inherit" href="/pricing">Pricing</Button>
            <Button color="inherit" href="/features">Features</Button>
            <Button color="inherit" href="/contact-us">Contact Us</Button>
          </Stack>
          <Stack direction='row'>
            <Button
              startIcon={<TerminalIcon />}
              id="button-navigate-portals"
              aria-controls={open ? 'menu-navigate-portals' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Console
            </Button>
            <IconButton
              id="button-navigate-pages"
              aria-controls={open ? 'menu-navigate-pages' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              color='inherit'
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
      <Menu
        id="menu-navigate-portals"
        anchorEl={menuAnchorEl}
        open={menuAnchorEl && menuAnchorEl.id === 'button-navigate-portals'}
        onClose={setMenuAnchorEl.bind(null, null)}
        MenuListProps={{
          'aria-labelledby': 'button-navigate-portals',
        }}
      >
        {process.env.REACT_APP_PORTAL_HR_DOMAIN && <MenuItem
          onClick={redirectAndClose.bind(null, null)}
          component='a' href={process.env.REACT_APP_PORTAL_HR_DOMAIN} target='_blank'>
          HR Panel
        </MenuItem>}
        {process.env.REACT_APP_PORTAL_EMPLOYEE_DOMAIN && <MenuItem
          onClick={redirectAndClose.bind(null, null)}
          component='a' href={process.env.REACT_APP_PORTAL_EMPLOYEE_DOMAIN} target='_blank'>
          Employee Client
        </MenuItem>}
        {process.env.REACT_APP_PORTAL_ADMIN_DOMAIN && <MenuItem
          onClick={redirectAndClose.bind(null, null)}
          component='a' href={process.env.REACT_APP_PORTAL_ADMIN_DOMAIN} target='_blank'>
          Admin Panel
        </MenuItem>}
      </Menu>
      <Menu
        id="menu-navigate-pages"
        anchorEl={menuAnchorEl}
        open={menuAnchorEl && menuAnchorEl.id === 'button-navigate-pages'}
        onClose={setMenuAnchorEl.bind(null, null)}
        MenuListProps={{
          'aria-labelledby': 'button-navigate-pages',
        }}>
        <MenuItem onClick={redirectAndClose.bind(null, '/')}>Home</MenuItem>
        <MenuItem onClick={redirectAndClose.bind(null, '/about')}>About</MenuItem>
        <MenuItem onClick={redirectAndClose.bind(null, '/pricing')}>Pricing</MenuItem>
        <MenuItem onClick={redirectAndClose.bind(null, '/features')}>Features</MenuItem>
        <MenuItem onClick={redirectAndClose.bind(null, '/contact-us')}>Contact us</MenuItem>
      </Menu>
      <Box component='footer' sx={{ mt: 8 }}>
        <Container maxWidth>
          <Divider sx={{ my: 4 }} />
          <Grid2 container justifyContent='space-between' spacing={2}>
            <Grid2>
              <img src={logo} alt="logo" width={84} />
            </Grid2>
            <Grid2 xs={12} md={4}>
              <List subheader={<ListSubheader>Pages</ListSubheader>}>
                <ListItemButton onClick={redirectAndClose.bind(null, '/')}>Home</ListItemButton>
                <ListItemButton onClick={redirectAndClose.bind(null, '/about')}>About</ListItemButton>
                <ListItemButton onClick={redirectAndClose.bind(null, '/pricing')}>Pricing</ListItemButton>
                <ListItemButton onClick={redirectAndClose.bind(null, '/features')}>Features</ListItemButton>
                <ListItemButton onClick={redirectAndClose.bind(null, '/contact-us')}>Contact us</ListItemButton>
              </List>
            </Grid2>
            <Grid2 xs={12} md={4}>
              <List subheader={<ListSubheader>Console</ListSubheader>}>
                <ListItemButton
                  onClick={redirectAndClose.bind(null, null)}
                  component='a' href={process.env.REACT_APP_PORTAL_HR_DOMAIN} target='_blank'>
                  HR Panel
                </ListItemButton>
                <ListItemButton
                  onClick={redirectAndClose.bind(null, null)}
                  component='a' href={process.env.REACT_APP_PORTAL_HR_DOMAIN} target='_blank'>
                  Admin Panel
                </ListItemButton>
                <ListItemButton
                  onClick={redirectAndClose.bind(null, null)}
                  component='a' href={process.env.REACT_APP_PORTAL_HR_DOMAIN} target='_blank'>
                  Employee Client
                </ListItemButton>
              </List>
              <PayPalButtons style={{ layout: 'horizontal' }} />
            </Grid2>
          </Grid2>
          <Divider sx={{ my: 4 }} />
          <Typography variant='body2'>© 2022 Kaya. All rights reserved.</Typography>
          <Box id='paypal-button-container' sx={{ display: { xs: 'none', md: 'block' } }}></Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
