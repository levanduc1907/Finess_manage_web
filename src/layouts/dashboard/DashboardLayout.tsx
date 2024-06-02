import { useState } from 'react';

import { Box, Card, useTheme } from '@mui/material';
import { AuthGuard } from '@/guards/auth-guard';

import { DashboardLayoutHeader } from './items/DashboardLayoutHeader';
import { DashboardLayoutSidebar } from './items/DashboardLayoutSidebar';
import { Outlet } from 'react-router-dom';

const SIDEBAR_WIDTH = 300;
const SIDEBAR_WIDTH_MINIMIZED = 60;

export function DashboardLayout() {
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_WIDTH);
  const theme = useTheme();

  const onToggle = () => {
    setSidebarWidth(width =>
      width === SIDEBAR_WIDTH ? SIDEBAR_WIDTH_MINIMIZED : SIDEBAR_WIDTH,
    );
  };

  return (
    <AuthGuard>
      <Card
        sx={{
          display: 'flex',
          minHeight: '100vh',
          '.MuiPaper-root': {
            borderRadius: 0,
          },
        }}
      >
        <Box
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.shortest,
            }),
            boxShadow: theme => theme.shadows[1],
            // position: 'fixed',
            // bottom: 0,
            // top: 0,
            // zIndex: 1000,
            // backgroundColor: theme => theme.palette.background.paper,
          }}
        >
          <DashboardLayoutSidebar
            isOpen={sidebarWidth === SIDEBAR_WIDTH}
            onToggle={onToggle}
          />
        </Box>
        <Box
          sx={{
            width: `calc(100% - ${sidebarWidth}px)`,
            display: 'flex',
            flexDirection: 'column',
            ml: '1px',
            flexGrow: 1,
          }}
        >
          <DashboardLayoutHeader />
          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                width: '100%',
                height: '100%',
                p: 2,
              }}
              elevation={0}
              variant="outlined"
            >
              <Box
                sx={{
                  // boxShadow: theme => theme.shadows[1],
                  width: '100%',
                  height: '100%',
                  maxHeight: 'calc(100vh - 90px)',
                  overflow: 'auto',
                  // borderRadius: theme => theme.shape.borderRadius,
                  // padding: 2,
                  boxSizing: 'border-box',
                }}
              >
                <Outlet />
              </Box>
            </Card>
          </Box>
        </Box>
      </Card>
    </AuthGuard>
  );
}
