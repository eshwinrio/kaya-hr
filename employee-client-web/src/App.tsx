import { ApolloProvider } from '@apollo/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { signoutLoader } from './components/PopoverProfile';
import DashboardLayout, { dashboardLayoutLoader } from './shared/DashboardLayout';
import HomePage, { homePageLoader } from './pages/HomePage';
import RootLayout from './shared/RootLayout';
import { apolloClient } from './lib/apollo';
import store from './lib/redux-store';
import LoginPage, { loginAction } from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';

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
        path: 'login',
        action: loginAction,
        Component: LoginPage,
      },
      {
        path: 'signout',
        loader: signoutLoader,
      },
      {
        path: '*',
        Component: () => <div>404</div>
      }
    ],

  }
]);

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
