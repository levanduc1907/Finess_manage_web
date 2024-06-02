import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { useStateLogin } from '@/utils/modules';

export function AuthGuard({ children }: React.PropsWithChildren) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useStateLogin();

  const onRouteCheck = useCallback(() => {
    const authPaths = ['/login'];
    if (authPaths.includes(pathname) && isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
  }, [isAuthenticated, pathname]);

  useEffect(() => {
    onRouteCheck();
  }, [onRouteCheck]);

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};
