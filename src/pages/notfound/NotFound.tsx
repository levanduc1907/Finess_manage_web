import { AppButton } from '@/components';
import { Card, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        display: 'flex',
        minHeight: '100vh',
        '.MuiPaper-root': {
          borderRadius: 0,
        },
      }}
    >
      <Stack
        direction={'column'}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Typography variant="h2">404 Not Found</Typography>
        <AppButton
          size="large"
          variant="contained"
          style={{ marginTop: 24 }}
          onClick={() => {
            navigate('/');
          }}
        >
          Go to home
        </AppButton>
      </Stack>
    </Card>
  );
}
