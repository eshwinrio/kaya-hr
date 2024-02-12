import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './redux-store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useUiPreferences = () => useAppSelector((state: RootState) => state.uiPreferences);
export const useAuthState = () => useAppSelector((state: RootState) => state.authhentication);