import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import FileDetail from 'pages/components-overview/FileDetail/FileDetail';
import PrivateRoute from './PrivateRoute';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page

// render - utilities

const AllFiles = Loadable(lazy(() => import('pages/components-overview/AllFiles')));
const ListUser = Loadable(lazy(() => import('pages/components-overview/ListUser')));
const Package = Loadable(lazy(() => import('pages/components-overview/Package')));
const AboutUser = Loadable(lazy(() => import('pages/components-overview/AboutUser/AboutUser')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
        <PrivateRoute>
          {' '}
          <DashboardDefault />
        </PrivateRoute>
      )
    },
    {
      path: 'Package',
      element: (
        <PrivateRoute>
          <Package />
        </PrivateRoute>
      )
    },
    {
      path: 'fileDetail/:id',
      element: (
        <PrivateRoute>
          {' '}
          <FileDetail />
        </PrivateRoute>
      )
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: (
            <PrivateRoute>
              {' '}
              <DashboardDefault />
            </PrivateRoute>
          )
        }
      ]
    },
    {
      path: 'AllFiles',
      element: (
        <PrivateRoute>
          {' '}
          <AllFiles />
        </PrivateRoute>
      )
    },
    {
      path: 'ListUser',
      element: (
        <PrivateRoute>
          {' '}
          <ListUser />
        </PrivateRoute>
      )
    },
    {
      path: 'AboutUser/:id',
      element: (
        <PrivateRoute>
          <AboutUser />
        </PrivateRoute>
      )
    }
  ]
};

export default MainRoutes;
