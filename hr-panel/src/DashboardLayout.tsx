import useMediaQuery from "@mui/material/useMediaQuery";
import { Outlet } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import BrightnessFull from '@mui/icons-material/Brightness4';
import BrightnessHigh from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useMaterialTheme } from "./lib/material-theme";
import logo from './assets/logo-icon.svg';
import { useAppDispatch, useUiPreferences } from './lib/redux-hooks';
import { setMode } from './lib/redux-slice-ui-preferences';
import ToolbarSpacer from "./components/ToolbarSpacer";
import { LoaderFunction, redirect } from "react-router-dom";
import { verifyIdentity } from "./lib/fetch-requests";
import { Divider, Typography } from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;

export default function DashboardLayout() {
  const materialTheme = useMaterialTheme();
  const isSmallerScreen = useMediaQuery(materialTheme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { mode } = useUiPreferences();

  return (
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
          <IconButton onClick={() => dispatch(setMode(mode === 'light' ? 'dark' : 'light'))}>
            {mode === 'light' ? <BrightnessFull /> : <BrightnessHigh />}
          </IconButton>
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
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <ToolbarSpacer sx={{ marginBottom: 2 }} />
        <Outlet />
      </Box>
    </Box>
  );
}

export const dashboardLayoutLoader: LoaderFunction = async () => {
  try {
    const response = await verifyIdentity({ cache: "reload" });
    if (response.ok) {
      return null;
    } else {
      return redirect('/login');
    }
  } catch (e) {
    // return redirect('/login');
    return null;
  }
};
