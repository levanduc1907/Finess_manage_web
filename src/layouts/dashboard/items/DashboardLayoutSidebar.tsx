import { Box, IconButton, Stack, Typography } from '@mui/material';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';

import { useAppLanguage } from '@/utils/modules';
import { AppLogo } from '@/components/AppLogo/AppLogo';

import { DashboardLayoutSidebarItem } from './DashboardLayoutSidebarItem';
import { useDashboardMenuItems } from '../modules/useDashboardMenuItems';

import { Link } from 'react-router-dom';

type TDashboardLayoutSidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function DashboardLayoutSidebar({
  isOpen,
  onToggle,
}: TDashboardLayoutSidebarProps) {
  const { Strings } = useAppLanguage();
  const menuItems = useDashboardMenuItems();
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ p: 0.5 }}
          marginLeft={1}
        >
          <AppLogo height={isOpen ? 100 : 36} width={isOpen ? 100 : 36} />
          {isOpen && <Typography variant="h3">{Strings.app_name}</Typography>}
        </Stack>
      </Link>

      <Box
        sx={{
          display: 'flex',
          mt: 2,
          px: 1,
        }}
      >
        <IconButton onClick={onToggle}>
          {isOpen ? <FormatIndentDecreaseIcon /> : <FormatIndentIncreaseIcon />}
        </IconButton>
      </Box>

      <Stack direction="column" gap={1} sx={{ mt: 2, height: '100%', flex: 1 }}>
        {menuItems.map(({ href, label, icon }) => (
          <DashboardLayoutSidebarItem
            key={href}
            href={href}
            isOpen={isOpen}
            label={label}
            icon={icon}
          />
        ))}

        {/* <Box sx={{ mt: 'auto', mb: 1 }}>
          <DashboardLayoutSidebarItem
            icon={SettingsIcon}
            label={Strings.settings}
            isOpen={isOpen}
          />
        </Box> */}
      </Stack>
    </Box>
  );
}
