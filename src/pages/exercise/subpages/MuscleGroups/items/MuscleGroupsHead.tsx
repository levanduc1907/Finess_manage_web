import { useLocation, useNavigate } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import { AppButton } from '@/components';
import { useDashboardHeaderBreadcrumb } from '@/layouts';
import { useAppLanguage } from '@/utils/modules';

export function MuscleGroupsHead() {
  const { Strings } = useAppLanguage();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('new');
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h5">{Strings.manager_muscle_group}</Typography>
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
