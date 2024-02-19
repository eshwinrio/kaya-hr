import { createTheme } from "@mui/material";
import { useUiPreferences } from "./redux-hooks";

export function useMaterialTheme() {
  const { mode } = useUiPreferences();

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#6E11E4',
        contrastText: '#fff'
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
