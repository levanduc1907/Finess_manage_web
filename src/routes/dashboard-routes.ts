import React from 'react';

import { RouteObject } from 'react-router-dom';
import { DashboardLayout } from '@/layouts';

import { exerciseRoutes } from './exercise.route';
import { setRoutes } from './set.route';

const Dashboard = React.lazy(() =>
  import('@/pages/dashboard/Dashboard').then(mod => ({
    default: mod.Dashboard,
  })),
);

export const dashboardRoutes: RouteObject = {
  Component: DashboardLayout,
  children: [
    {
      path: '/',
      Component: Dashboard,
    },
    ...exerciseRoutes,
    ...setRoutes,
  ],
};
