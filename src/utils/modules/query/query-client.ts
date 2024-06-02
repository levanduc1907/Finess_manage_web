import { QueryClient, QueryKey } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});
export const invalidateQueries = (queries: string | string[]) => {
  return queryClient.invalidateQueries({ queryKey: queries as QueryKey | QueryKey[] });
}