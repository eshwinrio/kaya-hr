import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from "react-router";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-full.svg';
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
      <AppBar position="static" elevation={0} color="transparent">
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
    </ThemeProvider>
  );
}
