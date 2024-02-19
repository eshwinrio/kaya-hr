import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home, { homeLoader } from './Home';
import store from './lib/redux-store';
import Login, { loginAction } from './Login';
import Layout, { rootLayoutLoader } from './Layout';
import DashboardLayout, { dashboardLayoutLoader } from './DashboardLayout';
import { signoutAction } from './components/PopoverProfile';
import EmployeeAdd from './EmployeeAdd';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Layout,
    loader: rootLayoutLoader,
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
                Component: EmployeeAdd
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
        action: signoutAction,
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
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
