import {
  Avatar,
  Badge,
  Box,
  Card,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import { usePopover } from '@/hooks';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import { DashboardLayoutHeaderAvatar } from './DashboardLayoutHeaderAvatar';
import { DashboardLayoutHeaderBreadcrumb } from './DashboardLayoutHeaderBreadcrumb';
import { DashboardLayoutHeaderSelectLanguage } from './DashboardLayoutHeaderSelectLanguage';
import { useAppLanguage } from '@/utils/modules';

export function DashboardLayoutHeader() {
  const accountPopover = usePopover();
  const languagePopover = usePopover();
  const { Strings } = useAppLanguage();

  return (
    <>
      <Card
        sx={{
          height: 50,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          px: 2,
          mb: '1px',
        }}
      >
        <DashboardLayoutHeaderBreadcrumb />
        <Stack alignItems="center" direction="row" spacing={2}>
          <Box>
            <Stack
              direction={'row'}
              gap={1}
              alignItems={'center'}
              onClick={languagePopover.handleOpen}
              ref={languagePopover.anchorRef}
              sx={{
                cursor: 'pointer',
              }}
            >
              <LanguageIcon
                sx={{ fill: theme => theme.palette.primary.main }}
              />
              <Typography
                sx={{
                  color: theme => theme.palette.primary.main,
                  fontWeight: 'bold',
                }}
              >
                {Strings.language}
              </Typography>
            </Stack>
          </Box>
          <Tooltip title="Notifications">
            <IconButton>
              <Badge badgeContent={4} color="success" variant="dot">
                <SvgIcon fontSize="small">
                  <NotificationsNoneIcon />
                </SvgIcon>
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            onClick={accountPopover.handleOpen}
            ref={accountPopover.anchorRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
            }}
            src="/assets/avatars/avatar-anika-visser.png"
          />
          <DashboardLayoutHeaderAvatar
            anchorEl={accountPopover.anchorRef.current}
            open={accountPopover.open}
            onClose={accountPopover.handleClose}
          />
          <DashboardLayoutHeaderSelectLanguage
            anchorEl={languagePopover.anchorRef.current}
            open={languagePopover.open}
            onClose={languagePopover.handleClose}
          />
        </Stack>
      </Card>
    </>
  );
}
