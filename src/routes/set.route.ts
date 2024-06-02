import React from 'react';

import { RouteObject } from 'react-router-dom';

const Sets = React.lazy(() =>
  import('@/pages/set/Set').then(mod => ({
    default: mod.Set,
  })),
);
const NewSets = React.lazy(() =>
  import('@/pages/set/subpages/SetNew/SetNew').then(mod => ({
    default: mod.SetNew,
  })),
);

export const setRoutes: RouteObject[] = [
  {
    path: '/sets',
    Component: Sets,
  },
  {
    path: '/sets/new',
    Component: NewSets,
  },
  {
    path: '/sets/:id/edit',
    Component: NewSets,
  },
];
