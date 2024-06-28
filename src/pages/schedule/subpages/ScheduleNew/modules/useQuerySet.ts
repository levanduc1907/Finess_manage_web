import { useQuery } from '@tanstack/react-query';

import { QueryKeys, useStateLogin } from '@/utils/modules';
import { FetchApi } from '@/utils/FetchApi';

export function useQuerySet() {
  const isLoggedIn = useStateLogin();

  const result = useQuery({
    queryKey: [QueryKeys.GET_SET],
    queryFn: () => FetchApi.getAllSet({ page: 1 }),
    select: data => {
      return data?.data;
    },
    enabled: isLoggedIn,
  });

  return { ...result };
}
