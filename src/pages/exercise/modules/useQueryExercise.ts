import { useEffect, useState } from 'react';

import { useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { QueryKeys, useStateLogin } from '@/utils/modules';
import { FetchApi } from '@/utils/FetchApi';

export function useQueryExercise() {
  const isLoggedIn = useStateLogin();

  const value = useWatch({
    name: ['page', 'limit'],
  });
  const [page, limit] = value;

  const [refreshQueryKey, setRefreshQueryKey] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRefreshQueryKey(value);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  const result = useQuery({
    queryKey: [QueryKeys.GET_EXERCISE, ...refreshQueryKey],
    queryFn: () => {
      const searchFilter = {
        page,
        limit,
      };

      return FetchApi.getAllExercise(searchFilter);
    },
    select: data => {
      return data?.data;
    },
    enabled: isLoggedIn,
  });

  return { ...result };
}
