import { AppLogo } from '@/components';
import { AuthGuard } from '@/guards/auth-guard';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <AuthGuard>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ minWidth: '550px' }}>
          <Box sx={{ textAlign: 'center' }}>
            <AppLogo width={200} />
          </Box>
          <Outlet />
        </Box>
      </Box>
    </AuthGuard>
  );
}
