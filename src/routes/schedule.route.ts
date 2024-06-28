import React from 'react';

import { RouteObject } from 'react-router-dom';

const Schedules = React.lazy(() =>
  import('@/pages/schedule/Schedule').then(mod => ({
    default: mod.Schedule,
  })),
);
const NewSchedules = React.lazy(() =>
  import('@/pages/schedule/subpages/ScheduleNew/ScheduleNew').then(mod => ({
    default: mod.ScheduleNew,
  })),
);

export const scheduleRoutes: RouteObject[] = [
  {
    path: '/schedule',
    Component: Schedules,
  },
  {
    path: '/schedule/new',
    Component: NewSchedules,
  },
  {
    path: '/schedules/:id/edit',
    Component: NewSchedules,
  },
];
