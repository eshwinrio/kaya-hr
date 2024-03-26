import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './lib/redux-store';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import RootLayout from './shared/RootLayout';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path:'about',
        Component: AboutPage,
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
