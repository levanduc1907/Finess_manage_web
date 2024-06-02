import { useQuery } from '@tanstack/react-query';

import { QueryKeys, useStateLogin } from '@/utils/modules';
import { FetchApi } from '@/utils/FetchApi';

export function useQueryAllExercise() {
  const isLoggedIn = useStateLogin();

  const { data, ...returnQuery } = useQuery({
    queryKey: [QueryKeys.GET_EXERCISE],
    queryFn: () => FetchApi.getAllExercise({ limit: 100 }),
    select: data => {
      return data?.data;
    },
    enabled: isLoggedIn,
  });

  return { ...returnQuery, data: data?.data || [] };
}
