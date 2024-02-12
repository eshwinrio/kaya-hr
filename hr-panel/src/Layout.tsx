import { Outlet } from "react-router";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useMaterialTheme } from "./lib/material-theme";
import { LoaderFunction, redirect } from "react-router-dom";

export default function Layout() {
  const materialTheme = useMaterialTheme();
  return (
    <ThemeProvider theme={materialTheme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}

export const rootLayoutLoader: LoaderFunction = async () => {
  const cookies = new URLSearchParams(document.cookie.replace(/; /g, '&'));
  const hasAccessToken = cookies.has('access_token');
  if (hasAccessToken) {
    return null;
  } else {
    redirect('/login');
    return null;
  }
};
