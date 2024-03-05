import { createTheme } from "@mui/material";
import { useUiPreferences } from "./redux-hooks";

export function useMaterialTheme() {
  const { mode } = useUiPreferences();

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#6750A4',
        light: '#65558F',
        dark: '#D0BCFE',
        contrastText: '#fff',
      },
      secondary: {
        main: '#958DA5',
        light: '#625B71',
        dark: '#CCC2DC',
        contrastText: '#fff',
      },
      error: {
        main: '#E46962',
        light: '#B3261E',
        dark: '#F2B8B5',
        contrastText: '#fff',
      },
    },
    breakpoints: {
      values: {
        xs: 375,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
      }
    },
    typography: {
      button: {
        textTransform: 'none'
      }
    },
    shape: {
      borderRadius: 10
    }
  })
}
