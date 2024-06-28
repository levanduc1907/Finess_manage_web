import { useMutation } from '@tanstack/react-query';
import { FetchApi } from '@/utils/FetchApi';

export function useCreateSchedule() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.createSchedule,
  });

  return {
    create: mutateAsync,
    status,
  };
}
