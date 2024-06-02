import { useNavigate } from 'react-router-dom';

import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';

import {
  LocalAccountService,
  TAccountLoginStatus,
  useAppAccount,
} from '@/utils/modules';

type TDashboardLayoutHeaderAvatarProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  open: boolean;
};

export function DashboardLayoutHeaderAvatar({
  anchorEl,
  onClose,
  open,
}: TDashboardLayoutHeaderAvatarProps) {
  const { account } = useAppAccount();
  const navigate = useNavigate();

  const handleSignOut = () => {
    onClose?.();
    LocalAccountService.set({ state: TAccountLoginStatus.LOGOUT });
    navigate('/login', { replace: true });
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {account?.username}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
}
