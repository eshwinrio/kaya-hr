import { useRef, useState } from "react";
import { Link, LoaderFunction, Outlet, redirect } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import BrightnessFull from '@mui/icons-material/Brightness4';
import BrightnessHigh from '@mui/icons-material/Brightness7';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuIcon from '@mui/icons-material/Menu';
import WindowIcon from '@mui/icons-material/Window';
import { useMaterialTheme } from "./lib/material-theme";
import logo from './assets/logo-icon.svg';
import { useAppDispatch, useUiPreferences } from './lib/redux-hooks';
import { setMode } from './lib/redux-slice-ui-preferences';
import ToolbarSpacer from "./components/ToolbarSpacer";
import { verifyIdentity } from "./lib/fetch-requests";
import PopoverProfile from "./components/PopoverProfile";

const drawerWidth = 240;

export default function DashboardLayout() {
  const materialTheme = useMaterialTheme();
  const isSmallerScreen = useMediaQuery(materialTheme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { mode } = useUiPreferences();
  const avatarRef = useRef<HTMLButtonElement>(null);
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false);
  const [employeeDropdown, setEmployeeDropdown] = useState(false);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{ width: isSmallerScreen ? '100%' : `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setIsDrawerOpen(state => !state)}
                edge="start" sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => dispatch(setMode(mode === 'light' ? 'dark' : 'light'))}>
                {mode === 'light' ? <BrightnessFull /> : <BrightnessHigh />}
              </IconButton>
              <Avatar
                ref={avatarRef}
                component={IconButton}
                size="small"
                onClick={() => setIsProfilePopoverOpen(state => !state)}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          variant={isSmallerScreen ? 'temporary' : 'permanent'}
          anchor="left"
        >
          <Toolbar sx={{ gap: 2 }}>
            <img src={logo} alt="logo" height={48} />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
              <Typography variant="body1" noWrap>Kaya HR</Typography>
              <Typography variant="caption" noWrap>Panel v0.0.1</Typography>
            </Box>
          </Toolbar>
          <Divider />
          <List
            sx={{ width: '100%' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" sx={{ backgroundColor: 'inherit' }}>
                Team Management
              </ListSubheader>
            }
          >
            <ListItemButton component={Link} to="/" replace>
              <ListItemIcon>
                <WindowIcon />
              </ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItemButton>
            <ListItemButton onClick={() => setEmployeeDropdown(current => !current)}>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItemButton>
            <Collapse in={employeeDropdown} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/employees/add">
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add member" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <ToolbarSpacer sx={{ marginBottom: 2 }} />
          <Outlet />
        </Box>
      </Box>
      <PopoverProfile open={isProfilePopoverOpen} anchorEl={avatarRef.current} onClose={() => setIsProfilePopoverOpen(false)} />
    </>
  );
}

export const dashboardLayoutLoader: LoaderFunction = async () => {
  const response = await verifyIdentity({ cache: "reload" });
  if (response.ok) {
    const userData = await response.json();
    if (!userData) {
      throw new Error('No user data');
    }
    return userData;
  } else {
    return redirect('/login');
  }
};
