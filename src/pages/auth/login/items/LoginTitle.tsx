import { Typography } from '@mui/material';
import { useAppLanguage } from '@/utils/modules';

export function LoginTitle() {
  const { Strings } = useAppLanguage();

  return (
    <Typography
      variant="h4"
      sx={{
        mb: 3,
        textAlign: 'center',
      }}
    >
      {Strings.login}
    </Typography>
  );
}
