import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import FileDetail from 'pages/components-overview/FileDetail/FileDetail';

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
      element: <DashboardDefault />
    },
    {
      path: 'Package',
      element: <Package />
    },
    {
      path: 'fileDetail/:id',
      element: <FileDetail />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'AllFiles',
      element: <AllFiles />
    },
    {
      path: 'ListUser',
      element: <ListUser />
    },
    {
      path: 'AboutUser/:id',
      element: <AboutUser />
    }
  ]
};

export default MainRoutes;
