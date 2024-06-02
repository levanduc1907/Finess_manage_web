import React from 'react';
import { RouteObject, createBrowserRouter } from 'react-router-dom';

import { authRoutes } from './auth-routes';
import { dashboardRoutes } from './dashboard-routes';

const NotFound = React.lazy(() =>
  import('@/pages/notfound/NotFound').then(mod => ({ default: mod.NotFound })),
);

const notFoundRoute: RouteObject = { errorElement: <NotFound /> };

export const routes = [notFoundRoute, authRoutes, dashboardRoutes];

export const router = createBrowserRouter([
  { element: <NotFound />, errorElement: <NotFound /> },
  notFoundRoute,
  authRoutes,
  dashboardRoutes,
]);

router.subscribe(() => {
  window.scrollTo(0, 0);
});
