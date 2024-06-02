import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/exercises');
  }, [navigate]);

  return (
    <Box>
      <Typography variant="caption"></Typography>
    </Box>
  );
}
