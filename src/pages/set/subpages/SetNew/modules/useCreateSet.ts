import { useMutation } from '@tanstack/react-query';
import { FetchApi } from '@/utils/FetchApi';

export function useCreateSet() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.createSet,
  });

  return {
    create: mutateAsync,
    status,
  };
}
