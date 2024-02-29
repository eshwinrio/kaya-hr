import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home, { homeLoader } from './Home';
import store from './lib/redux-store';
import Login, { loginAction } from './Login';
import Layout from './Layout';
import DashboardLayout, { dashboardLayoutLoader } from './DashboardLayout';
import { signoutLoader } from './components/PopoverProfile';
import EmployeeAdd, { employeeAddAction } from './EmployeeAdd';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apollo';

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
                Component: EmployeeAdd,
                action: employeeAddAction,
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
