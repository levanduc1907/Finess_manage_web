import { useQuery } from '@tanstack/react-query';

import { QueryKeys, useStateLogin } from '@/utils/modules';
import { FetchApi } from '@/utils/FetchApi';

export function useQueryNutrition() {
  const isLoggedIn = useStateLogin();

  const result = useQuery({
    queryKey: [QueryKeys.GET_NUTRITION],
    queryFn: FetchApi.getAllNutrition,
    select: data => {
      return data?.data;
    },
    enabled: isLoggedIn,
  });

  return { ...result };
}
