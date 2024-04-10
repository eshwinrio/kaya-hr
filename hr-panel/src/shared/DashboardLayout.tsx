import { isApolloError } from "@apollo/client";
import BrightnessFull from '@mui/icons-material/Brightness4';
import BrightnessHigh from '@mui/icons-material/Brightness7';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuIcon from '@mui/icons-material/Menu';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SettingsIcon from "@mui/icons-material/Settings";
import WindowIcon from '@mui/icons-material/Window';
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo, useRef, useState } from "react";
import { Link, LoaderFunction, Outlet, redirect } from "react-router-dom";
import logo from '../assets/logo-icon.svg';
import DashboardMenu, { DashboardMenuItem } from "../components/DashboardMenu";
import PopoverProfile from "../components/PopoverProfile";
import ToolbarSpacer from "../components/ToolbarSpacer";
import { apolloClient } from "../lib/apollo";
import { WHOAMI } from "../lib/gql-queries";
import { useMaterialTheme } from "../lib/material-theme";
import { useAppDispatch, useUiPreferences } from '../lib/redux-hooks';
import { setMode } from '../lib/redux-slice-ui-preferences';
import WhoamiProvider, { useWhoAmILoader } from "../lib/whoami-provider";

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
  const whoamiData = useWhoAmILoader();

  const menus: Array<DashboardMenuItem> = [
    {
      title: 'Dashboard',
      path: '/',
      icon: WindowIcon,
    },
    {
      title: 'Employees',
      path: '/employees',
      icon: GroupsIcon,
      children: [
        {
          title: 'Onboard',
          path: '/employees/editor',
          icon: GroupAddIcon,
        },
      ]
    },
    {
      title: 'Schedules',
      path: '/scheduler',
      icon: ChecklistIcon,
    },
    {
      title: 'Financial',
      path: '/financial',
      icon: MonetizationOnIcon,
      children: [
        {
          title: 'Payrolls',
          path: '/financial/payrolls',
          icon: CurrencyExchangeIcon,
        },
        {
          title: 'Payslips',
          path: '/financial/payslips',
          icon: RequestQuoteIcon,
        }
      ]
    },
  ];

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
                src={whoamiData.currentUser?.profileIconUrl ?? ''}
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
          <DashboardMenu menus={menus} />
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
      return redirect('/auth');
    }
    throw error;
  }
};
