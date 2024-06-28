import React from 'react';

import { RouteObject } from 'react-router-dom';

const Foods = React.lazy(() =>
  import('@/pages/food/Food').then(mod => ({
    default: mod.Food,
  })),
);
const NewFoods = React.lazy(() =>
  import('@/pages/food/subpages/FoodNew/FoodNew').then(mod => ({
    default: mod.FoodNew,
  })),
);

export const foodRoutes: RouteObject[] = [
  {
    path: '/food',
    Component: Foods,
  },
  {
    path: '/food/new',
    Component: NewFoods,
  },
  // {
  //   path: '/schedules/:id/edit',
  //   Component: NewSchedules,
  // },
];
