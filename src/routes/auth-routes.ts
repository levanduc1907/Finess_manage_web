import React from "react";

import { RouteObject } from "react-router-dom";
import { AuthLayout } from '@/layouts';

const Login = React.lazy(() =>
  import('@/pages/auth/login/Login').then(mod => ({
    default: mod.Login,
  })),
);

export const authRoutes: RouteObject = {
  Component: AuthLayout,
  children: [
    {
      path: '/login',
      Component: Login,
    },
  ],
}