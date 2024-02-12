import useMediaQuery from "@mui/material/useMediaQuery";
import { Outlet } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import BrightnessFull from '@mui/icons-material/Brightness4';
import BrightnessHigh from '@mui/icons-material/Brightness7';
import { useMaterialTheme } from "./lib/material-theme";
import logo from './assets/logo-icon.svg';
import { useAppDispatch, useUiPreferences } from './lib/redux-hooks';
import { setMode } from './lib/redux-slice-ui-preferences';
import ToolbarSpacer from "./components/ToolbarSpacer";
import { LoaderFunction, redirect } from "react-router-dom";
import { verifyIdentity } from "./lib/fetch-requests";

const drawerWidth = 240;

export default function DashboardLayout() {
  const materialTheme = useMaterialTheme();
  const isSmallerScreen = useMediaQuery(materialTheme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const { mode } = useUiPreferences();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ width: isSmallerScreen ? '100%' : `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
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
        variant={isSmallerScreen ? 'temporary' : 'permanent'}
        anchor="left"
      >
        <Toolbar>
          <img src={logo} alt="logo" height={36} />
        </Toolbar>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <ToolbarSpacer />
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
