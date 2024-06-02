import { CircularProgress, Stack } from '@mui/material';

export function Loading() {
  return (
    <Stack
      sx={{ height: '100vh', width: '100vw' }}
      direction={'row'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <CircularProgress size={24} />
    </Stack>
  );
}
