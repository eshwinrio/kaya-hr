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
