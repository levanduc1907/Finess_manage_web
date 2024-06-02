import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useDashboardHeaderBreadcrumb } from '../modules/useDashboardHeaderBreadcrumb';

export function DashboardLayoutHeaderBreadcrumb() {
  const { getBreadcrumb } = useDashboardHeaderBreadcrumb();
  const { pathname } = useLocation();

  return (
    <Typography color={'primary.main'} variant={'body1'} fontWeight={'900'}>
      {getBreadcrumb(pathname)}
    </Typography>
  );
}
