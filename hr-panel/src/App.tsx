import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { signoutLoader } from './components/PopoverProfile';
import DashboardLayout, { dashboardLayoutLoader } from './DashboardLayout';
import EmployeeAdd, { employeeAddAction } from './EmployeeAdd';
import EmployeeList, { employeeListLoader } from './EmployeeList';
import Home, { homeLoader } from './Home';
import Layout from './Layout';
import { apolloClient } from './lib/apollo';
import store from './lib/redux-store';
import Login, { loginAction } from './Login';
import OrganizationSettingsPage, { organizationSettingsAction } from './OrganizationSettingsPage';
import SettingsPage from './SettingsPage';
import ViewEmployee, { viewEmployeeLoader } from './ViewEmployee';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Layout,
    children: [
      {
        id: 'dash-layout',
        Component: DashboardLayout,
        loader: dashboardLayoutLoader,
        children: [
          {
            index: true,
            Component: Home,
            loader: homeLoader,
          },
          {
            path: "employees",
            children: [
              {
                path: "add",
                index: true,
                Component: EmployeeAdd,
                action: employeeAddAction,
              },
              {
                path: "list",
                Component: EmployeeList,
                loader: employeeListLoader,
              },
              {
                path: "view/:id",
                Component: ViewEmployee,
                loader: viewEmployeeLoader,
              }
            ]
          },
          {
            path: "settings",
            children: [
              {
                index: true,
                Component: SettingsPage
              },
              {
                path: "organization",
                Component: OrganizationSettingsPage,
                action: organizationSettingsAction
              }
            ]
          }
        ]
      },
      {
        path: 'login',
        action: loginAction,
        Component: Login,
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
        <RouterProvider router={router} />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
