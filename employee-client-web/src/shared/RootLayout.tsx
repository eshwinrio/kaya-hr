import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from "react-router";
import { useMaterialTheme } from "../lib/material-theme";

export default function RootLayout() {
  return (
    <ThemeProvider theme={useMaterialTheme()}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}
