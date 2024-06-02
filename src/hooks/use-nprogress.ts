import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import nProgress from 'nprogress';

export function useNProgress() {
  const location = useLocation();

  useEffect(() => {
    nProgress.start();
    return () => {
      nProgress.done()
    };
  }, [location.pathname]);
}
