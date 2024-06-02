import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { Loading } from '@/pages/loading/Loading';
import { queryClient } from '@/utils/modules/query/query-client';
import { theme } from '@/utils/modules/theme';
import { router } from '@/routes';
import { NotFound } from './pages/notfound/NotFound';

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loading />}>
          <RouterProvider
            future={{ v7_startTransition: true }}
            router={router}
            fallbackElement={<NotFound />}
          />
          <ToastContainer />
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
