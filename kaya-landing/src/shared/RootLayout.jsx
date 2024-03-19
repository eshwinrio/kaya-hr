import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from "react-router";
import { useMaterialTheme } from "../lib/material-theme";
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-full.svg';

export default function Layout() {
  const materialTheme = useMaterialTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const redirectAndClose = (path) => {
    navigate(path);
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={materialTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <img src={logo} alt="logo" width={96} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" href="/">Home</Button>
            <Button color="inherit" href="/about">About</Button>
            <Button color="inherit" href="/pricing">Pricing</Button>
            <Button color="inherit" href="/features">Features</Button>
            <Button color="inherit" href="/contact-us">Contact Us</Button>
          </Box>
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color='inherit'
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={setAnchorEl.bind(null, null)}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={redirectAndClose.bind(null, '/about')}>About</MenuItem>
            <MenuItem onClick={redirectAndClose.bind(null, '/pricing')}>Pricing</MenuItem>
            <MenuItem onClick={redirectAndClose.bind(null, '/features')}>Features</MenuItem>
            <MenuItem onClick={redirectAndClose.bind(null, '/contact-us')}>Contact us</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Outlet />
    </ThemeProvider>
  );
}
