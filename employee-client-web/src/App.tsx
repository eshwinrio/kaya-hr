import { ApolloProvider } from '@apollo/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { signoutLoader } from './components/PopoverProfile';
import { apolloClient } from './lib/apollo';
import store from './lib/redux-store';
import ForgotPasswordPage, { forgotPasswordAction } from './pages/ForgotPasswordPage';
import HomePage, { homePageLoader } from './pages/HomePage';
import LoginPage, { loginAction } from './pages/LoginPage';
import PunchPage, { punchPageAction, punchPageLoader } from './pages/PunchPage';
import ResetPasswordPage, { resetPasswordAction } from './pages/ResetPasswordPage';
import SettingsPage from './pages/SettingsPage';
import DashboardLayout, { dashboardLayoutLoader } from './shared/DashboardLayout';
import RootLayout from './shared/RootLayout';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: RootLayout,
    children: [
      {
        id: 'dash-layout',
        Component: DashboardLayout,
        loader: dashboardLayoutLoader,
        children: [
          {
            index: true,
            Component: HomePage,
            loader: homePageLoader,
          },
          {
            path: "punch",
            Component: PunchPage,
            loader: punchPageLoader,
            action: punchPageAction,
          },
          {
            path: "settings",
            children: [
              {
                index: true,
                Component: SettingsPage
              },
            ]
          }
        ]
      },
      {
        id: 'auth',
        path: 'auth',
        Component: RootLayout,
        children: [
          {
            index: true,
            Component: LoginPage,
            action: loginAction
          },
          {
            path: 'signout',
            loader: signoutLoader,
          },
          {
            path: 'forgot-password',
            Component: ForgotPasswordPage,
            action: forgotPasswordAction,
          },
          {
            path: 'reset-password',
            Component: ResetPasswordPage,
            action: resetPasswordAction,
          }
        ],
      },
      {
        path: '*',
        Component: () => <div>404</div>
      }
    ],
  },
], {
  basename: '/employee',
});

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
