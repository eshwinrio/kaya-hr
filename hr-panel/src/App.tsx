import { ApolloProvider } from '@apollo/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { signoutLoader } from './components/PopoverProfile';
import { apolloClient } from './lib/apollo';
import store from './lib/redux-store';
import EmployeesIndex, { employeesIndexLoader } from './pages/EmployeesIndex';
import FinancialsIndex, { financialHomePageLoader } from './pages/FinancialsIndex';
import ForgotPasswordPage, { forgotPasswordAction } from './pages/ForgotPasswordPage';
import HomePage, { homeLoader } from './pages/HomePage';
import Login, { loginAction } from './pages/Login';
import OnboardEmployee, { onboardEmployeeAction } from './pages/OnboardEmployee';
import OrganizationSettingsPage, { organizationSettingsAction } from './pages/OrganizationSettingsPage';
import PayrollsIndex, { payrollsPageLoader } from './pages/PayrollsIndex';
import PayrollViewerPage from './pages/PayrollViewerPage';
import ResetPasswordPage, { resetPasswordAction } from './pages/ResetPasswordPage';
import ScheduleEditorPage, { scheduleEditorAction } from './pages/ScheduleEditorPage';
import ScheduleViewerPage, { scheduleViewerLoader } from './pages/ScheduleViewer';
import SettingsPage from './pages/SettingsPage';
import UpdateEmployee, { updateEmployeeAction, updateEmployeeLoader } from './pages/UpdateEmployee';
import ViewEmployee, { viewEmployeeLoader } from './pages/ViewEmployee';
import DashboardLayout, { dashboardLayoutLoader } from './shared/DashboardLayout';
import Layout from './shared/Layout';
import ViewPayslip, { viewPayslipLoader } from './pages/ViewPayslip';

const router = createBrowserRouter([
  {
    id: 'root',
    Component: Layout,
    children: [
      {
        id: 'dashboard',
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
                index: true,
                Component: EmployeesIndex,
                loader: employeesIndexLoader,
              },
              {
                path: ":id",
                Component: ViewEmployee,
                loader: viewEmployeeLoader,
              },
              {
                path: "editor",
                children: [
                  {
                    index: true,
                    Component: OnboardEmployee,
                    action: onboardEmployeeAction,
                  },
                  {
                    path: ":id",
                    Component: UpdateEmployee,
                    action: updateEmployeeAction,
                    loader: updateEmployeeLoader,
                  }
                ]
              },
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
            id: 'financial',
            path: "financial",
            children: [
              {
                index: true,
                Component: FinancialsIndex,
                loader: financialHomePageLoader,
              },
              {
                id: 'payroll',
                path: "payrolls",
                children: [
                  {
                    index: true,
                    Component: PayrollsIndex,
                    loader: payrollsPageLoader,
                  },
                  {
                    path: ":id",
                    Component: PayrollViewerPage
                  }
                ]
              },
              {
                path: "payslips",
                children: [
                  {
                    path: ":id",
                    Component: ViewPayslip,
                    loader: viewPayslipLoader,
                  }
                ]
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
], {
  basename: '/hr-panel',
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
