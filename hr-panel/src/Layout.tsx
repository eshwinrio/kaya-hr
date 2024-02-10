import { ThemeProvider } from "@mui/material";
import { Outlet } from "react-router";
import CssBaseline from '@mui/material/CssBaseline';
import { useMaterialTheme } from "./lib/material-theme";

export default function Layout() {
  const materialTheme = useMaterialTheme();
  return (
    <ThemeProvider theme={materialTheme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}
