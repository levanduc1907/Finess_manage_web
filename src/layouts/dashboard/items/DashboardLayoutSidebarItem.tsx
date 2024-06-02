import { NavLink } from 'react-router-dom';

import { IconButton, Stack, Tooltip, Typography } from '@mui/material';

type TDashboardLayoutSidebarItemProps = {
  href?: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  isOpen: boolean;
};

export function DashboardLayoutSidebarItem({
  label,
  href,
  icon: Icon,
  isOpen,
}: TDashboardLayoutSidebarItemProps) {
  const Component = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={1}
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
        py: 0.5,
        px: 1,
        '&:hover': {
          transition: theme =>
            theme.transitions.create('background-color', {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.short,
            }),
          backgroundColor: theme =>
            href ? theme.palette.primary.light : 'unset',
          svg: {
            fill: theme => theme.palette.primary.main,
          },
          '& p': {
            color: theme => theme.palette.primary.main,
          },
        },
      }}
    >
      <Tooltip title={isOpen ? null : label} placement="right">
        <IconButton
          sx={{
            p: 1,
            svg: {
              width: 24,
              height: 24,
              fill: theme => theme.palette.text.secondary,
            },
          }}
        >
          <Icon />
        </IconButton>
      </Tooltip>
      {isOpen && (
        <Typography
          sx={{
            fontWeight: '400',
            color: '#111927',
            width: '100%',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </Typography>
      )}
    </Stack>
  );

  if (!href) return Component;

  return (
    <NavLink
      to={href ?? '#'}
      style={{ textDecoration: 'none', color: 'inherit' }}
      className={({ isActive }) => (isActive ? 'nav-link__active' : '')}
    >
      {Component}
    </NavLink>
  );
}
