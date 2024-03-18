import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
    },
  },
});

export const { setAuthState } = authenticationSlice.actions;
export default authenticationSlice.reducer;
