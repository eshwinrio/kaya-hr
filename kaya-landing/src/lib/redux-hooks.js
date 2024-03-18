import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();

export const useUiPreferences = () => useAppSelector((state) => state.uiPreferences);
export const useAuthState = () => useAppSelector((state) => state.authhentication);
