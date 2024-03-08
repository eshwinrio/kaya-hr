import { isApolloError } from "@apollo/client";
import BrightnessFull from '@mui/icons-material/Brightness4';
import BrightnessHigh from '@mui/icons-material/Brightness7';
import ChecklistIcon from '@mui/icons-material/Checklist';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from "@mui/icons-material/Settings";
import WindowIcon from '@mui/icons-material/Window';
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo, useRef, useState } from "react";
import { Link, LoaderFunction, Outlet, redirect } from "react-router-dom";
import logo from './assets/logo-icon.svg';
import PopoverProfile from "./components/PopoverProfile";
import ToolbarSpacer from "./components/ToolbarSpacer";
import { apolloClient } from "./lib/apollo";
import { WHOAMI } from "./lib/gql-queries";
import { useMaterialTheme } from "./lib/material-theme";
import { useAppDispatch, useUiPreferences } from './lib/redux-hooks';
import { setMode } from './lib/redux-slice-ui-preferences';
import WhoamiProvider, { useWhoAmILoader } from "./lib/whoami-provider";

const drawerWidth = 240;

export default function DashboardLayout() {
  const materialTheme = useMaterialTheme();
  const isSmallerScreen = useMediaQuery(materialTheme.breakpoints.down('md'));
  const contentWidth = useMemo(() => (isSmallerScreen ? '100%' : `calc(100% - ${drawerWidth}px)`), [isSmallerScreen]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { mode } = useUiPreferences();
  const avatarRef = useRef<HTMLDivElement>(null);
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false);
  const [employeeDropdown, setEmployeeDropdown] = useState(false);
  const whoamiData = useWhoAmILoader();

  return (
    <WhoamiProvider value={whoamiData}>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{ width: contentWidth }}>
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
                sx={{ cursor: 'pointer', width: 32, height: 32 }}
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
          <Toolbar disableGutters>
            <Avatar
              variant="square"
              src={whoamiData.currentUser?.organization?.logoUrl || logo}
              alt={whoamiData.currentUser?.organization?.name || 'Management dashboard'}
              sx={{ width: 48, height: 48, cursor: 'pointer', mx: 1 }}
            />
            <Divider orientation="vertical" flexItem />
            <Box sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              overflow: 'hidden',
              p: 1
              }}>
              <Typography variant="body1" noWrap>{whoamiData.currentUser?.organization?.name || 'Kaya HR'}</Typography>
              <Typography variant="caption" noWrap>Panel v0.0.1</Typography>
            </Box>
          </Toolbar>
          <Divider />
          <List
            sx={{ width: '100%', flex: 1 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" sx={{ backgroundColor: 'inherit' }}>
                Team Management
              </ListSubheader>
            }>
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
              <ListItemText primary="Employees" secondary="Add, list employees" />
            </ListItemButton>
            <Collapse in={employeeDropdown} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/employees/add">
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add member" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/employees/list">
                  <ListItemIcon>
                    <ChecklistIcon />
                  </ListItemIcon>
                  <ListItemText primary="List members" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton component={Link} to="/scheduler">
              <ListItemIcon>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText primary="Scheduler" secondary="Plan schedules" />
            </ListItemButton>
          </List>
          <Box sx={{ p: 1 }}>
            <IconButton LinkComponent={Link} to="/settings" component={Link}>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Drawer>
        <Box component="main" sx={{ width: contentWidth, flexGrow: 1 }}>
          <ToolbarSpacer sx={{ marginBottom: 2 }} />
          <Outlet />
        </Box>
      </Box>
      <PopoverProfile open={isProfilePopoverOpen} anchorEl={avatarRef.current} onClose={() => setIsProfilePopoverOpen(false)} />
    </WhoamiProvider>
  );
}

export const dashboardLayoutLoader: LoaderFunction = async () => {
  try {
    const whoAmI = await apolloClient.query({ query: WHOAMI });
    return whoAmI.data;
  } catch (error: any) {
    if (isApolloError(error) && error.networkError?.name === 'ServerError') {
      return redirect('/login');
    }
    throw error;
  }
};
