import { ApolloProvider } from '@apollo/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { signoutLoader } from './components/PopoverProfile';
import { apolloClient } from './lib/apollo';
import store from './lib/redux-store';
import EmployeeEditor, { employeeEditorAction, employeeEditorLoader } from './pages/EmployeeEditorPage';
import EmployeeList, { employeeListLoader } from './pages/EmployeeList';
import ForgotPasswordPage, { forgotPasswordAction } from './pages/ForgotPasswordPage';
import HomePage, { homeLoader } from './pages/HomePage';
import Login, { loginAction } from './pages/Login';
import OrganizationSettingsPage, { organizationSettingsAction } from './pages/OrganizationSettingsPage';
import ResetPasswordPage, { resetPasswordAction } from './pages/ResetPasswordPage';
import ScheduleEditorPage, { scheduleEditorAction } from './pages/ScheduleEditorPage';
import ScheduleViewerPage, { scheduleViewerLoader } from './pages/ScheduleViewer';
import SettingsPage from './pages/SettingsPage';
import ViewEmployee, { viewEmployeeLoader } from './pages/ViewEmployee';
import DashboardLayout, { dashboardLayoutLoader } from './shared/DashboardLayout';
import Layout from './shared/Layout';

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
            Component: HomePage,
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
            id: 'schedules',
            path: "scheduler",
            children: [
              {
                index: true,
                Component: ScheduleViewerPage,
                loader: scheduleViewerLoader,
              },
              {
                path: "editor",
                Component: ScheduleEditorPage,
                action: scheduleEditorAction,
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
        id: 'auth',
        path: 'auth',
        children: [
          {
            index: true,
            Component: Login,
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
