import { PaletteMode } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UIPreferences {
  mode: PaletteMode;
}

const initialState: UIPreferences = {
  mode: localStorage.getItem('mode') === 'dark' ? 'dark' : 'light',
};

export const uiPreferencesSlice = createSlice({
  name: 'uiPreferences',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<PaletteMode>) => {
      state.mode = action.payload;
      localStorage.setItem('mode', action.payload);
    },
  },
});

export const { setMode } = uiPreferencesSlice.actions;
export default uiPreferencesSlice.reducer;
