import { configureStore } from '@reduxjs/toolkit';
import { uiPreferencesSlice } from './redux-slice-ui-preferences';

const store = configureStore({
  reducer: {
    uiPreferences: uiPreferencesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
