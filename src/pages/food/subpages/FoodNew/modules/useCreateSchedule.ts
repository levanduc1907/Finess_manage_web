import { useMutation } from '@tanstack/react-query';
import { FetchApi } from '@/utils/FetchApi';

export function useCreatefood() {
  const { mutateAsync, status } = useMutation({
    mutationFn: FetchApi.createfood,
  });

  return {
    create: mutateAsync,
    status,
  };
}
