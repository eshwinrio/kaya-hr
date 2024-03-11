import { ApolloProvider } from '@apollo/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { signoutLoader } from './components/PopoverProfile';
import DashboardLayout, { dashboardLayoutLoader } from './DashboardLayout';
import EmployeeEditor, { employeeEditorAction, employeeEditorLoader } from './EmployeeEditor';
import EmployeeList, { employeeListLoader } from './EmployeeList';
import Home, { homeLoader } from './Home';
import Layout from './Layout';
import { apolloClient } from './lib/apollo';
import store from './lib/redux-store';
import Login, { loginAction } from './Login';
import OrganizationSettingsPage, { organizationSettingsAction } from './OrganizationSettingsPage';
import ScheduleViewer, { scheduleViewerLoader } from './ScheduleViewer';
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
                path: "list",
                index: true,
                Component: EmployeeList,
                loader: employeeListLoader,
              },
              {
                path: "editor/:id",
                Component: EmployeeEditor,
                action: employeeEditorAction,
                loader: employeeEditorLoader,
              },
              {
                path: "view/:id",
                Component: ViewEmployee,
                loader: viewEmployeeLoader,
              }
            ]
          },
          {
            path: "scheduler",
            Component: ScheduleViewer,
            loader: scheduleViewerLoader,
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
