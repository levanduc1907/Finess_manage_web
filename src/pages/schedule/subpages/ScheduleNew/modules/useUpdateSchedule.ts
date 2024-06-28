import { useMutation } from '@tanstack/react-query';
import { FetchApi } from '@/utils/FetchApi';

export function useUpdateSchedule() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.editSchedule,
  });

  return {
    update: mutateAsync,
    status,
  };
}
