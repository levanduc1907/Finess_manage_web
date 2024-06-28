import { useQuery } from '@tanstack/react-query';

import { QueryKeys, useStateLogin } from '@/utils/modules';
import { FetchApi } from '@/utils/FetchApi';

export function useQueryMuscleGroups() {
  const isLoggedIn = useStateLogin();

  const { data, ...result } = useQuery({
    queryKey: [QueryKeys.GET_MUSLEGROUP],
    queryFn: FetchApi.getAllMuscleGroup,
    select: data => {
      return data?.data;
    },

    enabled: isLoggedIn,
  });

  return { ...result, data: data || [] };
}
