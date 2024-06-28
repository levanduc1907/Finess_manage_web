import { useNavigate } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import { AppButton } from '@/components';

import { useAppLanguage } from '@/utils/modules';

export function ScheduleHead() {
  const { Strings } = useAppLanguage();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/schedule/new');
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h5">{'Quản lý lịch trình'}</Typography>
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
