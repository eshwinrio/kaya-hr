import { configureStore } from '@reduxjs/toolkit';
import { authenticationSlice } from './redux-slice-authentication';
import { uiPreferencesSlice } from './redux-slice-ui-preferences';

const store = configureStore({
  reducer: {
    authhentication: authenticationSlice.reducer,
    uiPreferences: uiPreferencesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
