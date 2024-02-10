import { createTheme } from "@mui/material";
import { useUiPreferences } from "./redux-hooks";

export function useMaterialTheme() {
  const { mode } = useUiPreferences();

  return createTheme({
    palette: {
      mode,
    },
  })
}
