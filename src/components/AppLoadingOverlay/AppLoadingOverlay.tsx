import { Box, CircularProgress, Stack } from '@mui/material';
import { ReactNode } from 'react';

type TAppLoadingOverlayProps = {
  children: ReactNode;
  isLoading: boolean;
};
export function AppLoadingOverlay({
  isLoading,
  children,
}: TAppLoadingOverlayProps) {
  return (
    <Stack
      position="relative"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      {isLoading && (
        <Stack
          position="absolute"
          sx={{
            inset: 0,
            zIndex: 999,
            backgroundColor: theme => theme.palette?.neutral?.[100],
            opacity: 0.4,
          }}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={20} />
        </Stack>
      )}
      <Box sx={{ width: '100%', height: '100%' }}>{children}</Box>
    </Stack>
  );
}
