import { useLocation, useNavigate } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import { AppButton } from '@/components';
import { useDashboardHeaderBreadcrumb } from '@/layouts';
import { useAppLanguage } from '@/utils/modules';

export function SetHead() {
  const { Strings } = useAppLanguage();
  const { getBreadcrumb } = useDashboardHeaderBreadcrumb();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/sets/new');
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h5">{getBreadcrumb(pathname)}</Typography>
      <Stack direction="row" gap={1}>
        <AppButton
          variant="contained"
          onClick={handleNavigate}
          style={{ marginRight: 20 }}
        >
          {Strings.create_new}
        </AppButton>
      </Stack>
    </Stack>
  );
}
