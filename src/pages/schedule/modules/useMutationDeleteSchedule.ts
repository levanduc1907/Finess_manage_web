import { FetchApi } from '@/utils/FetchApi';
import { useMutation } from '@tanstack/react-query';

export function useMutationDeleteSchedule() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.deleteSchedule,
  });

  return {
    deleteSchedule: mutateAsync,
    status,
  };
}
